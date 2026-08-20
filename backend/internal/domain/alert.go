package domain

import "time"

type AlertLog struct {
	ID         uint      `gorm:"primaryKey" json:"id"`
	SensorID   string    `json:"sensor_id"`
	WaterLevel float64   `json:"water_level"`
	Message    string    `json:"message"`
	CreatedAt  time.Time `json:"created_at"`
}
