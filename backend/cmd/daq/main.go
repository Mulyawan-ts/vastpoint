package main

import (
	"log"
	"math/rand"
	"time"

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"

	"vastpoint/backend/internal/domain"
)

func main() {
	log.Println("[DAQ Service] Starting Data Acquisition Worker...")

	dsn := "../../vastpoint.db?_journal_mode=WAL&_busy_timeout=5000&_synchronous=NORMAL"
	db, err := gorm.Open(sqlite.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("[DAQ Service] Failed to connect DB: %v", err)
	}

	sensors := []string{"WADUK-01", "WADUK-02", "SAN-PLANT-A", "SAN-PLANT-B"}
	ticker := time.NewTicker(5 * time.Second)
	defer ticker.Stop()

	for range ticker.C {
		sensorID := sensors[rand.Intn(len(sensors))]
		telemetry := domain.WaterTelemetry{
			SensorID:   sensorID,
			WaterLevel: float64(int((1.0+rand.Float64()*5.0)*100)) / 100,
			FlowRate:   float64(int((5.0+rand.Float64()*20.0)*100)) / 100,
			Timestamp:  time.Now(),
		}

		if err := db.Create(&telemetry).Error; err != nil {
			log.Printf("[DAQ Error] %v\n", err)
		} else {
			log.Printf("[DAQ Ingested] Sensor: %s | Water Level: %.2fm\n", telemetry.SensorID, telemetry.WaterLevel)
		}
	}
}
