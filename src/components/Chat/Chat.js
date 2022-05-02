import React, { useContext, useState } from "react";

import avatarIcon from "../../assets/icons/user-icon.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import clipIcon from "../../assets/icons/paperclip.svg";
import sendIcon from "../../assets/icons/send.svg";
import micIcon from "../../assets/icons/mic-off.svg";
import { MessageList } from "./MessageList";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { appContext } from "../../context/appContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export const Chat = () => {
  const [message, setMessage] = useState("");

  const { createMessage } = useContext(appContext);
  const navigate = useNavigate();
  const user = useUser();

  const logout = async () => {
    signOut(auth)
      .then(() => {
        console.log("Loged out");
        navigate("/login");
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const handleSubmit = async () => {
    const addedMessage = {
      messageAuthor: {
        name: user.displayName,
        imageURL: user.photoURL,
        id: user.uid,
      },
      messageText: message,
      createdAt: serverTimestamp(),
    };
    await createMessage(addedMessage);
    setMessage("");
  };

  return (
    <div className='chat'>
      <div className='container'>
        <div className='chat__content'>
          <div className='chat__header'>
            <div className='chat__header-info'>
              <div className='chat__header-avatar'>
                <img src={user.photoURL} />
              </div>
              <div className='chat__header-user'>
                <div className='user__name'>{user.displayName}</div>
                <div className='user__email'>{user.email}</div>
              </div>
            </div>
            <img onClick={logout} className='logout' src={logoutIcon} />
          </div>
          <MessageList />
          <div className='chat__send'>
            <div className='chat__send-item'>
              <img src={clipIcon} />
              <div className='line'></div>
              <textarea
                type='text'
                placeholder='To write a message...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>
            <div className='chat__send-item'>
              <img onClick={handleSubmit} src={sendIcon} />
              <div className='line'></div>
              <img src={micIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
