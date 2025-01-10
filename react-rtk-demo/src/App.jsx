import { useState } from 'react'
import './App.css'
import { CakeView } from './features/cake/CakeView.jsx';
import { IceCreamView } from './features/icecream/IceCreamView.jsx';
import { UserView } from './features/user/UserView.jsx';



function App() {
  return (
    <div className='App'>
      <CakeView /> 
      <IceCreamView />
      <UserView />
    </div>
  )
}

export default App
