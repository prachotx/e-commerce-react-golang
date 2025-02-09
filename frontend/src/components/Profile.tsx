import { RiArrowDropDownLine } from "react-icons/ri";
import { useAuth } from "../providers/authProvider";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

const Profile = () => {
    const { user, logout } = useAuth()
    const divRef = useRef<HTMLDivElement>(null)
    const iconRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    const toggleDropdown = () => {
        if (divRef.current) {
            divRef.current.classList.toggle("hidden");
            iconRef.current?.classList.toggle("rotate-180")
        }
    };

    return (
        <div className="relative">
            <div onClick={toggleDropdown} className="bg-[#ff9671] flex items-center py-3 px-4 rounded-[20px] font-medium cursor-pointer">
                <span>{user?.username}</span>
                <div ref={iconRef}>
                    <RiArrowDropDownLine className="text-3xl" />
                </div>
            </div>
            <div ref={divRef} className="absolute bottom-[-105px] left-0 hidden bg-[#ff9671] w-full text-center rounded-[20px] cursor-pointer z-10">
                <ul>
                    <li className="p-1">
                        <Link to="/account">
                            Account
                        </Link>
                    </li>
                    <li className="p-1">
                        <Link to="/orders">
                            Order
                        </Link>
                    </li>
                    <li onClick={() => {
                        logout()
                        navigate("/")
                    }}
                    className="p-1"
                    >logout</li>
                </ul>
            </div>
        </div>
    )
}

export default Profile