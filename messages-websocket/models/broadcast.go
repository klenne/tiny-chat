package models

import "github.com/gorilla/websocket"

type BroadcastMessage struct {
	Sender  *websocket.Conn
	Message Message
}
