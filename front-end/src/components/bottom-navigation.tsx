import { Box, IconButton } from "@mui/material";
import InputMessage from "./input-message";
import SendIcon from "@mui/icons-material/Send";
import { useMessageContext } from "../provider/message/messageContextHook";
import { MessageContextType } from "../provider/message/messageContextType";
import { useConfigContext } from "../provider/config/configContextHook";
const BottomNavigation = () => {
  const MessageContext: MessageContextType = useMessageContext();
  const ConfigContext = useConfigContext();

  return (
    <Box
      sx={{
        display: "flex",
        paddingLeft: 2,
        paddingRight: 2,
        paddingBottom: 1,
        paddingTop: 1,
        backgroundColor: "#F8F8F8",
        borderTop: "1px solid #d6d6d6",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: ConfigContext.getDeviceType() === "desktop" ? "50%" : "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <InputMessage />
        <IconButton
          sx={{
            color: "#858e99",
            marginLeft: 1,
          }}
          onClick={() => {
            MessageContext.sendMessage();
          }}
        >
          <SendIcon
            sx={{
              fontSize: ConfigContext.getDeviceType() === "desktop" ? "2rem" : "2.2rem",
            }}
          />
        </IconButton>
      </div>
    </Box>
  );
};

export default BottomNavigation;
