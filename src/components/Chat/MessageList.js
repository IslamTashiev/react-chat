import React, { useContext } from "react";
import { appContext } from "../../context/appContext";
import { Meassge } from "./Meassge";

export const MessageList = () => {
  const { messages } = useContext(appContext);
  return (
    <div className='meassage__list'>
      {messages ? (
        messages.map((message) => (
          <React.Fragment key={message.id}>
            <Meassge message={message} />
          </React.Fragment>
        ))
      ) : (
        <div>Lodaing...</div>
      )}
    </div>
  );
};
