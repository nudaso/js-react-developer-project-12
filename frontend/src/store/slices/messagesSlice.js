import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getData } from "./APIslice";

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState()

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    setMessages: messagesAdapter.setAll,
  },
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      const { messages } = action.payload;
      messagesAdapter.setAll(state, messages);
    })
  }
});

export const messagesActions = messagesSlice.actions;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;