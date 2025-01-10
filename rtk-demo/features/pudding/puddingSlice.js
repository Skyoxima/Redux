const createSlice = require('@reduxjs/toolkit').createSlice;
const axios = require('axios');
const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk;


const initialState = {
  noofpuddings: 30
}

const fetchRandom = createAsyncThunk('pudding/randorder', () => {
  return axios.get('http://www.randomnumberapi.com/api/v1.0/random?min=5&max=15&count=1').then(response => {
    return response.data[0]
  })
})

const puddingSlice = createSlice({
  name: 'pudding',
  initialState,
  reducers: {
    ordered: (state, action) => {
      state.noofpuddings -= action.payload;
    },
    restocked: (state, action) => {
      state.noofpuddings += action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRandom.fulfilled, (state, action) => {
      state.noofpuddings -= action.payload;
    })
  }
})

module.exports = puddingSlice.reducer;
module.exports.puddingActions = puddingSlice.actions;
module.exports.fetchRandom = fetchRandom;