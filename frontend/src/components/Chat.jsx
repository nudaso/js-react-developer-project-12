import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { selectors as channelsSelectors, fetchChannels } from "../store/slices/channelsSlice";
import { selectors as messagesSelectors, fetchMessages, addMessage, addMessageAPI } from "../store/slices/messagesSlice";
import { useSelector, useDispatch } from "react-redux";
import socket from "../socket";
import { getData, dataApiStatusSelector } from "../store/slices/APIslice";

const newMessage = { body: 'new message', channelId: '1', username: 'admin' };

function Chat() {
  const {logOut, authData} = useAuth();
  const { token: authToken } = authData;
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const messages = useSelector(messagesSelectors.selectAll);
  const loadingData = useSelector(dataApiStatusSelector);
  const currentChannelId = useSelector(channelsSelectors.currentChannelId);
  useEffect(() => {
    dispatch(getData(authToken));
  }, []);
  
  return (
    loadingData === 'idle' ? 
      (
        <>
        <form onSubmit={(e) => {
          e.preventDefault();
          socket.emit('newMessage', newMessage, (res) => {
            console.log(`emit status: ${res.status}`);
          })
        }}>
          <label htmlFor="message sr-only">message</label>
          <input type="text" id="message" name="message"/>
          <button>send</button>
        </form>
        <hr/>
        <p>chat</p>
        <button onClick={() => {
          logOut();
        }}>log out</button>
        { channels ? channels.map((channel) => <p key={channel.id}>{channel.id === currentChannelId ? 'current:' : ''} {channel.id}-{channel.name}</p>) : null}
        <hr/>
        { messages ? messages.map((message) => <p key={message.id}>{message.username}-{message.body}</p>) : null}
        </>
      )
      : <p>loading status: {loadingData}</p>
  )
}

export default Chat;