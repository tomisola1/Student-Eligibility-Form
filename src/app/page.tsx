"use client"

import Image from "next/image";
import InputField from "./components/InputField";
import SelectInput from "./components/SelectInput";
import { useRef, useState } from "react";
import RadioInput from "./components/RadioInput";
import { Spreadsheet, Worksheet, jspreadsheet } from "@jspreadsheet/react";
import "jsuites/dist/jsuites.css";
import "jspreadsheet/dist/jspreadsheet.css";


export default function Home() {
  const [currentForm, setCurrentForm] = useState(1)
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
                <Form1  changeForm={changeForm} /> :
                <Form2  goBack={goBack} />
          }
      </div>
      </div>
    </main>
  );
}

type FormProps = {
  changeForm?: () => void
  goBack?: () => void
}


const Form1 = (props:FormProps) => {
  const sports = [
    {option: "Basket ball", value: "basketBall"},
    {option: "Soccer", value: "soccer"},
    {option: "Volley ball", value: "volleyBall"},
  ]
  return (
    <div>
         
          <form action="" className="px-6 mt-10">
              <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                  <InputField label="Your Present College" name="presentColleger" placeholder="Enter present college" required/>
                  <InputField label="Your Present Conference" name="presentConference" placeholder="Enter present conference"  required/>
                  <SelectInput label="Sports this Season" name="sport" data={sports} placeholder="Select sports" required/>
                  <RadioInput name="season" label="Previous Seasons of Completion Used in This Sport" radioOptions={[
                    {option: "0",value: "0"},
                    {option: "1",value: "1"}
                  ]} required/>
                  <InputField label="First Name" name="firstName" placeholder="Enter first name"  required/>
                  <InputField label="Last Name" name="lastName" placeholder="Enter last name"  required/>
                  <InputField label="Middle Name" name="middleName" placeholder="Enter middle name"/>
                  <RadioInput name="gender" label="Gender" radioOptions={[
                    {option: "Male",value: "male"},
                    {option: "Female",value: "female"}
                  ]} required/>
                  <InputField label="Student ID" name="studentId" placeholder="Enter student ID" required/>
                  <InputField label="Today's Date" name="todayDate" type="date" required/>
                  <InputField label="Address" name="address" placeholder="Enter address" required/>
                  <InputField label="Phone Number" name="phoneNumber" placeholder="Enter phone number" required/>
                  <InputField label="Date of Birth" name="dob" type="date" required/>
                  <InputField label="High School Last Attended" name="highSchool" placeholder="Enter high school" required/>
                  <InputField label="Last Date Attended" name="lastDate" type="date" required/>
              </div>
              <div className="flex justify-end mt-10">
                <button className="btn btn-outline btn-primary w-[200px] text-base font-semibold rounded-3xl !hover:text-white" onClick={props.changeForm}>Continue</button>
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

