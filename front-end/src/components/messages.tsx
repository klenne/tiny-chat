import Grid from "@mui/material/Grid2";
import MessageCard from "./message-card";
import { useMessageContext } from "../provider/message/messageContextHook";

import { MessageContextType } from "../provider/message/messageContextType";
import { v4 as uuidv4 } from "uuid";

const Messages = () => {
  const messageContext: MessageContextType = useMessageContext();

  return (
    <>
      <Grid
        container
        rowSpacing={2}
        spacing={2}
        sx={{
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          paddingBottom: 2,
          paddingLeft: 1,
          paddingRight: 1,
        }}
        overflow={"auto"}
        wrap="nowrap"
      >
        {messageContext.messages.map((item) => (
          <MessageCard key={uuidv4()} message={item} />
        ))}
      </Grid>
    </>
  );
};

export default Messages;
