// this file is from lec 11

const redux = require('redux')
const createReduxStore = redux.legacy_createStore;
const bindActionCreators = redux.bindActionCreators;


const CAKE_ORDERED = 'CAKE_ORDERED';
function orderCake(quantity = 1) {
  return {
    type: CAKE_ORDERED,
    payload: quantity
  }
}

const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
function restockCake(quantity = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: quantity
  }
}

const IC_ORDERED = 'IC_ORDERED';
function orderIC(quantity = 1) {
  return {
    type: IC_ORDERED,
    payload: quantity
  }
}
const IC_RESTOCKED = 'IC_RESTOCKED';
function restockIC(quantity = 1) {
  return {
    type: IC_RESTOCKED,
    payload: quantity
  }
}

const initState = {
  numOfCakes: 10,
  numOfICs: 20
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - action.payload
      }
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload
      }
    case IC_ORDERED:
      return {
        ...state,
        numOfICs: state.numOfICs - action.payload
      }
    case IC_RESTOCKED:
      return {
        ...state,
        numOfICs: state.numOfICs + action.payload
      }
    default: return state
  }
}

const store = createReduxStore(reducer);  
console.log("Initial State: ", store.getState());

const unsubscribe = store.subscribe(() => console.log('Updated State: ', store.getState()))

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(3))

// not really necessary, but good to know.
const actions = bindActionCreators({orderCake, restockCake, orderIC, restockIC}, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)
actions.orderIC()
actions.orderIC()
actions.restockIC(3)

unsubscribe()