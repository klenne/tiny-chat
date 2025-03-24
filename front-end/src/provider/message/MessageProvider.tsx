import { ReactNode, useEffect, useState } from "react";
import Message from "../../model/message/Message";
import { MessageContext } from "./messageContext";
import { useConfigContext } from "../config/configContextHook";

const MessageProvider = ({ children }: { children: ReactNode }) => {
  const configContext = useConfigContext();
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([] as Message[]);

  useEffect(() => {
    const ws = new WebSocket(configContext.getWsAddress());

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages((prevMessages) => {
        const message: Message = {
          username: msg.username,
          data: msg.message,
          isSender: false,
          timestamp: new Date(),
        };
        return [...prevMessages, message];
      });
    };

    return () => {
      ws.close();
    };
  }, [configContext]);

  const sendMessage = () => {
    if (inputMessage.length === 0) {
      return;
    }
    const message = {
      username: configContext.username,
      isSender: true,
      data: inputMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    const ws = new WebSocket(configContext.getWsAddress());
    const msg = {
      username: configContext.username,
      message: message.data,
      clientId: configContext.getClientId(),
    };

    ws.onopen = () => {
      ws.send(JSON.stringify(msg));
    };
    setInputMessage("");
  };

  return (
    <MessageContext.Provider
      value={{
        inputMessage: inputMessage,
        setInputMessage: setInputMessage,
        messages: messages,
        sendMessage: sendMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
