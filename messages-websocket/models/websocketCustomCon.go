package models

import "github.com/gorilla/websocket"

type WebsocketCustomConn struct {
	Conn     *websocket.Conn
	ClientId string
}