import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const UserDataContext = createContext();

function UserContext({ children }) {
  const serverUrl = "http://localhost:8000";
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [frontendImage, setFrontendImage]=useState(null)
  const [backendImage, setBackendImage]=useState(null)
  const [selectedImage, setSelectedImage] =useState(null)


  const handleCurrentuser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });
      setUserData(result.data);
      console.log("User from /current:", result.data);
    } catch (error) {
      const msg = error.response?.data?.message || "Unknown error";
      if (msg !== "token not found") {
        console.error("Error fetching current user:", msg);
      }
      setUserData(null); // Pas connecté
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCurrentuser();
  }, []);

  const value = {
    serverUrl,
    userData,
    setUserData,
    loading,
    isLoggedIn: !!userData,
    handleCurrentuser,
    backendImage,
    setBackendImage,
    frontendImage,
    setFrontendImage,
    selectedImage,
    setSelectedImage

  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserContext;
