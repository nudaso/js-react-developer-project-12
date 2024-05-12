import { configureStore,  } from "@reduxjs/toolkit"
import channelsReducer from "./slices/channelsSlice";
import messagesReducer from "./slices/messagesSlice";
import APIReducer from "./slices/APIslice";


export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    api: APIReducer,
  },
});