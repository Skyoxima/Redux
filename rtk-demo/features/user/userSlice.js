const createSlice = require('@reduxjs/toolkit').createSlice;
const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk;
const axios = require('axios');

const initialState = {
  loading: false,
  users: [],
  error: ''
}

// "Lifecycle" functions
//~ Returns pending, fulfilled and rejected actions types on its own, which would be the actions whose handling will need to be specified in the extraReducers
// extraReducers because these are not standard actions that are created by createSlice, it they're actions creator by createAsyncThunk
const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
  return axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
    return response.data.map(user => user.id);
  })
}) 

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, state => {
      state.loading = true;
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = '';
      console.log(action)
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
      console.log(action)
    })
  }
})

module.exports = userSlice.reducer;
module.exports.fetchUsers = fetchUsers;


/* returned action object - fulfilled
{
  type: 'user/fetchUsers/fulfilled',
  payload: [
    1, 2, 3, 4,  5,
    6, 7, 8, 9, 10
  ],
  meta: {
    arg: undefined,
    requestId: 'vUB8BWQDm2im2JA3qLMZR',
    requestStatus: 'fulfilled'
  }
}
*/

/* returned action object - rejected
{
  type: 'user/fetchUsers/rejected',
  payload: undefined,
  meta: {
    arg: undefined,
    requestId: 'xl0N4h6epQMSY653iXDSb',
    rejectedWithValue: false,
    requestStatus: 'rejected',
    aborted: false,
    condition: false
  },
  error: {
    name: 'AxiosError',
    message: 'Request failed with status code 404',
    stack: 'AxiosError: Request failed with status code 404\n' +
      '    at settle (F:\\Own Work\\Frontend Frameworks on Own\\Redux\\rtk-demo\\node_modules\\axios\\dist\\node\\axios.cjs:2026:12)\n' +
      '    at IncomingMessage.handleStreamEnd (F:\\Own Work\\Frontend Frameworks on Own\\Redux\\rtk-demo\\node_modules\\axios\\dist\\node\\axios.cjs:3142:11)\n' +
      '    at IncomingMessage.emit (node:events:525:35)\n' +
      '    at endReadableNT (node:internal/streams/readable:1358:12)\n' +
      '    at processTicksAndRejections (node:internal/process/task_queues:83:21)\n' +
      '    at Axios.request (F:\\Own Work\\Frontend Frameworks on Own\\Redux\\rtk-demo\\node_modules\\axios\\dist\\node\\axios.cjs:4252:41)\n' +
      '    at processTicksAndRejections (node:internal/process/task_queues:96:5)\n' +
      '    at async F:\\Own Work\\Frontend Frameworks on Own\\Redux\\rtk-demo\\node_modules\\@reduxjs\\toolkit\\dist\\cjs\\redux-toolkit.development.cjs:975:27',
    code: 'ERR_BAD_REQUEST'
  }
}
*/