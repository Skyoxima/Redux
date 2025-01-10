import { createSlice } from '@reduxjs/toolkit';
import { ordered as cakeOrdered, restocked as cakeRestocked } from '../cake/cakeSlice.js';

const initialState = {
  numOfIceCreams: 20
}

const iceCreamSlice = createSlice({
  name: 'icecream',
  initialState,
  reducers: {
    ordered: (state, action) => {
      state.numOfIceCreams -= action.payload;
    },
    restocked: (state, action) => {
      state.numOfIceCreams += action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(cakeOrdered, (state) => {
      state.numOfIceCreams--
    })
  }
})

export default iceCreamSlice.reducer;
export const { ordered, restocked } = iceCreamSlice.actions;