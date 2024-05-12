import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getData } from "./APIslice";

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (authToken) => {
    const responseMessages = await fetch("/api/v1/messages", {
      headers: {
        "Authorization": `Bearer ${authToken}`,
      }
    });
    const dataMessages = await responseMessages.json();
    return dataMessages;
  }
)

export const addMessageAPI = createAsyncThunk(
  'messages/addMessages',
  async (authToken, newMessage) => {
    const responseMessages = await fetch("/api/v1/messages", {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${authToken}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(newMessage),
    });
    const dataMessages = await responseMessages.json();
    return dataMessages;
  }
)

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState()

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      const { messages } = action.payload;
      messagesAdapter.addMany(state, messages);
    })
  }
});

export const { addMessage, addMessages } = messagesSlice.actions;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;