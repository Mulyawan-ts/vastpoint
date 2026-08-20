package config

import (
	"log"
	"vastpoint/backend/internal/domain"

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
)

func InitDB() *gorm.DB {
	// Buat vastpoint.db langsung di root project agar konsisten
	dsn := "../../vastpoint.db?_journal_mode=WAL&_busy_timeout=5000&_synchronous=NORMAL"
	db, err := gorm.Open(sqlite.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Gagal koneksi database: %v", err)
	}

	// WAJIB: AutoMigrate kedua tabel agar dibuat secara otomatis
	err = db.AutoMigrate(&domain.WaterTelemetry{}, &domain.AlertLog{}, &domain.ActuatorState{})
	if err != nil {
		log.Printf("Gagal AutoMigrate: %v", err)
	}

	return db
}
