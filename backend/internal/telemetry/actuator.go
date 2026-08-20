package telemetry

import (
	"net/http"
	"time"

	"vastpoint/backend/internal/domain"

	"github.com/labstack/echo/v4"
)

type ControlPayload struct {
	Device string `json:"device"`
	Status string `json:"status"`
}

func (h *Handler) GetActuators(c echo.Context) error {
	var states []domain.ActuatorState
	h.db.Find(&states)
	return c.JSON(http.StatusOK, map[string]any{
		"status": "success",
		"data":   states,
	})
}

func (h *Handler) ToggleActuator(c echo.Context) error {
	var payload ControlPayload
	if err := c.Bind(&payload); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid payload"})
	}

	var state domain.ActuatorState
	// Cari berdasarkan device
	result := h.db.Where("device = ?", payload.Device).First(&state)

	if result.Error != nil {
		// Jika belum ada record-nya, buat baru
		state = domain.ActuatorState{
			Device:    payload.Device,
			Status:    payload.Status,
			UpdatedAt: time.Now(),
		}
		h.db.Create(&state)
	} else {
		// Jika sudah ada, langsung paksa UPDATE status & timestamp
		h.db.Model(&state).Updates(map[string]any{
			"status":     payload.Status,
			"updated_at": time.Now(),
		})
	}

	return c.JSON(http.StatusOK, map[string]any{
		"status": "success",
		"device": state,
	})
}
