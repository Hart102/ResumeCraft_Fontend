import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateField, updateFile } from "../../redux/personalInfoSlice";
import { updateContactField } from "../../redux/contactInfoSlice";
import { updateAddressField } from "../../redux/addressSlice";
import { ContactInfo } from "../../interface";
import { AddressInfo } from "../../interface";

const UserForm = () => {
  const dispatch = useDispatch();
  const personalInfo = useSelector((state: RootState) => state.personalInfo);
  const contactInfo = useSelector<RootState, ContactInfo>((state) => state.contactInfo);
  const addressInfo = useSelector<RootState, AddressInfo>((state) => state.addressInfo);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (["firstName", "lastName", "dob", "gender", "occupation"].includes(name)) {
      dispatch(updateField({ field: name as "firstName" | "lastName" | "dob" | "gender" | "occupation", value }));
    } else if (["email", "phoneNumber", "fax", "linkedInUrl"].includes(name)) {
      dispatch(updateContactField({ field: name as keyof ContactInfo, value }));
    } else if (["address", "city", "state", "country", "zipCode"].includes(name)) {
      dispatch(updateAddressField({ field: name as keyof AddressInfo, value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      dispatch(updateFile(e.target.files[0]));
    }
  };

  return (
    <div className="bg-white p-6">
      <h2 className="text-xl font-semibold mb-4">User Information</h2>

      {/* Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="firstName" placeholder="First Name" value={personalInfo.firstName} onChange={handleInputChange} className="border rounded p-2" required />
        <input type="text" name="lastName" placeholder="Last Name" value={personalInfo.lastName} onChange={handleInputChange} className="border rounded p-2" required />
        <input type="date" name="dob" value={personalInfo.dob ? personalInfo.dob.split('T')[0] : ""} onChange={handleInputChange} className="border rounded p-2" required />
        <select name="gender" value={personalInfo.gender} onChange={handleInputChange} className="border rounded p-2" required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input type="text" name="occupation" placeholder="Occupation" value={personalInfo.occupation} onChange={handleInputChange} className="border rounded p-2" required />
        <input type="file" onChange={handleFileChange} accept="image/*" className="border rounded p-2" required />
      </div>

      {/* Contact Info */}
      <h2 className="text-xl font-semibold mt-6 mb-4">Contact Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="email" name="email" placeholder="Email" value={contactInfo.email} onChange={handleInputChange} className="border rounded p-2" required />
        <input type="tel" name="phoneNumber" placeholder="Phone Number" value={contactInfo.phoneNumber} onChange={handleInputChange} className="border rounded p-2" required />
        <input type="text" name="fax" placeholder="Fax (optional)" value={contactInfo.fax} onChange={handleInputChange} className="border rounded p-2" />
        <input type="url" name="linkedInUrl" placeholder="LinkedIn URL (optional)" value={contactInfo.linkedInUrl} onChange={handleInputChange} className="border rounded p-2" />
      </div>

      {/* Address Info */}
      <h2 className="text-xl font-semibold mt-6 mb-4">Address</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="address" placeholder="Street Address" value={addressInfo.address} onChange={handleInputChange} className="border rounded p-2" required />
        <input type="text" name="city" placeholder="City" value={addressInfo.city} onChange={handleInputChange} className="border rounded p-2" required />
        <input type="text" name="state" placeholder="State" value={addressInfo.state} onChange={handleInputChange} className="border rounded p-2" required />
        <input type="text" name="country" placeholder="Country" value={addressInfo.country} onChange={handleInputChange} className="border rounded p-2" required />
        <input type="text" name="zipCode" placeholder="ZIP Code" value={addressInfo.zipCode} onChange={handleInputChange} className="border rounded p-2" required />
      </div>
    </div>
  );
};

export default UserForm;
