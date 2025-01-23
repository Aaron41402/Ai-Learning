"use client"
import React, {useState} from 'react'
import SelectOption from './_components/SelectOption'
import {Button} from '@/components/ui/button'
import TopicInput from './_components/TopicInput';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function Create() {
    const [step, setStep]= useState(0);
    const [formData, setFormData]=useState([]);
    const {user}=useUser();
    const[loading,setLoading]=useState(false);

    const router=useRouter();
    const handleUserInput=(fieldName, fieldValue)=>{
        setFormData(prev=>({
            ...prev,
            [fieldName]:fieldValue
        }))

        console.log(formData);
    }

    const checkStatus=()=>{
        if(formData?.length==0){
            return true;
        }
        return false;
    }

    const GenerateCourseLayout=async()=>{
        const courseId=uuidv4();
        setLoading(true);
        const result= await axios.post('/api/generate-course-outline',{
            courseId: courseId,
            ...formData,
            createdBy:user?.primaryEmailAddress?.emailAddress
        });
        setLoading(false);
        router.replace('/dashboard')
        toast("Your course is generating")
        console.log(result.data.result.resp);
    }
  return (
    <div className='flex flex-col items-center p-5 md:px-24 lg:px-36 mt-20'>
        <h2 className='font-bold text-4xl text-orange-500'>Start building your own study material</h2>
        <p className='text-gray-500 text-lg'>Fill all details to generate your personal study material</p>

        <div className='mt-10'>
            {step==0? <SelectOption selectedStudyType={(value)=>handleUserInput('studyType', value)} 
            />
            : <TopicInput setTopic={(value)=>handleUserInput('topic', value)}
            setDifficultyLevel={(value)=>handleUserInput('difficultyLevel', value)}
            setDuration={(value)=>handleUserInput('duration', value)}
            setVideo={(value)=>handleUserInput('video', value)}
            setChapter={(value)=>handleUserInput('chapter', value)}
            />}
        </div>

        <div className='flex justify-between w-full mt-32'>
            {step!=0? <Button className='bg-blue-950'  onClick={()=>setStep(step-1)}>Previous</Button>:'.'}
            {step==0? <Button className='bg-blue-950' disabled={checkStatus()} onClick={()=>setStep(step+1)}>Next</Button>:
            <Button className='bg-blue-950' onClick={GenerateCourseLayout} disabled={loading}>
                {loading?<Loader className='animate-spin' />:'Generate'}</Button>}
        </div>
    </div>
  )
}

export default Create