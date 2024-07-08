export interface StudentProps  {
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