// this file corresponds till lec 12.
  
const redux = require('redux')
const createReduxStore = redux.legacy_createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const IC_ORDERED = 'IC_ORDERED';
const IC_RESTOCKED = 'IC_RESTOCKED';


function orderCake(quantity = 1) {
  return {
    type: CAKE_ORDERED,
    payload: quantity
  }
}

function restockCake(quantity = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: quantity
  }
}

function orderIC(quantity = 1) {
  return {
    type: IC_ORDERED,
    payload: quantity
  }
}

function restockIC(quantity = 1) {
  return {
    type: IC_RESTOCKED,
    payload: quantity
  }
}

const initCakeState = {
  numOfCakes: 10
}
const initICState = {
  numOfICs: 20
}

const cakeReducer = (state = initCakeState, action) => {
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
    default: return state
  }
}

const ICReducer = (state = initICState, action) => {
  switch (action.type) {
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
    case CAKE_ORDERED:      // reducers of a type can only manage that part of the state, i.e., ICreducers can only deal with IC values in the store.
      return {              // but, they can still handle the actions corr. to other parts of the state, like here.
        numOfICs: state.numOfICs - 1
      }
    default: return state
  }
}

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: ICReducer
})

// added middleware, they extend the capabilities of redux.
const store = createReduxStore(rootReducer, applyMiddleware(logger));  
// const store = createReduxStore(rootReducer);  
console.log("Initial State: ", store.getState());

const unsubscribe = store.subscribe(() => console.log('Updated State: ', store.getState()))
// const unsubscribe = store.subscribe(() => {})

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