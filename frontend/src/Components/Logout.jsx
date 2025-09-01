import React, { useState } from 'react'
import { BiLogOut } from "react-icons/bi";
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from './../../node_modules/react-hot-toast/src/index';

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const handleLogout  = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/user/logout")
      localStorage.removeItem("messenger");
      Cookies.remove("jwt")
      setLoading(false);
      toast.success("Logout Successfully")
    } catch (error) {
        console.log(error);
        toast.error("Failed to Logout")
    }
  }
  return (
    <>
    <div className='w-[4%] bg-slate-950 text-white flex flex-col justify-end'>
        <div className='p-2'>
                <form action="" >
                    <div className='flex space-x-3'>
                        <button onClick={handleLogout}>
                            <BiLogOut className='text-5xl p-2 hover:bg-gray-600 rounded-lg ' /> 
                        </button>
                    </div> 
                </form>
            </div>
    </div>
    </>
  )
}

export default Logout