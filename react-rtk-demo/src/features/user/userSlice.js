import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  users: [],
  error: ''
}

export const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
  return axios.get('https://jsonplaceholder.typicode.com/users').then(response => response.data);
})

//* .get() returns a promise, on whose's resolution (or rejection) the .then portion executes.
//* .then() also returns a promise, with the O/P of the callback that was executed inside. This promise is overall being returned by the createAsyncThunk function here, it is different from the vanilla redux, which returns a function
//* I've talked about the usage of this final returned promise in the RTK createAsyncThunk version's index.js.

//~ Other way of writing an async function
// export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
//   const response = await axios.get('https://jsonplaceholder.typicode.com/users');
//   return response.data.map(user => user.id);
// }) 

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

export default userSlice.reducer;