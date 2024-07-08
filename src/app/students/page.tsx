"use client";

import React, { useEffect, useState } from 'react'
import { StudentProps } from '../types'
import { getStudents } from '../services';
import { useRouter } from 'next/navigation';

const StudentList = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [students, setStudents] = useState<StudentProps[]>([])
    useEffect(() =>{
        try {
            setLoading(true)
            const fetchStudents = async() => {
                const response = await getStudents()
                setStudents(response)
            if(response){
                setLoading(false)
            }
            }
    
            fetchStudents()     
        } catch (error) {
            setLoading(false)
            console.log(error);     
        }
    },[])
  return (
    <div className=''>
        <div className='flex justify-center mt-20 mx-auto'>
            <h2 className='text-[32px] uppercase'>List of Students</h2>
        </div>
        <div className="overflow-x-auto p-24">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>
                    <label>
                        <input type="checkbox" className="checkbox" />
                    </label>
                    </th>
                    <th>Name</th>
                    <th>Student ID</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th></th>
                </tr>
                </thead>
                {loading &&
                    <span className="skeleton block h-12 w-full"></span>
                }
                <tbody>
                
                { 
                    
                    students.map((student, index)=> (    
                    <tr key={index}>
                        <th>
                        <label>
                            <input type="checkbox" className="checkbox" />
                        </label>
                        </th>
                        <td>
                            <div className="font-bold">{student.firstName} {student.lastName}</div>
                        </td>
                        <td>
                        {student.studentId}
                        </td>
                        <td>
                            {student.address}
                        </td>
                        <td>
                            {student.phoneNumber}
                        </td>
                        <th>
                        <button className="btn btn-ghost btn-xs" onClick={()=>router.push(`students/${student.id}`)}>details</button>
                        </th>
                    </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default StudentList