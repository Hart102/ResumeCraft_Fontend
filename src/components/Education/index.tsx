import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateEducationField } from "../../redux/educationSlice";
import { EducationInfo } from "../../interface";


const Education = () => {
    const dispatch = useDispatch();
    const educationInfo = useSelector((state: RootState) => state.educationInfo);
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const validFields: (keyof EducationInfo)[] = [
            "schoolName", "degree", "fieldOfStudy", "grade",
            "startDate", "endDate", "activities", "description"
        ];

        if (validFields.includes(name as keyof EducationInfo)) {
            dispatch(updateEducationField({ field: name as keyof EducationInfo, value }));
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Academic Background</h2>
            {/* {education && education.map((edu, index) => ( */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="schoolName"
                        placeholder="School Name"
                        value={educationInfo.schoolName} 
                        onChange={handleInputChange}
                        className="border rounded p-2"
                        required
                    />
                    <input
                        type="text"
                        name="degree"
                        placeholder="Degree"
                        value={educationInfo.degree}
                        onChange={handleInputChange}
                        className="border rounded p-2"
                        required
                    />
                    <input
                        type="text"
                        name="fieldOfStudy"
                        placeholder="Field of Study"
                        value={educationInfo.fieldOfStudy}
                        onChange={handleInputChange}
                        className="border rounded p-2"
                        required
                    />
                    <input
                        type="text"
                        name="grade"
                        placeholder="Grade"
                        value={educationInfo.grade}
                        onChange={handleInputChange}
                        className="border rounded p-2"
                        required
                    />
                    <input
                        type="date"
                        name="startDate"
                        value={educationInfo?.startDate ? educationInfo?.startDate.split('T')[0] : ""}
                        onChange={handleInputChange}
                        className="border rounded p-2"
                        required
                    />
                    <input
                        type="date"
                        name="endDate"
                        value={educationInfo?.endDate ? educationInfo?.endDate.split('T')[0] : ""}
                        onChange={handleInputChange}
                        className="border rounded p-2"
                        required
                    />
                    <textarea
                        name="activities"
                        placeholder="Activities and Societies"
                        value={educationInfo?.activities}
                        onChange={handleInputChange}
                        className="border rounded p-2 col-span-2"
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={educationInfo?.description}
                        onChange={handleInputChange}
                        className="border rounded p-2 col-span-2"
                        required
                    />
                </div>
            {/* ))} */}
        </div>
    );
};

export default Education;
