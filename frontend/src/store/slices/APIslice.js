import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import routes from "../../routes";

export const getData = createAsyncThunk(
  'API/getData',
  async (authToken) => {
    const response = await fetch(routes.dataPath(), {
      headers: {
        "Authorization": `Bearer ${authToken}`,
      }
    })
    return await response.json()
  }
);


const APIslice = createSlice({
  name: "API",
  initialState: {
    getData: {},
  },
  extraReducers: builder => {
    builder.addCase(getData.pending, (state) => {
      state.getData.loadingStatus = "loading";
      console.log('start')
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.getData.loadingStatus = "idle";
      console.log(`res:`)
    });
    builder.addCase(getData.rejected, (state, action) => {
      state.getData.loadingStatus = "failed";
      console.log(`rej:`)
    });


  }
})

export default APIslice.reducer;

export const dataApiStatusSelector = (state) => state.api.getData.loadingStatus;