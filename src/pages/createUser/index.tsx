import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import PersonalInfoForm from '../../components/PersonalInformation';
import ResumeTemplate from '../../components/PreviewTemplate';
import Education from '../../components/Education';
import { CreateUserRequest } from "../../interface"
// Actions
import { updateField } from '../../redux/personalInfoSlice';
import { updateContactField } from "../../redux/contactInfoSlice"
import { updateAddressField } from "../../redux/addressSlice";
import { updateEducationField } from "../../redux/educationSlice"



const UserRegistrationForm = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const personalInfo = useSelector((state: RootState) => state.personalInfo);
  const contactInfo = useSelector((state: RootState) => state.contactInfo);
  const addressInfo = useSelector((state: RootState) => state.addressInfo);
  const educationInfo = useSelector((state: RootState) => state.educationInfo);

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("")


  useEffect(() => {
    if (params.userId !== "create") {
      const fillInputfields = async () => {
        const user = await fetch(`http://localhost:3000/users/user/${params.userId}`);
        const response = await user.json()

        if (!response.isError) {
          const result = response.data
          dispatch(updateField({ field: "dob", value: result.dob }));
          dispatch(updateField({ field: "gender", value: result.gender }));
          dispatch(updateField({ field: "lastName", value: result.lastName }));
          dispatch(updateField({ field: "firstName", value: result.firstName }));
          dispatch(updateField({ field: "occupation", value: result.occupation }));
          // Contact
          dispatch(updateContactField({ field: "fax", value: result.contact.fax }));
          dispatch(updateContactField({ field: "email", value: result.contact.email }));
          dispatch(updateContactField({ field: "phoneNumber", value: result.contact.phoneNumber }));
          dispatch(updateContactField({ field: "linkedInUrl", value: result.contact.linkedInUrl }));
          // User Address
          dispatch(updateAddressField({ field: "address", value: result.address.address }));
          dispatch(updateAddressField({ field: "city", value: result.address.city }));
          dispatch(updateAddressField({ field: "state", value: result.address.state }));
          dispatch(updateAddressField({ field: "country", value: result.address.country }));
          dispatch(updateAddressField({ field: "zipCode", value: result.address.zipCode }));
          // Academics
          dispatch(updateEducationField({ field: "schoolName", value: result.academicBackgrounds[0].schoolName }));
          dispatch(updateEducationField({ field: "degree", value: result.academicBackgrounds[0].degree }));
          dispatch(updateEducationField({ field: "fieldOfStudy", value: result.academicBackgrounds[0].fieldOfStudy }));
          dispatch(updateEducationField({ field: "grade", value: result.academicBackgrounds[0].grade }));
          dispatch(updateEducationField({ field: "startDate", value: result.academicBackgrounds[0].startDate }));
          dispatch(updateEducationField({ field: "endDate", value: result.academicBackgrounds[0].endDate }));
          dispatch(updateEducationField({ field: "activities", value: result.academicBackgrounds[0].activities }));
          dispatch(updateEducationField({ field: "description", value: result.academicBackgrounds[0].description }));
        }
      }
      fillInputfields()
    }
  }, [])

  const methods = useForm<CreateUserRequest>({
    mode: 'onChange'
  });

  const steps = [
    { title: 'Personal Info', component: PersonalInfoForm },
    // { title: 'Contact', component: ContactInformation },
    { title: 'Academic', component: Education },
    { title: 'Preview', component: ResumeTemplate },
  ];

  const onSubmit = async (data: CreateUserRequest) => {
    setLoading(true);
    setError(null);

    const currentUrl = params.userId == "create" ? "http://localhost:3000/users/create-user" : `http://localhost:3000/users/user/update/${params.userId}`

    try {
      const formData = new FormData();
      if (personalInfo.profilePhoto) {
        formData.append('file', personalInfo.profilePhoto);
      }

      // Appending rest of the form data here
      [personalInfo, contactInfo, addressInfo, educationInfo].forEach((section) => {
        Object.entries(section).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, value.toString());
          }
        });
      }); // Parse if not empty

      const response = await fetch(currentUrl, {
        method: 'POST',
        body: formData,
        headers: {
          "Accept": "application/json",
        },
      });

      const text = await response.text();
      const result = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(result?.message || "An error occurred while creating user");
      }

      if (!result.isError) {
        setSuccess(true);
        methods.reset();
        setCurrentStep(0);
        navigate("/")
      } else {
        setError(result.message);
      }
      setMessage(result.message)


    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = async () => {
    const isStepValid = await methods.trigger();
    if (isStepValid) {
      if (currentStep === steps.length - 1) {
        methods.handleSubmit(onSubmit)();
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const CurrentStepComponent = steps[currentStep].component;




  return (
    <FormProvider {...methods}>
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-10">
          <Link to="/" className='flex items-center gap-1 text-sm'>
            <ArrowLeftIcon className="w-5 h-5" />
            Back
          </Link>
        </div>
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`flex-1 text-center ${index === currentStep
                  ? 'text-blue-600 font-semibold'
                  : index < currentStep
                    ? 'text-green-600'
                    : 'text-gray-400'
                  }`}
              >
                <div className="relative">
                  {index > 0 && (
                    <div
                      className={`h-1 absolute w-full left-0 top-4 -z-10 ${index <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                    />
                  )}
                  <div
                    className={`h-8 w-8 rounded-full mx-auto ${index === currentStep
                      ? 'bg-blue-600'
                      : index < currentStep
                        ? 'bg-green-600'
                        : 'bg-gray-200'
                      } text-white flex items-center justify-center`}
                  >
                    {index < currentStep ? '✓' : index + 1}
                  </div>
                </div>
                <div className="mt-2">{step.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Form content */}
        <div className="bg-white p-6">
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <CurrentStepComponent />

            {/* Error and success messages */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4">
                {message}
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {params.userId == "create" ?
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentStep === steps.length - 1 ? (loading ? 'Creating...' : 'Submit') : 'Next'}
                </button> :
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentStep === steps.length - 1 ? (loading ? 'Updating...' : 'Update') : 'Next'}
                </button>}
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default UserRegistrationForm;