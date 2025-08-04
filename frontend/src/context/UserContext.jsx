import React, { createContext } from 'react';

// On garde la majuscule pour respecter les conventions React
export const UserDataContext = createContext();

function UserContext({ children }) {
  const serverUrl = "http://localhost:8000"; // ou ton URL Railway

  const value = {
    serverUrl
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserContext;
