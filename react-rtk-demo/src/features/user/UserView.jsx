import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from './userSlice.js';

export const UserView = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchUsers());
  },[])
  
  // dispatch is happening twice because of StrictMode, otherwise it will be only once on componentMount as expected
  
  return (
    <div>
      <h2>List of Users: </h2>
      {user.loading && <div>Loading...</div>}
      {!user.loading && user.error ? <div>Error: {user.error}</div> : null}
      {!user.loading && user.users.length ? (
        <ul>
          {user.users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

//~ Round bracket in arrow function body means its inner content is directly being returned... it's just a convenience thing, can use curly + return keyword for the same
