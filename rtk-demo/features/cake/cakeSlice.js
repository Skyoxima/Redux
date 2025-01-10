const createSlice = require('@reduxjs/toolkit').createSlice;

const initialState = {
  numOfCakes: 10
}

// obj as arg
const cakeSlice = createSlice({
  name: 'cake',
  initialState,       //equivalent to initialState: initialState
  reducers: {
    ordered: (state, action) => {
      // this looks like mutation, impure, but internally createSlice is using the inmer approach to "draft" a return object based on what we're doing here. Check its file out for more info
      state.numOfCakes -= action.payload;
    },
    restocked: (state, action) => {
      state.numOfCakes += action.payload;
    }
  }
})

module.exports = cakeSlice.reducer; // .reducer returns the "combined" reducers, i.e., it has provisions for all actions (ordered, restocked, etc.) as specified above
module.exports.cakeActions = cakeSlice.actions;