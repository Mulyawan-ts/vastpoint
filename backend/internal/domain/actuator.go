package domain

import "time"

type ActuatorState struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Device    string    `gorm:"uniqueIndex" json:"device"` // "DRAINAGE_VALVE" atau "AUX_PUMP"
	Status    string    `json:"status"`                    // "OPEN"/"CLOSED" atau "ON"/"OFF"
	UpdatedAt time.Time `json:"updated_at"`
}
