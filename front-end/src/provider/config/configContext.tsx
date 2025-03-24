import { createContext } from "react";
import { ConfigContextType } from "./configContextType";

export const ConfigContext = createContext<ConfigContextType | undefined>(undefined);
