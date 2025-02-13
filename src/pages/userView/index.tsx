import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { dateFormater } from "../../components/util"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"

const UserView = () => {
  const param = useParams()
  const navigation = useNavigate()

  interface User {
    firstName: string;
    lastName: string;
    occupation: string;
    gender: string;
    dob: string;
    contact: {
      email: string;
      phoneNumber: string;
      fax?: string;
      linkedInUrl?: string;
    };
    address: {
      address: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
    };
    profilePhoto?: string;
    academicBackgrounds?: {
      degree: string;
      fieldOfStudy: string;
      schoolName: string;
      startDate: string;
      endDate: string;
      grade?: string;
      activities?: string;
      description?: string;
    }[];
  }

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {

    const fetchUser = async () => {
      if (!param.userId) return navigation("/")
      const response = await fetch(`http://localhost:3000/users/user/${param.userId}`)

      const result = await response.json()
      if (!result.isError) {
        setUser(result.data)
      }
    }
    fetchUser()
  }, [])




  return (
    <>

      <div className="bg-white w-full lg:w-6/12 mx-auto lg:p-10 my-6">
        <div className="mb-10">
          <Link to="/">
            <ArrowLeftIcon className="w-6 h-6" />
          </Link>
        </div>
        <div className="flex justify-between items-center gap-6 border-b border-b-gray-300 pb-4 capitalize">
          {user && (
            <>
              <img
                src={`http://localhost:3000/users/file/${user.profilePhoto}`}
                className="w-40 h-40 rounded-full"
                alt="Profile"
              />
              <div>
                <h2 className="text-3xl font-semibold mb-2">{user.firstName} {user.lastName}</h2>
                <p className="text-gray-500">{user.occupation}</p>
                <p className="text-gray-500">{user.gender} | {dateFormater(user.dob)}</p>
              </div>
            </>
          )}
        </div>

        <div className="mt-4 border-b border-b-gray-300 pb-4">
          <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
          {user && (
            <div className="space-y-1 [&_span]:text-gray-500">
              <p>Email: <span>{user.contact.email}</span></p>
              <p>Phone: <span>{user.contact.phoneNumber}</span></p>
              {user.contact.fax && <p>Fax: <span>{user.contact.fax}</span></p>}
              {user.contact.linkedInUrl && (
                <p>
                  LinkedIn: <a href={user.contact.linkedInUrl} className="text-blue-600 underline"><span>{user.contact.linkedInUrl}</span></a>
                </p>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 border-b border-b-gray-300 pb-4">
          <h3 className="text-xl font-semibold mb-2">Address</h3>
          {user && user.address.address && (
            <p>{user.address.address}, {user.address.city}, {user.address.state}, {user.address.country} - {user.address.zipCode}</p>
          )}
        </div>

        <div className="mt-4 pb-4">
          <h3 className="text-xl font-semibold mb-2">Education</h3>
          {user?.academicBackgrounds && user.academicBackgrounds.length > 0 ? (
            <ul>
              {user.academicBackgrounds.map((edu, index) => (
                <li key={index} className="mb-2 space-y-1 [&_span]:text-gray-500">
                  <p className="font-medium">{edu.degree} in {edu.fieldOfStudy} at {edu.schoolName}</p>
                  <p>Start & End Date: <span>{new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}</span></p>
                  <p>Grade: Grade: <span>{edu.grade}</span></p>
                  <p>Activities: <span>{edu.activities}</span></p>
                  <p>Description: <span>{edu.description}</span></p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No education details available.</p>
          )}
        </div>
      </div >
    </>
  )
}

export default UserView