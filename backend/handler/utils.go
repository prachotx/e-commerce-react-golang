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

func isValidImage(file *multipart.FileHeader) bool {
	openedFile, err := file.Open()
	if err != nil {
		return false
	}
	defer openedFile.Close()

	buf := make([]byte, 512)
	_, err = openedFile.Read(buf)
	if err != nil {
		return false
	}

	mimeType := http.DetectContentType(buf)
	return mimeType == "image/jpeg" || mimeType == "image/png" || mimeType == "image/gif"
}

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
