import { useEffect, useRef } from "react";
import { useAuth } from "../contexts/authContext";
import { selectors as channelsSelectors, channelsActions} from "../store/slices/channelsSlice";
import { selectors as messagesSelectors, } from "../store/slices/messagesSlice";
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
  const state = useSelector(state => state);
  const countRerender = useRef(0);
  useEffect(() => {
    dispatch(getData(authToken));
  }, []);
  useEffect(() => {
    countRerender.current += 1;
    console.log(countRerender.current);
    console.dir(state);
  });
  return (
    loadingData === 'idle' ? 
      (
        <>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const message = formData.get('message')
          socket.emit('newMessage', {...newMessage, channelId: currentChannelId, body: message}, (res) => {
            if (res.status === 'ok') {
              e.target.reset();
            }
          })
          
        }}>
          <label htmlFor="message sr-only">message: </label>
          <input type="text" id="message" name="message"/>
          <button>send</button>
        </form>
        <hr/>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const name = formData.get('name')
          socket.emit('newChannel', {name}, (res) => {
            if (res.status === 'ok') {
              e.target.reset();
            }
          })
          
        }}>
          <label htmlFor="message sr-only">channel name: </label>
          <input type="text" id="name" name="name"/>
          <button>send</button>
        </form>
        <hr />
        <p>chat</p>
        <button onClick={() => {
          logOut();
        }}>log out</button>
        { channels
          ? channels
            .map((channel) => 
              <>
                <p key={channel.id} onClick={() => dispatch(channelsActions.setcurrentChannelId(channel.id))}>{channel.id === currentChannelId ? 'current:' : ''} {channel.id}-{channel.name}</p>
                {channel.removeble ? <span>da</span> : <span>net</span>}
              </>
            ) 
          : null}
        <hr/>
        { messages 
          ? messages
            .filter((message) => message.channelId === currentChannelId)
            .map((message) => <p key={message.id}>{message.username}-{message.body}</p>)
          : null
        }
        </>
      )
      : <p>loading status: {loadingData}</p>
  )
}

export default Chat;