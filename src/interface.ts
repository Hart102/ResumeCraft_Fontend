export interface PersonalInfo {
    dob: string;
    gender: string;
    lastName: string;
    firstName: string;
    occupation: string;
    profilePhoto?: File | null | undefined;
    

    fax?: string;
    email?: string;
    phoneNumber?: string;
    linkedInUrl?: string;

    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
}

export interface ContactInfo {
    fax?: string;
    email: string;
    phoneNumber: string;
    linkedInUrl?: string;
}

export interface AddressInfo {
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
}

export interface EducationInfo {
    grade: string;
    degree: string;
    endDate: string;
    startDate: string;
    activities: string;
    schoolName: string;
    description: string;
    fieldOfStudy: string;
}

export interface CreateUserRequest {
    // User Info
    dob: string;
    gender: string;
    lastName: string;
    firstName: string;
    occupation: string;
    profilePhoto?: File;

    // Contact Info
    fax?: string;
    email: string;
    phoneNumber: string;
    linkedInUrl?: string;

    // Address
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;

    // Academic Background
    grade: string;
    degree: string;
    endDate: string;
    startDate: string;
    activities: string;
    schoolName: string;
    description: string;
    fieldOfStudy: string;
}