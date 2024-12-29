import { FiUser } from "react-icons/fi";
import { useAuth } from "../provider/authProvider";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

const Profile = () => {
    const { user, logout } = useAuth()
    const divRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    
    const toggleDropdown = () => {
        if (divRef.current) {
            divRef.current.classList.toggle("hidden");
        }
    };
    
    return (
        <div className="relative">
            <div onClick={toggleDropdown} className="flex items-center border-2 border-gray-300 rounded p-2 cursor-pointer">
                <span>{user?.username}</span>
                <FiUser className="text-xl ml-2" />
            </div>
            <div ref={divRef} className="absolute bottom-[-48px] left-0 hidden bg-red-300 w-full text-center rounded-b cursor-pointer">
                <ul>
                    <li>
                        <Link to="/users">
                        Add Address
                        </Link>
                    </li>
                    <li onClick={() => {
                        logout()
                        navigate("/")
                    }}>logout</li>
                </ul>
            </div>
        </div>
    )
}

export default Profile