import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import socket from "./socket";

import Login from "./components/Login";
import Chat from "./components/Chat";
import withAuthorize from "./HOCs/withAuthorize";

import { messagesActions } from "./store/slices/messagesSlice"
import { channelsActions } from "./store/slices/channelsSlice";

const WithAuthorizeComponent = withAuthorize({
  Authorized: Chat,
  Unauthorized: Navigate,
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    function onConnect() {
      // console.log('socket connection open!')
    }

    function onNewMessage(payload) {
      // const data = JSON.parse(payload) // => { body: "new message", channelId: 7, id: 8, username: "admin" }
      console.log(payload)
      dispatch(messagesActions.addMessage({...payload, channelId: Number(payload.channelId)}))
    }

    function onNewChannel(payload) {
      console.log(payload) // { id: 6, name: "new channel", removable: true }
      dispatch(channelsActions.addChannele(payload));
    }

    function onRemoveChannel(payload) {
      console.log(payload) // // { id: 6 }
      dispatch(channelsActions.removeChannel(payload))
    }

    function onRenameChannel(payload) {
      console.log(payload) // { id: 7, name: "new name channel", removable: true }
      dispatch(channelsActions.renameChanel(payload))
    }
    
    socket.on('connect', onConnect)
    socket.on('newMessage', onNewMessage);
    socket.on('newChannel', onNewChannel);
    socket.on('removeChannel', onRemoveChannel);
    socket.on('renameChannel', onRenameChannel);

    return () => {
      socket.off('connect', onConnect);
      socket.off('newMessage', onNewMessage);
      socket.off('newChannel', onNewChannel);
      socket.off('removeChannel', onRemoveChannel);
      socket.off('renameChannel', onRenameChannel);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/"
          element={<WithAuthorizeComponent to={"/login"}/>}/>
        <Route path="login" element={<Login />}/>
        <Route path="*" element={<p>404 not found</p>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
