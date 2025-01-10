const redux = require('redux');
const createReduxStore = redux.legacy_createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').thunk;
const axios = require('axios');
const logger = require('redux-logger').createLogger()

const initState = {
  loading: false,
  users: [],
  error: ''
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED
  }
}

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users
  }
}

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error
  }
}

const reducer = (state = initState, action) => {
  switch(action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case FETCH_USERS_SUCCEEDED:
      return {
        loading: false,
        users: action.payload,
        error: ''
      }
      case FETCH_USERS_FAILED:
        return {
        loading: false,
        users: [],
        error: action.payload
      }
    default: return state;
  }
}

//~ this is an action creator, but thunk makes it possible to return a function rather than an object with 'type' property.
//~ it dispatches actions, which are then used inside the definition to change the state, as provided by the argument to the function it is returning
const fetchUsers = () => {
  return function(dispatch) {
    dispatch(fetchUsersRequest());
    axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      const users = response.data.map((user) => user.id)
      dispatch(fetchUsersSuccess(users));
    })
    .catch((error) => {
      dispatch(fetchUsersFailure(error.message));
    })
  }
}

console.log(fetchUsers())

const store = createReduxStore(reducer, applyMiddleware(thunkMiddleware, logger));
store.subscribe(() => {
  console.log(store.getState())
})

store.dispatch(fetchUsers())  
// the middleware application has changed (overloaded) the dispatch function, hence it is then passed to the fetchUsers function in this line internally
// you can check the type previews by creating a vanilla store and see, Thunk changes the dispatch function.
// my understanding is that the dispatch function is changed to be able to be passed to fetchUsers is that to make it compatible with Async.
// store.dispatch is synchronous but, dispatch(fetchUsers___) and all are asynchronous as they are called within fetch-then blocks