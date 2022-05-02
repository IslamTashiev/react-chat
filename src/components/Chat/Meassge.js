import { formatDistanceToNow } from "date-fns";
import React from "react";
import { useUser } from "../../hooks/useUser";
export const Meassge = ({ message }) => {
  const user = useUser();
  const author = message.messageAuthor;
  const time = formatDistanceToNow(message.createdAt.toDate(), {
    includeSeconds: false,
    addSuffix: true,
  });

  return (
    <div className={`message ${user.uid === author.id ? "me" : ""}`}>
      <img className='avatar' src={author.imageURL} />
      <div className='meassage__content'>
        <div className='meassage__content-header'>
          <div className='message__author-name'>{author.name}</div>
          <div className='message__created-date'>{time}</div>
        </div>
        <p className='message__text'>{message.messageText}</p>
      </div>
    </div>
  );
};
