const configureStore = require('@reduxjs/toolkit').configureStore;
const cakeReducer = require('../features/cake/cakeSlice.js');
const iceCreamReducer = require('../features/icecream/iceCreamSlice.js');
const puddingReducer = require('../features/pudding/puddingSlice.js');

const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();

const userReducer = require('../features/user/userSlice.js');

const store = configureStore({
  reducer: {
    // cake: cakeReducer,
    // iceCream: iceCreamReducer,
    pudding: puddingReducer,
    // user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

module.exports = store