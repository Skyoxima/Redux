const createSlice = require('@reduxjs/toolkit').createSlice;
const cakeActions = require('../cake/cakeSlice.js').cakeActions;

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
  extraReducers: (builder) => {                   // make note of this notation, this is the latest one, and the one from the tutorial is deprecated.
    builder.addCase(cakeActions.ordered, (state) => {
      state.numOfIceCreams--
    })
  }
})

module.exports = iceCreamSlice.reducer;
module.exports.iceCreamActions = iceCreamSlice.actions;



/* cakeAction. In builder.addCase, cakeActions.ordered internally fetches the 'type' string, notice that it is not running the function
'ordered', it is using it as a property. The contrast can be seen when dispatching the actions in index.js
{
  ordered: [Function: actionCreator] {
    toString: [Function (anonymous)],
    type: 'cake/ordered',
    match: [Function (anonymous)]
  },
  restocked: [Function: actionCreator] {
    toString: [Function (anonymous)],
    type: 'cake/restocked',
    match: [Function (anonymous)]
  }
}
*/