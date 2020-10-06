import React, {useEffect} from 'react';
import ChatMessage from '../Chat/ChatMessage/ChatMessage';

const Chat = (props) => {
  useEffect(() => {
    // Always scroll to the bottom of the ad
    window.scrollTo(0, document.body.scrollHeight)
    })

  let messages = props.chatHistory.messages.map((el) => {
    return (
      <ChatMessage
        key={el.messageId}
        messageSender={el.messageSender}
        chatText={el.messageText}
        messageType={el.messageType}
        mediaSrc={el.mediaSrc}
        mediaAlt={el.mediaAlt}
      />
    );
  });

  return <main className='chat'>{messages}</main>;
};

export default Chat;
