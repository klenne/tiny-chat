package main

import (
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"tiny-websocket/models"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

var clients = make(map[*models.WebsocketCustomConn]bool)
var broadcast = make(chan models.BroadcastMessage)

func main() {
	http.HandleFunc("/ws", handleConnections)

	go handleMessages()

	log.Println("HTTP server started on :1999")
	err := http.ListenAndServe(":1999", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func handleConnections(w http.ResponseWriter, r *http.Request) {
	clientId := r.URL.Query().Get("clientId")

	if len(clientId) == 0 {
		log.Printf("No client Id provided")
		return
	}
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	defer ws.Close()

	conn := models.WebsocketCustomConn{Conn: ws, ClientId: clientId}
	clients[&conn] = true

	for {
		var msg models.Message
		err := ws.ReadJSON(&msg)
		if err != nil {
			log.Printf("error: %v", err)
			delete(clients, &models.WebsocketCustomConn{Conn: ws, ClientId: clientId})
			break
		}
		broadcast <- models.BroadcastMessage{Sender: ws, Message: msg}
	}
}

func handleMessages() {
	for {
		broadcastMsg := <-broadcast

		for client := range clients {
			if broadcastMsg.Message.ClientId == client.ClientId {
				continue
			}
			err := client.Conn.WriteJSON(broadcastMsg.Message)
			if err != nil {
				log.Printf("error: %v", err)
				client.Conn.Close()
				delete(clients, client)
			}
		}
	}
}
