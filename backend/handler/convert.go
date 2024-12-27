package handler

import (
	"mime/multipart"
	"net/http"
	"path/filepath"
	"strings"
)

func convertToUint(userIDInterface interface{}) uint {
	userIDFloat, ok := userIDInterface.(float64)
	if !ok {
		return 0
	}

	return uint(userIDFloat)
}

// ตรวจสอบ MIME Type
func isValidImage(file *multipart.FileHeader) bool {
	openedFile, err := file.Open()
	if err != nil {
		return false
	}
	defer openedFile.Close()

	// อ่าน header ของไฟล์ (4 bytes แรก)
	buf := make([]byte, 512)
	_, err = openedFile.Read(buf)
	if err != nil {
		return false
	}

	// ตรวจสอบ MIME type
	mimeType := http.DetectContentType(buf)
	return mimeType == "image/jpeg" || mimeType == "image/png" || mimeType == "image/gif"
}

// ตรวจสอบส่วนขยายไฟล์
func isAllowedExtension(filename string) bool {
	ext := strings.ToLower(filepath.Ext(filename))
	allowedExtensions := []string{".jpg", ".jpeg", ".png", ".gif"}
	for _, allowed := range allowedExtensions {
		if ext == allowed {
			return true
		}
	}
	return false
}
