package telemetry

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
	"vastpoint/backend/internal/domain"

	"github.com/labstack/echo/v4"
)

func (h *Handler) GetTelemetry(c echo.Context) error {
	var data []domain.WaterTelemetry
	// Ambil 15 data paling akhir agar grafik tidak padat
	h.db.Order("timestamp desc").Limit(15).Find(&data)

	// Balik urutannya (ASC) agar mengalir dari kiri ke kanan
	for i, j := 0, len(data)-1; i < j; i, j = i+1, j-1 {
		data[i], data[j] = data[j], data[i]
	}

	return c.JSON(http.StatusOK, map[string]any{
		"status": "success",
		"data":   data,
	})
}

func (h *Handler) StreamTelemetry(c echo.Context) error {
	c.Response().Header().Set(echo.HeaderContentType, "text/event-stream")
	c.Response().Header().Set(echo.HeaderCacheControl, "no-cache")
	c.Response().Header().Set(echo.HeaderConnection, "keep-alive")

	ticker := time.NewTicker(2 * time.Second)
	defer ticker.Stop()

	for {
		select {
		case <-c.Request().Context().Done():
			return nil
		case <-ticker.C:
			var latestCritical domain.WaterTelemetry
			err := h.db.Where("water_level > ?", 4.5).Order("timestamp desc").First(&latestCritical).Error

			if err == nil {
				jsonBytes, _ := json.Marshal(map[string]any{
					"status":       "success",
					"latest_alert": latestCritical,
				})
				fmt.Fprintf(c.Response(), "data: %s\n\n", string(jsonBytes))
			} else {
				fmt.Fprintf(c.Response(), "data: {\"status\":\"success\"}\n\n")
			}

			c.Response().Flush()
		}
	}
}
