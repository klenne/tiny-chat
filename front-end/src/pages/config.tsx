import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useConfigContext } from "../provider/config/configContextHook";
import { RefObject, useEffect, useRef, useState } from "react";

const Config = (props: { welcomePage?: boolean }) => {
  const navigate = useNavigate();
  const ConfigContext = useConfigContext();
  const [username, setUsername] = useState("");
  const inputRef: RefObject<HTMLInputElement> = useRef({} as HTMLInputElement);
  useEffect(() => {
    inputRef.current.focus();
    setUsername(ConfigContext.username);
    if (props.welcomePage && ConfigContext.username.length > 0) {
      navigate("/");
    }
  }, [ConfigContext.username, ConfigContext.username.length, navigate, props.welcomePage]);

  const save = () => {
    if (username.length == 0) {
      inputRef.current.focus();
      return;
    }
    ConfigContext.setUsername(username);
    navigate("/");
  };
  return (
    <>
      <Card
        elevation={2}
        sx={{
          minHeight: "300px",
          minWidth: ConfigContext.getDeviceType() === "mobile" ? "400px" : "500px",
        }}
      >
        <CardContent
          sx={{
            height: "100%",
            display: "flex",
            flexFlow: "column",
            justifyContent: "space-around",
          }}
        >
          <Typography variant="h5" component="h2" sx={{ fontFamily: "IBM Plex Mono" }}>
            {props.welcomePage ? "Welcome to Tiny Chat" : "Settings"}
          </Typography>
          <div>
            <TextField
              inputRef={inputRef}
              label="Name"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  save();
                }
              }}
            />
          </div>
          <div style={{ alignSelf: "end" }}>
            {!props.welcomePage && (
              <Button
                variant="text"
                onClick={() => {
                  navigate("/");
                }}
              >
                Back
              </Button>
            )}
            <Button variant="text" onClick={save}>
              {!props.welcomePage ? "Confirm" : "Start"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Config;
