"use client"

import Image from "next/image";
import InputField from "./components/InputField";
import SelectInput from "./components/SelectInput";
import { ErrorInfo, useRef, useState } from "react";
import RadioInput from "./components/RadioInput";
import { Spreadsheet, Worksheet, jspreadsheet } from "@jspreadsheet/react";
import "jsuites/dist/jsuites.css";
import "jspreadsheet/dist/jspreadsheet.css";
import * as Yup from 'yup';
import { Errors, StudentProps } from "./types";


export default function Home() {
  const [currentForm, setCurrentForm] = useState(1)
  const [formData, setFormData] = useState({
    presentCollege: '',
    presentConference: '',
    sport: '',
    season: '',
    firstName: '',
    lastName: '',
    middleName: '',
    gender: '',
    studentId: '',
    todayDate: '',
    address: '',
    phoneNumber: '',
    dob: '',
    highSchool: '',
    lastDate: ''
  })

  const handleChange = (event:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = event.target
    setFormData((prev)=>({...prev, [name]: value}))
  }

  const changeForm = () => {
    setCurrentForm(prev => prev + 1)
 }

 const goBack = () => {
    setCurrentForm(prev => prev - 1)
 }
  return (
    <main className="container mx-auto my-10 flex justify-center min-h-screen">
      <div className="md:border lg:w-5/6 w-full md:shadow-xl md:rounded-xl overflow-scroll">
      <div className="sm:p-10 px-4 py-10 h-full">
          <div className="flex sm:flex-row flex-col xl:gap-[15%] sm:gap-[5%] gap-5 items-center">
            <Image src={"/assets/Logo.svg"} alt="logo" width={130} height={100} className="max-md:w-28 max-sm:w-32 "/>
            <h3 className="md:text-[30px] text-2xl font-bold text-center">STUDENT ELIGIBILITY REPORT</h3>
          </div>
          {
            currentForm === 1 ?
                <Form1 formData={formData} handleChange={handleChange} changeForm={changeForm} /> :
                <Form2 formData={formData} handleChange={handleChange} goBack={goBack} />
          }
      </div>
      </div>
    </main>
  );
}

type FormProps = {
  formData: StudentProps
  handleChange: (e:React.ChangeEvent<HTMLInputElement>) => void
  changeForm?: () => void
  goBack?: () => void
}

const validationSchema = Yup.object().shape({
  presentCollege: Yup.string().required('Present College is required'),
  presentConference: Yup.string().required('Present Conference is required'),
  sport: Yup.string().required('Sport is required'),
  season: Yup.string().required('Season is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  middleName: Yup.string(),
  gender: Yup.string().required('Gender is required'),
  studentId: Yup.string().required('StudentId is required'),
  todayDate: Yup.string().required('Today\'s date is required'),
  address: Yup.string().required('Address is required'),
  phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').required('Phone number is required'),
  dob: Yup.date().required('Date of birth is required')
  .test('dob', 'Must be greater than 18', function (value, ctx) {
    const dob = new Date(value);
    const validDate = new Date();
    const valid = validDate.getFullYear() - dob.getFullYear() >= 18;
    return !valid ? ctx.createError() : valid; 
  }),
  highSchool: Yup.string().required('High school last attended is required'),
  lastDate: Yup.date().required('Last date attended is required'),
});


const Form1 = (props:FormProps) => {
  const [error, setError] = useState<Errors>({})
  const { handleChange, formData, changeForm} = props
  const sports = [
    {option: "Basket ball", value: "basketBall"},
    {option: "Soccer", value: "soccer"},
    {option: "Volley ball", value: "volleyBall"},
  ]

console.log(formData);
  const changePage = async() => {
    try {
      const errors = await validationSchema.validate(formData, { abortEarly: false });
      console.log(errors);
      
      if (changeForm)changeForm()
      // return
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const validationErrors: Errors = {};
          err.inner.forEach((error) => {
            if (error.path) {
              validationErrors[error.path as keyof Errors] = error.message;
            }
          });
          setError(validationErrors);
          console.log(error);
          
        } else {
          console.error('Unexpected error:', err);
        }
       
    }
    
  };
  


  return (
    <div>
         
          <form action="" className="px-6 mt-10">
              <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                  <InputField label="Your Present College" name="presentCollege" placeholder="Enter present college" onChange={handleChange} error={error.presentCollege} required/>
                  <InputField label="Your Present Conference" name="presentConference" placeholder="Enter present conference" onChange={handleChange} error={error.presentConference} required/>
                  <SelectInput label="Sports this Season" name="sport" data={sports} defaultText="Select sports" onChange={handleChange} error={error.sport} required/>
                  <RadioInput name="season" label="Previous Seasons of Completion Used in This Sport" onChange={handleChange} radioOptions={[
                    {option: "0",value: "0"},
                    {option: "1",value: "1"}
                  ]} error={error.season} required/>
                  <InputField label="First Name" name="firstName" placeholder="Enter first name" onChange={handleChange} error={error.firstName} required/>
                  <InputField label="Last Name" name="lastName" placeholder="Enter last name" onChange={handleChange} error={error.lastName} required/>
                  <InputField label="Middle Name" name="middleName" placeholder="Enter middle name" onChange={handleChange} />
                  <RadioInput name="gender" label="Gender" onChange={handleChange} radioOptions={[
                    {option: "Male",value: "male"},
                    {option: "Female",value: "female"}
                  ]} error={error.gender} required/>
                  <InputField label="Student ID" name="studentId" placeholder="Enter student ID" onChange={handleChange} error={error.studentId} required/>
                  <InputField label="Today's Date" name="todayDate" type="date" onChange={handleChange} error={error.todayDate} required/>
                  <InputField label="Address" name="address" placeholder="Enter address" onChange={handleChange} error={error.address} required/>
                  <InputField label="Phone Number" name="phoneNumber" placeholder="Enter phone number" onChange={handleChange} error={error.phoneNumber} required/>
                  <InputField label="Date of Birth" name="dob" type="date" max={"2006/"} onChange={handleChange} error={error.dob} required/>
                  <InputField label="High School Last Attended" name="highSchool" placeholder="Enter high school" onChange={handleChange} error={error.highSchool} required/>
                  <InputField label="Last Date Attended" name="lastDate" type="date" onChange={handleChange} error={error.lastDate} required/>
              </div>
              <div className="flex justify-end mt-10">
                <button className="btn btn-outline btn-primary w-[200px] text-base font-semibold rounded-3xl !hover:text-white" onClick={changePage} type="button">Continue</button>
              </div>
          </form>

        </div>
  )
}

jspreadsheet.setLicense('NWNkYjAxZWEwYTc3MWYzNzgxYTk1ODAzNGU4NzE5OGUyZTU3OWZlNjkxZTBiM2VjYjAxYThhMTIwMmM0ODdjOWExYzA0ZDRkZjdkMTZjZDlmZTZjYmVhMzcwNTJjZmY4ODc0YzYwMjJhYmFhYWQ3NzY2MDFhMjU3Y2MzYTE0NzUsZXlKamJHbGxiblJKWkNJNklqRmxPVGcxTUdZeFl6bGxZakppTXpVMVlqVXlaakpqWkdReU1HSXhOekV6WlRBMVkyUTJaVE1pTENKdVlXMWxJam9pVkc5dGFYTnZiR0VpTENKa1lYUmxJam94TnpJeU9UZzFNakF3TENKa2IyMWhhVzRpT2xzaWQyVmlJaXdpYkc5allXeG9iM04wSWwwc0luQnNZVzRpT2pNeExDSnpZMjl3WlNJNld5SjJOeUlzSW5ZNElpd2lkamtpTENKMk1UQWlMQ0oyTVRFaUxDSm1iM0p0ZFd4aElpd2labTl5YlhNaUxDSnlaVzVrWlhJaUxDSndZWEp6WlhJaUxDSnBiWEJ2Y25SbGNpSXNJbk5sWVhKamFDSXNJbU52YlcxbGJuUnpJaXdpZG1Gc2FXUmhkR2x2Ym5NaUxDSmphR0Z5ZEhNaUxDSndjbWx1ZENJc0ltSmhjaUlzSW5Ob1pXVjBjeUlzSW5Ob1lYQmxjeUlzSW5ObGNuWmxjaUpkZlE9PQ==');

const Form2 = (props:FormProps) => {
  const spreadsheet1 = useRef<any>(null);
  const spreadsheet2 = useRef<any>(null);

  const columns1 = [
    {
      title: "From",
      type: 'calendar', options: { type: 'year-month-picker', format: 'MM/YYYY' },
      width:"200px"
    },
    {
      title: "To",
      type: 'calendar', options: { type: 'year-month-picker', format: 'MM/YYYY' },
      width:"200px"
    },
    {
      title: "College Attended or Jobs Held, City, State",
      width:"500px"
    }
  ]
  const columns2 = [
    {
      title: "Sports",
      width:"200px"
    },
    {
      title: "College",
      width:"300px"
    },
    {
      title: "Varsity/JV/Club",
      width:"200px"
    },
    {
      title: "Semester",
      width:"100px"
    },
    {
      title: "Yr",
      width:"100px"
    },
  ]
  return (
    <div>
      <form action="" className="px-6 mt-10">
      <div >
        <p className="mb-5 text-base">Accurately account for all your time between high school graduation and the present. Beginning with the year you left high school, list employment dates, periods of unemployment, armed forces service, and all educational institutions in which you have registered, including your present college. <b>Do not include summer school</b> . <b>Do not include summer jobs.</b> </p>

        <Spreadsheet ref={spreadsheet1}>
            <Worksheet minDimensions={[3, 4]} columns={columns1}/>
        </Spreadsheet>
      
        <div className="flex gap-5 mt-4">
          <span className="block bg-gray-200 p-2 rounded-lg w-fit" onClick={() => spreadsheet1.current[0]?.insertRow()}>
              Add row
          </span>
          <span className="block bg-gray-200 p-2 rounded-lg w-fit" onClick={() => spreadsheet1.current[0]?.deleteRow()}>
              Delete row
          </span>
        </div>
      </div>
      <div className="mt-10">
      <p className="mb-5 text-base">Including this college and this season, list all of the colleges and sports in which you have <i>practiced, scrimmaged or completed</i> including <i>Club sports, JV and varsity contests</i> since high school: (if you only practiced or scrimmaged in a sport please state.)</p>
        <Spreadsheet ref={spreadsheet2}>
            <Worksheet minDimensions={[3, 4]} columns={columns2}/>
        </Spreadsheet>
      
        <div className="flex gap-5 mt-4">
          <span className="block bg-gray-200 p-2 rounded-lg w-fit" onClick={() => spreadsheet2.current[0]?.insertRow()}>
              Add row
          </span>
          <span className="block bg-gray-200 p-2 rounded-lg w-fit" onClick={() => spreadsheet2.current[0]?.deleteRow()}>
              Delete row
          </span>

        </div>
      </div>
        <div className="flex justify-between mt-10">
          <button className="btn btn-outline btn-primary w-[200px] text-base font-semibold rounded-3xl" onClick={props.goBack}>Go back</button>
          <button className="btn btn-primary w-[200px] text-base font-semibold rounded-3xl">Submit</button>
        </div>
      </form>
    </div>
  )
}

