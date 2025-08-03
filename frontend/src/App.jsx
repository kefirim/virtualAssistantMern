import React from 'react'
import SignUp from './pages/SignUp'
import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'

function App() {
  return (
<Routes>
 <Route path="/signup" element={<SignUp/>}/>
 <Route path="/signup" element={<SignIn/>}/>

                                              I
</Routes>

  )
}

export default App
