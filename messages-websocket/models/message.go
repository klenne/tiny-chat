package models

type Message struct {
	ClientId string `json:"clientID"`
	Username string `json:"username"`
	Message  string `json:"message"`
}
