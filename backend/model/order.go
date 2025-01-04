package model

import (
	"time"

	"gorm.io/gorm"
)

type Order struct {
	ID          uint           `gorm:"primaryKey" json:"id"`
	UserID      uint           `gorm:"not null" json:"user_id"`
	User        User           `gorm:"foreignKey:UserID" json:"-"`
	TotalAmount float64        `gorm:"not null" json:"total_amount"`
	Status      string         `gorm:"size:20;not null;default:'pending'" json:"status"`
	Address     string         `gorm:"type:text;not null" json:"address"`
	Province    string         `gorm:"size:255;not null" json:"province"`
	District    string         `gorm:"size:255;not null" json:"district"`
	SubDistrict string         `gorm:"size:255;not null" json:"sub_district"`
	Postcode    string         `gorm:"size:255;not null" json:"postcode"`
	CreatedAt   time.Time      `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt   time.Time      `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
}
