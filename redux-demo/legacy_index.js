import redux from 'redux';
const createReduxStore = redux.legacy_createStore //! Outdated...it is advised to use reduxjs/toolkit by redux themselves.

// preferred practice to avoid spelling errors. In real-world scenarios, it is a common practice to keep all of these in a separate file.
const BUY_CAKE = 'BUY_CAKE'

// action creator - returns an action. Actions are objects that always have a 'type' property.
function buyCake() {
  return {
    type: BUY_CAKE,
    info: 'First Redux Action'
  }
}

// initial state, to be provided as default to a reducer at the start of the app, and also to the store via it.
const initialState = {
  numOfCakes: 10
}

// reducer - returns the new state based on the action's type and the prevState. Pure Functions are used, always.
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE: return {
      ...state,   // keep everything as is, then change the specified property (shown below)
        numOfCakes: state.numOfCakes - 1
      }

    // unaccounted for actions, don't change anything, be an identity function (pure) and return the provided state as is
    default: return state;
  }
}

