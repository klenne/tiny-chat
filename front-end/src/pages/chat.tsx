import { useEffect } from "react";
import BottomNavigation from "../components/bottom-navigation";
import Header from "../components/header";
import Messages from "../components/messages";
import { useConfigContext } from "../provider/config/configContextHook";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const configContext = useConfigContext();
  const navigate = useNavigate();

  useEffect(() => {
    const usernameStorage = localStorage.getItem("username");
    if (!usernameStorage) {
      navigate("/welcome");
    }
  }, [configContext.username.length, navigate]);

  return (
    <>
      <Header />
      <Messages />
      <BottomNavigation />
    </>
  );
};

export default Chat;
