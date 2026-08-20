package telemetry

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func RegisterRoutes(e *echo.Echo, db *gorm.DB) {
	// Health Check Route untuk Go API
	e.GET("/health", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{"status": "ok"})
	})

	h := NewHandler(db)

	api := e.Group("/api/v1")
	api.GET("/telemetry", h.GetTelemetry)
	api.GET("/telemetry/stream", h.StreamTelemetry)
	api.GET("/alerts", h.GetAlerts)
	api.GET("/alerts/history", h.GetAlertHistory)
	api.GET("/actuators", h.GetActuators)
	api.POST("/actuators/toggle", h.ToggleActuator)
}
