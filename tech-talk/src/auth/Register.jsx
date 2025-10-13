import React, { useState } from 'react'
import tech from '../assets/images/tech.png'

function Register() {

  const [studID, setStudID] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col h-screen bg-[#410505dc]">
      {/* Header */}
      <div className="bg-white">
        <img src={tech} className="size-25 mx-5 my-2" />
        <hr className="border-t border-black" />
      </div>

      {/* Content */}
      <div className="flex flex-1 justify-center items-center">
        <div className="h-[600px] max-w-[600px] w-[600px] rounded-[15px] p-10 shadow-lg bg-[#e9e9e9] flex flex-col items-center px-20">
            <h1 className='text-[40px] font-kanit my-5'>User Registration</h1>
          {/* <img src={tech} className="size-30" /> */}
          <input type='text' placeholder='Enter Student-ID' className='p-5 rounded-2xl w-full bg-white font-kanit my-5'/>
          <input type='password' placeholder='Enter Password'  className='p-5 rounded-2xl w-full my-5 bg-white font-kanit'/>
          <p className='flex mr-auto font-kanit text-[12px] ml-5'>Already Have Account? <a className='font-kanit italic text-blue-600 cursor-pointer hover:underline ml-0.5'>   Login</a></p>
          <p className='font-kanit m-7'>By continuing, you agree to our <a className='underline cursor-pointer'>User Agreement</a> and acknowledge that you understand the <a className='underline cursor-pointer'>Privacy Policy</a>.</p>
          <button className='bg-[#410505dc] p-5 w-full rounded-2xl text-white font-kanit text-lg cursor-pointer'>Register</button>
        </div>
      </div>
    </div>
  )
}

export default Register
