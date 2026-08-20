package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"vastpoint/backend/internal/config"
	"vastpoint/backend/internal/telemetry"
)

func main() {
	db := config.InitDB()

	e := echo.New()
	e.Use(middleware.Recover())
	e.Use(middleware.RateLimiter(middleware.NewRateLimiterMemoryStore(20)))
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
	}))

	e.GET("/health", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{"status": "ok"})
	})

	telemetry.RegisterRoutes(e, db)

	e.Logger.Fatal(e.Start(":8080"))
}
