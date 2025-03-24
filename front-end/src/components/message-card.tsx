import { Box, Card, CardContent, Typography } from "@mui/material";
import { useConfigContext } from "../provider/config/configContextHook";
import Message from "../model/message/Message";
import { formatTime } from "../util/dateFormatter";

interface MessageCardProps {
  message: Message;
}
const MessageCard = (props: MessageCardProps) => {
  const ConfigContext = useConfigContext();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignSelf: props.message.isSender ? "flex-end" : "flex-start",
          position: "relative",
          maxWidth: "60vw",
          minWidth: ConfigContext.getDeviceType() === "desktop" ? "5vw" : "20vw",
        }}
      >
        <Card
          elevation={0}
          sx={{
            maxWidth: "60vw",
            minHeight: "20px",
            backgroundColor: props.message.isSender ? "#0580ff" : "#E5E5EB",
            borderRadius: "30px",
            wordWrap: "break-word",
          }}
        >
          <CardContent
            sx={{
              paddingBottom:
                ConfigContext.getDeviceType() === "desktop" ? "0 !important" : "5px !important",
            }}
          >
            {!props.message.isSender && (
              <Typography
                gutterBottom
                sx={{ color: "#2e2e2f", fontSize: 12, textAlign: "start", fontWeight: "600" }}
              >
                {props.message.username}
              </Typography>
            )}

            <Typography
              variant="body1"
              sx={{
                fontFamily: "Inter",
                textAlign: "start",
                color: props.message.isSender ? "#FAFAFA" : "#2e2e2f",
                paddingRight: "5px",
              }}
            >
              {props.message.data}
            </Typography>
            <Typography
              sx={{
                fontSize: 8,
                textAlign: "end",
                paddingTop: "5px",
                paddingBottom:
                  !props.message.isSender && ConfigContext.getDeviceType() === "desktop"
                    ? "10px"
                    : "3px",
                paddingRight: props.message.isSender ? "9px" : "0px",
                color: props.message.isSender ? "#FAFAFA" : "#2e2e2f",
                minWidth: "100px",
              }}
            >
              {formatTime(props.message.timestamp)}
            </Typography>
          </CardContent>
        </Card>
        <Box
          sx={{
            position: "absolute",
            bottom: -4,
            left: props.message.isSender ? "auto" : 12,
            right: props.message.isSender ? 12 : "auto",
            width: 16,
            height: 12,
            backgroundColor: props.message.isSender ? "#0580ff" : "#E5E5EB",
            clipPath: props.message.isSender
              ? "polygon(100% 100%, 0 50%, 100% 0)"
              : "polygon(0 100%, 100% 50%, 0 0)",
          }}
        />
      </Box>
    </>
  );
};

export default MessageCard;
