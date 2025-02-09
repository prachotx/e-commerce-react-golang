package model

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	Username  string         `gorm:"size:255;not null" json:"username"`
	Email     string         `gorm:"size:255;not null;unique" json:"email"`
	Password  string         `gorm:"not null" json:"password"`
	Role      string         `gorm:"size:50;not null;default:'USER'" json:"role"`
	Address   []Address      `gorm:"foreignKey:UserID" json:"addresses"`
	CreatedAt time.Time      `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt time.Time      `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}
