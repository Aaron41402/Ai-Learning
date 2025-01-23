"use client"
import Image from 'next/image'
import React from 'react'
import { useUser } from '@clerk/nextjs';

function WelcomeBanner() {
    const {user}=useUser();
  return (
    <div className='p-5 bg-blue-950 w-full text-white rounded-lg flex items-center gap-6'>
        <Image src={'/laptop.png'} alt='laptop' width={100} height={100}/>
        <div>
            <h2 className='font-bold text-3xl'>
                Hello,{user?.fullName}
            </h2>
            <p className='text-sm'>Welcome Back, It's time to get back on Track</p>
        </div>
    </div>
  )
}

export default WelcomeBanner