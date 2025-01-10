//~ folder structure in the rtk-demo folder is something that is opinionated by the redux team, it is a good practice to follow

const store = require('./app/store.js');
// const cakeActions = require('./features/cake/cakeSlice.js').cakeActions;
// const iceCreamActions = require('./features/icecream/iceCreamSlice.js').iceCreamActions;
// const fetchUsers = require('./features/user/userSlice.js').fetchUsers;
const puddingActions = require('./features/pudding/puddingSlice.js').puddingActions;
const fetchRandom = require('./features/pudding/puddingSlice.js').fetchRandom;


console.log('Initial State: ', store.getState().pudding);

const unsubscribe = store.subscribe(() => {
  // console.log('Updated State: ', store.getState().pudding);
})

// console.log(store.dispatch(puddingActions.ordered(4)));
store.dispatch(puddingActions.ordered(4));
store.dispatch(puddingActions.ordered(1));
store.dispatch(puddingActions.restocked(5));
store.dispatch(puddingActions.ordered(10));
// console.log(store.dispatch(fetchRandom()));

//~ 2 ways to make asynchronous and synchronous actions follow the order
//~ the dispatch function returns a Promise for, I suppose, this very usage 
// (async function() {
  
//   await store.dispatch(fetchRandom())
//   store.dispatch(puddingActions.restocked(7));
// }
// )();

// store.dispatch(fetchRandom()).then(resolve => {
//   store.dispatch(puddingActions.restocked(7))
// })

// store.dispatch(fetchUsers())

// store.dispatch(cakeActions.ordered(1))
// store.dispatch(cakeActions.ordered(1))
// store.dispatch(cakeActions.ordered(2))
// store.dispatch(cakeActions.restocked(5))

// store.dispatch(iceCreamActions.ordered(2))
// store.dispatch(iceCreamActions.ordered(2))
// store.dispatch(iceCreamActions.ordered(2))
// store.dispatch(iceCreamActions.restocked(10))

// unsubscribe()  // async functions don't usually entail unsubscribe in the global scope... I presume unsubscribe would be in the .then blocks of the final async activity