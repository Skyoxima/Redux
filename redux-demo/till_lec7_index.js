const redux = require('redux')
// as it is now deprecated, I'm using the alias that specifies that... it's just for learning purpose, later I'll learn the reduxjs/toolkit version 
const createReduxStore = redux.legacy_createStore;



const CAKE_ORDERED = 'CAKE_ORDERED';
// action creator - returns the action object, which would be invoked by the JS app, and be passed to reducer
function orderCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 1
  }
}

const initState = {
  numOfCakes: 10
}


// this won't be hoisted as an arrow function... maybe why it's written as so?
// reducer
const reducer = (state = initState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,       // this is similar to how state is handled in react w/o hooks
        numOfCakes: state.numOfCakes - 1
      }
    default: return state
  }
}

const store = createReduxStore(reducer);   // state (initState) → reducer → store (this is how the state is delivered to the store via the create function)
// Should be initState itself
console.log("Initial State: ", store.getState());


// very similar to Svelte's subscription method... a parallel to useEffect could also be drawn here...
// subscribing (listerning) to the changes in state stored in the store. The callback function is called everytime the store's state changes
const unsubscribe = store.subscribe(() => console.log('Updated State: ', store.getState()))

// "notifying" the store that the state is going to be changed, how? - is indicated by the action passed to this dispatch function
// internally then, the reducer is called and the action provided here will be given to it and the corresponding "reductions" will be performed and the state will be updated.
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())


unsubscribe()