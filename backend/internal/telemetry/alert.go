package telemetry

import (
	"net/http"

	"github.com/labstack/echo/v4"

	"vastpoint/backend/internal/domain"
)

func (h *Handler) GetAlerts(c echo.Context) error {
	var alerts []domain.WaterTelemetry
	h.db.Where("water_level > ?", 4.5).Order("timestamp desc").Limit(10).Find(&alerts)
	return c.JSON(http.StatusOK, map[string]any{
		"status": "success",
		"alerts": alerts,
	})
}

func (h *Handler) GetAlertHistory(c echo.Context) error {
	var logs []domain.AlertLog
	h.db.Order("created_at desc").Limit(20).Find(&logs)
	return c.JSON(http.StatusOK, map[string]any{
		"status": "success",
		"logs":   logs,
	})
}
