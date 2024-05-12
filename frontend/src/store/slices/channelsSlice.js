import { createAsyncThunk, createSlice, createEntityAdapter, current } from '@reduxjs/toolkit';
import { getData } from './APIslice';

const channelsAdaptre = createEntityAdapter();

const initialState = channelsAdaptre.getInitialState({currentChannelId: null});


export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (authToketn) => {
    const responseChanels = await fetch("/api/v1/channels", {
      headers: {
        "Authorization": `Bearer ${authToketn}`,
      }
    });
    const dataChanels = await responseChanels.json();
    return dataChanels;
  }
)


const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    addChannele: channelsAdaptre.addOne,
    addChannels: channelsAdaptre.addMany,
    removeChannel: channelsAdaptre.removeOne,
    renameChanel: channelsAdaptre.setOne,
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
      console.log(current(state));
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      const {channels, currentChannelId} = action.payload;
      channelsAdaptre.addMany(state, channels);
      channelsSlice.caseReducers.setCurrentChannelId(state, channelsSlice.actions.setCurrentChannelId(currentChannelId));
    })
  }
});

export const { addChannele, addChannels, removeChannel, renameChanel } = channelsSlice.actions;
export {initialState};
export const selectors = {...channelsAdaptre.getSelectors((state) => state.channels), currentChannelId: (state) => state.channels.currentChannelId};
export default channelsSlice.reducer;