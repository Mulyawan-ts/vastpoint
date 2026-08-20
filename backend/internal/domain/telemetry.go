package domain

import "time"

type WaterTelemetry struct {
	ID         uint      `gorm:"primaryKey" json:"id"`
	SensorID   string    `gorm:"index;type:varchar(50);not null" json:"sensor_id"`
	WaterLevel float64   `gorm:"type:numeric(8,2)" json:"water_level"`
	FlowRate   float64   `gorm:"type:numeric(8,2)" json:"flow_rate"`
	Timestamp  time.Time `gorm:"autoCreateTime" json:"timestamp"`
}
