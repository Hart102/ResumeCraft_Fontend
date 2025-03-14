import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { EyeIcon, PencilIcon, TrashIcon, UserGroupIcon } from "@heroicons/react/24/outline"
import axios from "axios"
import { dateFormater } from "../../components/util"

interface User {
    id: string;
    firstName: string;
    gender: string;
    dob: string;
    profilePhoto: string
}

const UserManagement = () => {
    const navigation = useNavigate()
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            const response = await axios.get("http://localhost:3000/users")

            if (!response.data.isError) {
                setUsers(response.data.data);
            }
        }
        fetchAllUsers()
    }, []);

    const viewUser = (userId: string) => navigation(`/user/${userId}`)

    const handleEdit = (userId: String) => navigation(`/${userId}`)

    const handleDelete = async (userId: string) => {
        const response = await axios.delete(`http://localhost:3000/users/delete/user/${userId}`)
        if (!response.data.isError) {
            setUsers(users.filter(user => user.id !== userId));
        }
    };

    return (
        <div className="p-4 lg:p-6">
            <div className="w-full lg:w-7/12 mx-auto lg:py-6 bg-white">
                <div className="overflow-x-auto px-4 lg:px-6">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="font-semibold text-gray-500 flex items-center gap-1 tracking-widest">
                            <UserGroupIcon className="w-6 h-6" />USER MANAGEMENT
                        </h1>
                        <Link to="/create" className="bg-blue-600 text-white rounded p-2 hover:bg-blue-400">Create user</Link>
                    </div>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-[#F6F7F8]">
                                <th className="p-2">Profile</th>
                                <th className="p-2">Name</th>
                                <th className="p-2">Gender</th>
                                <th className="p-2">Date of Birth</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.map((user, index) => (
                                <tr key={user.id} className="text-center capitalize">
                                    <td className={index == 0 ? "pt-6 p-2" : "p-2"}>
                                        <img
                                            src={`http://localhost:3000/users/file/${user.profilePhoto}`}
                                            className="w-11 h-11 rounded-full mx-auto"
                                            alt="Profile"
                                        />
                                    </td>
                                    <td className={index == 0 ? "pt-6 p-2" : "p-2"}>{user.firstName}</td>
                                    <td className={index == 0 ? "pt-6 p-2" : "p-2"}>{user.gender}</td>
                                    <td className={index == 0 ? "pt-6 p-2" : "p-2"}>{dateFormater(user.dob)}</td>
                                    <td className={index == 0 ? "pt-6 p-2" : "p-2"}>
                                        <button onClick={() => viewUser(user.id)} className="px-3 py-1">
                                            <EyeIcon className="w-4 h-4 cursor-pointer hover:text-gray-500" />
                                        </button>
                                        <button onClick={() => handleEdit(user.id)} className="px-3 py-1 cursor-pointer hover:text-gray-500">
                                            <PencilIcon className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(user.id)} className="px-3 py-1">
                                            <TrashIcon className="w-4 h-4 cursor-pointer hover:text-gray-500" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
