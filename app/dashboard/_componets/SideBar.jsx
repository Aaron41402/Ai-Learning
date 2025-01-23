"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, UserCircle } from 'lucide-react'
import { Shield } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'

function SideBar() {
    const MenuList=[
        {
            name:'Dashboard',
            icon:LayoutDashboard,
            path:'/dashboard'
        },
        {
            name:'Upgrade',
            icon:Shield,
            path:'/dashboard/upgrade'
        },
        {
            name:'Profile',
            icon:UserCircle,
            path:'/dashboard/profile'
        }
    ]
    const path=usePathname();
  return (
    <div className='bg-orange-100 h-screen shadow-md p-5'>
        <div className='flex gap-2 items-center'>
            <Image src={'/logo.svg'} alt='logo' width={40} height={40}/>
            <h2 className="font-bold text-lg">OnTrack</h2>
        </div>

        <div className='mt-10'>
            <Link href={'/create'} className='w-full'>
                <Button className='bg-orange-500 w-full'>
                    + Create New
                </Button>
            </Link>

            <div className='mt-5'>
                {MenuList.map((menu, index)=>(
                    <div key={index} className={`flex gap-5 items-center p-3
                     hover:bg-orange-50 rounded-lg cursor-pointer mt-3 ${path==menu.path&&'bg-oragne-50'}`}>
                        <menu.icon/>
                        <h2>{menu.name}</h2>
                    </div>
                ))}
            </div>
        </div>

        <div className='border p-3 bg-orange-50 rounded-lg absolute bottom-10 w-[85%]'>
            <h2 className='text-lg mb-2'>Avaiable Credits : </h2>
            <Progress value={30} />
            <h2 className='text-sm'>1 Out of 5 Credits Used</h2>

            <Link href={'dashboard/upgrade'} className='text-primary text-xs mt-3'>Upgrade to create more</Link>
        </div>
    </div>
  )
}

export default SideBar