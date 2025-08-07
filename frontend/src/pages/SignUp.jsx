import React, { useContext, useState } from 'react';
import bg from "../assets/authBg.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/userContext';
import axios from 'axios';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[loading,setLoading]=useState(false)
  const [errorMsg, setErrorMsg] = useState(""); // pour afficher l'erreur
  const navigate = useNavigate();
  const { serverUrl,userData, setUserData } = useContext(UserDataContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // reset
   setLoading(true)
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, email, password },
        { withCredentials: true }
      );
      setUserData(response.data)
      console.log(response.data)
      setLoading(false)
      navigate("/customize")
    } catch (error) {
      const msg = error.response?.data?.message || "Signup failed";
      setErrorMsg(msg);
      setUserData(null)
       setLoading(false)
      console.error("Signup Error:", msg);
    }
  };

  return (
    <div
      className="w-full h-[100vh] bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        className="w-[90%] h-[600px] max-w-[500px] bg-[#00000062] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]"
        onSubmit={handleSignUp}
      >
        <h1 className="text-white text-[30px] font-semibold mb-[20px]">
          Register to <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        {errorMsg && (
          <div className="text-red-400 text-[16px] text-center">
            {errorMsg}
          </div>
        )}

        <input
          type="text"
          placeholder="Enter your Name"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <div className="w-full relative h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px]">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px] text-white"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {showPassword ? (
            <IoEyeOff
              className="absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <IoEye
              className="absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        <button
          className="min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-full text-[19px]"
          type="submit"
        >
          Sign Up
        </button>

        <p
          className="text-white text-[18px] cursor-pointer"
          onClick={() => navigate("/signin")}
        >
          Already have an account?{" "}
          <span className="text-blue-400" disabled={loading}>{loading? "Loading..." :"Sign In"}</span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
