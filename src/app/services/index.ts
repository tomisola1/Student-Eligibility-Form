import { StudentProps } from "../types"

export const createStudent = (data:StudentProps)=>{
    const response = fetch('http://127.0.0.1:3001/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then((response) => response);
     return response
}
   
export const getStudents = () => {
    const response = fetch('http://127.0.0.1:3001/students').then((response) => response.json());
     return response
}

export const deleteStudent = (id:string|null) => {
    const response = fetch(`http://127.0.0.1:3001/students/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => response);
     return response
}

export const getStudent = (id:string|null) => {
    const response = fetch(`http://127.0.0.1:3001/students/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => response.json());
     return response
}