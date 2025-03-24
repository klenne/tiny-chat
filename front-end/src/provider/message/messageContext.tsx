import { createContext } from "react";
import { MessageContextType } from "./messageContextType";

export const MessageContext = createContext<MessageContextType | undefined>(undefined);
