export interface StudentProps  {
    id?: string;
    presentCollege: string
    presentConference: string,
    sport: string,
    season: string,
    firstName: string,
    lastName: string,
    middleName: string,
    gender: string,
    studentId: string,
    todayDate: string,
    address: string,
    phoneNumber: string,
    dob: string,
    highSchool: string,
    lastDate: string
    education: EducationProps[],
    activities: ActivityProps[],
}

export interface EducationProps { 
    From: string,
    To:  string,
    collegeAttended:string
}


export interface ActivityProps { 
      sports: string,
      college: string,
      varsityOrClub: string,
      semester: string,
      year: string
    }

export interface Errors {
    presentCollege?: string;
    presentConference?: string;
    sport?: string;
    season?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    studentId?: string;
    todayDate?: string;
    address?: string;
    phoneNumber?: string;
    dob?: string;
    highSchool?: string;
    lastDate?: string;
  }