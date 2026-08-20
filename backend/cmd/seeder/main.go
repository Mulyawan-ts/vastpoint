package main

import (
	"fmt"
	"log"
	"math/rand"
	"time"

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"

	"vastpoint/backend/internal/domain"
)

func main() {
	// 1. Koneksi ke Database SQLite (Root Vastpoint)
	dsn := "../../vastpoint.db?_journal_mode=WAL&_busy_timeout=5000&_synchronous=NORMAL"
	db, err := gorm.Open(sqlite.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Gagal koneksi ke database: %v", err)
	}

	// 2. AutoMigrate untuk memastikan tabel 'water_telemetries' ada
	if err := db.AutoMigrate(&domain.WaterTelemetry{}, &domain.AlertLog{}); err != nil {
		log.Fatalf("Gagal AutoMigrate: %v", err)
	}

	sensors := []string{"SAN-PLANT-A", "SAN-PLANT-B", "WADUK-01", "WADUK-02"}

	log.Println("🚀 Telemetry Simulator/Seeder Running... (Press Ctrl+C to stop)")

	// 3. Loop simulasi ingestion data tiap 2 detik
	for {
		sensor := sensors[rand.Intn(len(sensors))]
		waterLevel := 1.0 + rand.Float64()*(6.0-1.0)
		waterLevel = float64(int(waterLevel*100)) / 100

		telemetry := domain.WaterTelemetry{
			SensorID:   sensor,
			WaterLevel: waterLevel,
			Timestamp:  time.Now(),
		}

		if err := db.Create(&telemetry).Error; err != nil {
			log.Printf("Error insert data: %v", err)
		} else {
			status := "NORMAL"
			if waterLevel > 4.5 {
				status = "CRITICAL 🚨"
			}
			fmt.Printf("[%s] Inserted: %s | Level: %.2fm | Status: %s\n",
				telemetry.Timestamp.Format("15:04:05"),
				sensor,
				waterLevel,
				status,
			)
		}

		time.Sleep(2 * time.Second)
	}
}
