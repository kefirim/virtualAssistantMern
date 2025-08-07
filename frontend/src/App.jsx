import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UserDataContext } from './context/userContext';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Customize from './pages/Customize';
import Home from './pages/Home';
import Customize2 from './pages/Customize2';

function App() {
  const { userData, loading } = useContext(UserDataContext);

  if (loading) {
    return <div>Loading...</div>; // ou un spinner personnalisé
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          userData?.assistantImage && userData?.assistantName
            ? <Home />
            : <Navigate to="/customize" />
        }
      />
      <Route
        path="/signup"
        element={
          !userData
            ? <SignUp />
            : <Navigate to="/" />
        }
      />
      <Route
        path="/signin"
        element={
          !userData
            ? <SignIn />
            : <Navigate to="/" />
        }
      />
      <Route
        path="/customize"
        element={
          userData && (!userData.assistantName || !userData.assistantImage)
            ? <Customize />
            : !userData
              ? <Navigate to="/signin" />
              : <Navigate to="/" />
        }
      />

      <Route
        path="/customize2"
        element={
          userData && (!userData.assistantName || !userData.assistantImage)
            ? <Customize2 />
            : !userData
              ? <Navigate to="/signin" />
              : <Navigate to="/" />
        }
      />
    </Routes>
  );
}

export default App;
