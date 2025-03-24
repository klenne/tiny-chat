import { ReactNode, useEffect, useState } from "react";
import { ConfigContext } from "./configContext";
import { v4 as uuidv4 } from "uuid";

const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const usernameStorage = localStorage.getItem("username");
    if (usernameStorage) {
      setUsername(usernameStorage);
    }
  }, []);

  const setUsernameWrapper = (username: string) => {
    localStorage.setItem("username", username);
    setUsername(username);
  };

  const isMobile = navigator.userAgentData?.mobile ?? /Mobi|Android/i.test(navigator.userAgent);

  const getClientId = () => {
    let clientId = localStorage.getItem("clientId");
    if (!clientId) {
      clientId = uuidv4();
      localStorage.setItem("clientId", clientId);
    }
    return clientId;
  };

  const getWsAddress = (): string => {
    return `${import.meta.env.VITE_WS_ADDRESS}?clientId=${getClientId()}`;
  };

  const useDeviceType = (): "mobile" | "tablet" | "desktop" => {
    const getType = () => {
      const width = window.innerWidth;
      if (width <= 767) return "mobile";
      if (width <= 1024) return "tablet";
      return "desktop";
    };

    const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">(getType());

    useEffect(() => {
      const handleResize = () => setDeviceType(getType());
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return deviceType;
  };

  return (
    <ConfigContext.Provider
      value={{
        isMobile: isMobile,
        username: username,
        setUsername: setUsernameWrapper,
        getWsAddress: getWsAddress,
        getClientId: getClientId,
        getDeviceType: useDeviceType,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigProvider;
