"use client"

import { deleteStudent, getStudent } from '@/app/services'
import { StudentProps } from '@/app/types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [student, setStudent] = useState<StudentProps>()

  useEffect(() =>{
    const fetchAStudent = async() =>{
        try {
            const response = await getStudent(params.id)
            setStudent(response)
        } catch (error) {
            console.log(error);    
        }
    }
    fetchAStudent()
},[params])

const handleDelete = async() => {
  try {
    setLoading(true)
    const response = await deleteStudent(params.id)
    console.log(response);
    if(response.ok === true) {
      setLoading(false)
      router.replace('/students')
    }
  } catch (error) {
    console.log(error);
    
  }
}

  return (
    <main className="container mx-auto my-10 flex justify-center">
      <div className="md:border lg:w-4/6 w-full md:shadow-xl md:rounded-xl overflow-scroll">
        <div className="flex flex-col justify-center items-center sm:p-10 px-4 py-10">
          <div className='flex flex-col justify-center items-center'>
            <h2 className='text-[32px] font-semibbold'>{student?.firstName} {student?.lastName}</h2>
            <p className='text-zinc-700 text-lg'> Address: {student?.address} </p>
            <p className='text-zinc-700'> Date of birth: {student?.dob}</p>
            <p className='text-zinc-700'> Phone Number: {student?.phoneNumber}</p>
            <p className='text-zinc-700'> Student ID: {student?.studentId}</p>
          </div>
          <div className='mt-5'>
             <h3 className='text-xl font-semibold'>Education</h3> 
            <ul className='w-full '>
              <li className='flex justify-between items-center w-[500px] mt-3'>
                <span>High School</span>
                <span>{student?.highSchool}</span>
              </li>
              <li className='flex justify-between items-center w-[500px] mt-3'>
                <span>Last Date Attended</span>
                <span>{student?.lastDate}</span>
              </li>
              <li className='flex justify-between items-center w-[500px] mt-3'>
                <span>Present College</span>
                <span>{student?.presentCollege}</span>
              </li>
            </ul>
          </div>
          <div className='flex w-[200px] mt-10'>
            <button className='btn btn-outline btn-error w-full' onClick={handleDelete}>{loading && <span className="loading loading-dots loading-md"></span> }Delete Student</button>

          </div>
     
        </div>
      </div>
    </main>
  )
}

export default page