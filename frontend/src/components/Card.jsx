import React , { useContext }from 'react'
import { UserDataContext } from '../context/userContext'

function Card({image}) {
    const {
        serverUrl,
        userData,
        setUserData,
        backendImage,
        setBackendImage,
        frontendImage,
        setFrontendImage,
        selectedImage,
        setSelectedImage
    
      }=useContext(UserDataContext)
  return (
    <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[#0000ff15] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white ${selectedImage==image ? 'border-4 border-white shadow-2xl shadow-blue-950': null}`}>
  <img src={image} className= 'h-full object-cover' onClick={()=>setSelectedImage(image)} />
</div>

  )
}

export default Card
