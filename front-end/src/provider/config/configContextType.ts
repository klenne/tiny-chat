export type ConfigContextType = {
  username: string;
  setUsername: (username: string) => void;
  getWsAddress: () => string;
  getClientId: () => string;
  getDeviceType: () => "mobile" | "tablet" | "desktop";
  isMobile: boolean;
};
