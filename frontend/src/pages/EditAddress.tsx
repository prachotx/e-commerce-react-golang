import { useEffect, useState } from "react";
import Wrapper from "../components/layout/Wrapper"
import Navbar from "../components/Navbar"
import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import { useParams } from "react-router";
import { getErrorMessage } from "../utils/errorHandler";

const EditAddress = () => {
    const [address, setAddress] = useState<string>("")
    const [province, setProvince] = useState<string>("")
    const [district, setDistrict] = useState<string>("")
    const [subDistrict, setSubDistrict] = useState<string>("")
    const [postCode, setPostCode] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const id = useParams().id

    const fetchAddress = async () => {
        try {
            setLoading(true)
            setError(null)
            const res = await axios.get(`http://localhost:8080/users/address/${id}`, { withCredentials: true })
            setAddress(res.data.address)
            setProvince(res.data.province)
            setDistrict(res.data.district)
            setSubDistrict(res.data.sub_district)
            setPostCode(res.data.postcode)
        } catch (err) {
            setError(getErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAddress()
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
                            <span><IoIosArrowForward /></span>
                            <span>address</span>
                        </div>
                        <div className="bg-white p-4 rounded">
                            <form>
                                <h2 className="text-xl">Add Address</h2>
                                <div className="flex flex-col mt-4">
                                    <label>Address</label>
                                    <input value={address} type="text" onChange={event => setAddress(event.target.value)} className="border-2 border-gray-300 p-2 rounded" />
                                </div>
                                <div className="flex flex-col">
                                    <label>Province</label>
                                    <input value={province} type="text" onChange={event => setProvince(event.target.value)} className="border-2 border-gray-300 p-2 rounded" />
                                </div>
                                <div className="flex flex-col">
                                    <label>District</label>
                                    <input value={district} type="text" onChange={event => setDistrict(event.target.value)} className="border-2 border-gray-300 p-2 rounded" />
                                </div>
                                <div className="flex flex-col">
                                    <label>Subdistrict</label>
                                    <input value={subDistrict} type="text" onChange={event => setSubDistrict(event.target.value)} className="border-2 border-gray-300 p-2 rounded" />
                                </div>
                                <div className="flex flex-col">
                                    <label>Postal Code:</label>
                                    <input value={postCode} type="text" onChange={event => setPostCode(event.target.value)} className="border-2 border-gray-300 p-2 rounded" />
                                </div>
                                <button type="submit" disabled={loading} className="mt-4 bg-green-300 w-20 h-10 rounded-lg disabled:bg-gray-600">Submit</button>
                                {error && <span>{error}</span>}
                            </form>
                        </div>
                    </div>
                </Wrapper>
            </div>
        </main>
    )
}

export default EditAddress
