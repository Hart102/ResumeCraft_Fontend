import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { dateFormater } from "../util";



const ResumeTemplate = () => {
  const personalInfo = useSelector((state: RootState) => state.personalInfo);
  const contactInfo = useSelector((state: RootState) => state.contactInfo);
  const addressInfo = useSelector((state: RootState) => state.addressInfo);
  const educationInfo = useSelector((state: RootState) => state.educationInfo);

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* User Info */}
      <div className="flex items-center gap-6 border-b pb-4">
        <div>
          <h2 className="text-2xl font-semibold">{personalInfo.firstName} {personalInfo.lastName}</h2>
          <p className="text-gray-600">{personalInfo.occupation}</p>
          <p className="text-gray-500">{personalInfo.gender} | DOB: {dateFormater(personalInfo.dob)}</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-4 border-b pb-4">
        <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
        <p>Email: {contactInfo.email}</p>
        <p>Phone: {contactInfo.phoneNumber}</p>
        {contactInfo.fax && <p>Fax: {contactInfo.fax}</p>}
        {contactInfo.linkedInUrl && (
          <p>
            LinkedIn: <a href={contactInfo.linkedInUrl} className="text-blue-600 underline">{contactInfo.linkedInUrl}</a>
          </p>
        )}
      </div>

      {/* Address */}
      <div className="mt-4 border-b pb-4">
        <h3 className="text-xl font-semibold mb-2">Address</h3>
        {addressInfo.address && (
          <p>{addressInfo.address}, {addressInfo.city}, {addressInfo.state}, {addressInfo.country} - {addressInfo.zipCode}</p>
        )}
      </div>

      {/* Academic Background */}
      <div className="mt-4 pb-4">
        <h3 className="text-xl font-semibold mb-2">Education</h3>
        <ul>
          <li className="mb-2 space-y-1 [&_span]:text-gray-500">
            <p className="font-medium">{educationInfo?.degree} in {educationInfo?.fieldOfStudy} at {educationInfo?.schoolName}</p>
            <p>Start & End Date: <span>{new Date(educationInfo?.startDate).getFullYear()} - {new Date(educationInfo?.endDate).getFullYear()}</span></p>
            <p>Grade: Grade: <span>{educationInfo?.grade}</span></p>
            <p>Activities: <span>{educationInfo?.activities}</span></p>
            <p>Description: <span>{educationInfo?.description}</span></p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ResumeTemplate;
