import { useEffect, useState } from "react"
import Wrapper from "../components/layout/Wrapper"
import Navbar from "../components/Navbar"
import axios from "axios"
import { getErrorMessage } from "../utils/errorHandler"
import { IoIosArrowForward } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router"

interface User {
    id: number
    username: string
    email: string
    password: string
    role: string
    created_at: string;
    updated_at: string;
}

const Account = () => {
    const [user, setUser] = useState<User | null>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fetchUser = async () => {
        try {
            setLoading(true)
            setError(null)
            const res = await axios.get("http://localhost:8080/users/profile", {
                withCredentials: true
            })
            setUser(res.data)
        } catch (err) {
            setError(getErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <main className="bg-gray-200">
            <Navbar />
            <div>
                <Wrapper>
                    <div className="py-4">
                        <div className="flex items-center text-lg py-2">
                            <span>home</span>
                            <span><IoIosArrowForward /></span>
                            <span>account</span>
                        </div>
                        <div className="bg-white p-4 rounded">
                            {loading ? (
                                <div>loading...</div>
                            ) : error ? (
                                <div>{error}</div>
                            ) : (
                                <div>
                                    <div>{user?.username}</div>
                                    <div>{user?.email}</div>
                                    <div>{user?.role}</div>
                                </div>
                            )}
                            <div>
                                <Link to="/account/address">
                                    <div className="bg-green-300 h-[100px] flex items-center justify-center">
                                        <IoMdAdd />
                                    </div>
                                </Link>
                            </div>
                        </div>

                    </div>
                </Wrapper>
            </div>
        </main>
    )
}

export default Account
