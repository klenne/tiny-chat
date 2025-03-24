import Input from "@mui/material/Input";
import { InputAdornment } from "@mui/material";
import { useMessageContext } from "../provider/message/messageContextHook";
import { useConfigContext } from "../provider/config/configContextHook";
import { RefObject, useEffect, useRef } from "react";

const InputMessage = () => {
  const messageContext = useMessageContext();
  const ConfigContext = useConfigContext();
  const inputRef: RefObject<HTMLInputElement> = useRef({} as HTMLInputElement);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <Input
        inputRef={inputRef}
        multiline
        sx={{
          width: "100%",
          paddingLeft: 1,
          paddingRight: 1,
          "&::before, &::after": {
            display: "none",
          },
          backgroundColor: "white",
          border: "1px solid #858e99",
          borderRadius: "20px",
          maxHeight: "100px",
          height: ConfigContext.getDeviceType() === "desktop" ? "unset" : "55px",
          fontSize: ConfigContext.getDeviceType() === "desktop" ? "1rem" : "1.1rem",
          overflow: "auto",
        }}
        value={messageContext.inputMessage}
        onChange={(e) => messageContext.setInputMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            messageContext.sendMessage();
          }
        }}
        startAdornment={<InputAdornment position="start">{">"}</InputAdornment>}
      />
    </>
  );
};

export default InputMessage;
