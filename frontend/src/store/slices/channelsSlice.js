import { createAsyncThunk, createSlice, createEntityAdapter, current } from '@reduxjs/toolkit';
import { getData } from './APIslice';

const channelsAdaptre = createEntityAdapter();

const initialState = channelsAdaptre.getInitialState({currentChannelId: null});

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    addChannele: channelsAdaptre.addOne,
    setChannels: (state, action) => {
      console.dir(action);
      channelsAdaptre.setAll(state, action);
    },
    removeChannel: channelsAdaptre.removeOne,
    renameChanel: channelsAdaptre.setOne,
    setcurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      const {channels, currentChannelId} = action.payload;
      channelsAdaptre.setAll(state, channels);
      channelsSlice.caseReducers.setcurrentChannelId(state, {payload: currentChannelId})
    })
  }
});

export const channelsActions = channelsSlice.actions;
export {initialState};
export const selectors = {...channelsAdaptre.getSelectors((state) => state.channels), currentChannelId: (state) => state.channels.currentChannelId};
export default channelsSlice.reducer;