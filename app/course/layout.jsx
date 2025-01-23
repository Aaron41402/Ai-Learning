import React from 'react'
import DashboardHeader from '../dashboard/_componets/DashboardHeader'

function CourseViewLayout({children}) {
  return (
    <div className='bg-orange-50'>
            <DashboardHeader/>
        <div className='mx-10 md:mx-36 lg:px-60 mt-10'>
            {children}
        </div>
    </div>
  )
}

export default CourseViewLayout