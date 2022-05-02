import React, { useContext, useEffect } from "react";
import { Chat } from "../components/Chat/Chat";
import { appContext } from "../context/appContext";

export const ChatPage = () => {
  const { getMessages } = useContext(appContext);

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div>
      <Chat />
    </div>
  );
};
