import React from 'react'
import WelcomeBanner from './_componets/WelcomeBanner'
import CourseList from './_componets/CourseList'

function Dashboard() {
  return (
    <div>
        <WelcomeBanner/>

        <CourseList/>
    </div>
  )
}

export default Dashboard