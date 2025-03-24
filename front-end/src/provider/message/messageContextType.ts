import Message from "../../model/message/Message";

export type MessageContextType = {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  messages: Message[];
  sendMessage: () => void;
};
