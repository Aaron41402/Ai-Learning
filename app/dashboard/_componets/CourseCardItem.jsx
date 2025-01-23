import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { RefreshCw } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

function CourseCardItem({course}) {
  return (
    <div className='border rounded-lg shadow-md p-5'>
        <div>
            <div className='flex justify-between items-center'>
                <Image src={'/other.png'} alt='other' width={50} height={50} />
                <h2 className='text-[10px] p-1 px-2 rounded-full bg-orange-500 text-white'> 20 Dec 2024</h2>
            </div>
            <h2 className='mt-3 font-medium text-lg'>{course?.courseLayout?.courseTitle}</h2>
            <p className='text-xs line-clamp-2 text-gray-500 mt-2'>{course?.courseLayout?.courseSummary}</p>

            <div className='mt-3'>
                <Progress value={10}/>
            </div>

            <div className='mt-3 flex justify-end'>
                {course?.status=='Generating'?
                <h2 className='text-sm p-1 px-2 flex gap-2 items-center rounded-full bg-gray-400 text-white'>
                    <RefreshCw className='h-5 w-5'/>
                    Generating...</h2>
                :
                <Link href={'/course/'+course?.courseId}>
                    <Button className='bg-blue-950'>View</Button>
                </Link>}
            </div>
        </div>
    </div>
  )
}

export default CourseCardItem