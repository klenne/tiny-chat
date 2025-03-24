import "./App.css";
import ConfigProvider from "./provider/config/configProvider";
import MessageProvider from "./provider/message/MessageProvider";
import Router from "./routes/router";

function App() {
  return (
    <>
      <ConfigProvider>
        <MessageProvider>
          <Router />
        </MessageProvider>
      </ConfigProvider>
    </>
  );
}

export default App;
