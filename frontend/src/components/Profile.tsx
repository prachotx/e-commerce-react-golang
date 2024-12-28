import { FiUser } from "react-icons/fi";
import { useAuth } from "../provider/authProvider";

const Profile = () => {
    const { user } = useAuth()
    console.log(user);
    

    return (
        <div className="flex items-center border-2 border-gray-300 rounded p-2">
            <span>{user?.username}</span>
            <FiUser className="text-xl ml-2" />
        </div>
    )
}

export default Profile