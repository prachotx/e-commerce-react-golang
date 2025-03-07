import { useEffect, useState } from "react"
import Wrapper from "../components/layout/Wrapper"
import Navbar from "../components/Navbar"
import axios from "axios"
import { getErrorMessage } from "../utils/getErrorMessage"
import { IoIosArrowForward } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router"
import AddressList from "../components/AddressList"
import { User } from "../types/interfaces"

const Account = () => {
    const [user, setUser] = useState<User>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fetchUser = async () => {
        try {
            setLoading(true)
            setError(null)
            const res = await axios.get("http://localhost:8080/users/address", {
                withCredentials: true
            })
            setUser(res.data[0])
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
                        <div className="flex items-center text-lg mb-4">
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
                                <>
                                    <div className="mb-4">
                                        <div>{user?.username}</div>
                                        <div>{user?.email}</div>
                                        <div>{user?.role}</div>
                                    </div>
                                    <div>
                                        {user?.addresses.map((item) => (
                                           <AddressList 
                                           key={item.id} 
                                           id={item.id} 
                                           address={item.address} 
                                           province={item.province}
                                           district={item.district}
                                           subDistrict={item.sub_district}
                                           postCode={item.postcode}  
                                           fetchUser={fetchUser} />
                                        ))}
                                    </div>
                                </>
                            )}
                            <div>
                                <Link to="/account/address">
                                    <div className="border-2 border-gray-300 rounded h-[100px] flex items-center justify-center">
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
