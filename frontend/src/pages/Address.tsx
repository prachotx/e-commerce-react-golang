import { FormEvent, useState } from "react";
import Wrapper from "../components/layout/Wrapper"
import Navbar from "../components/Navbar"
import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router";
import { getErrorMessage } from "../utils/errorHandler";

const Address = () => {
    const [province, setProvince] = useState<string>("")
    const [district, setDistrict] = useState<string>("")
    const [subDistrict, setSubDistrict] = useState<string>("")
    const [houseNumber, setHouseNumber] = useState<string>("")
    const [village, setVillage] = useState<string>("")
    const [postalCode, setPostalCode] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        const address = `จังหวัด ${province} อำเภอ ${district} ตำบล ${subDistrict} บ้านเลขที่ ${houseNumber} หมู่ ${village} รหัสไปรษณีย์ ${postalCode}`
        try {
            setLoading(true)
            setError(null)
            await axios.post("http://localhost:8080/users/address",
                { address },
                { withCredentials: true }
            )
            alert("ok")
            navigate("/account")
        } catch (err) {
            setError(getErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

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
                            <form onSubmit={handleSubmit}>
                                <h2 className="text-xl">Add Address</h2>
                                <div className="flex flex-col mt-4">
                                    <label>Province</label>
                                    <input type="text" onChange={event => setProvince(event.target.value)} className="border-2 border-gray-300 p-2 rounded" />
                                </div>
                                <div className="flex flex-col">
                                    <label>District</label>
                                    <input type="text" onChange={event => setDistrict(event.target.value)} className="border-2 border-gray-300 p-2 rounded" />
                                </div>
                                <div className="flex flex-col">
                                    <label>Subdistrict</label>
                                    <input type="text" onChange={event => setSubDistrict(event.target.value)} className="border-2 border-gray-300 p-2 rounded" />
                                </div>
                                <div className="flex flex-col">
                                    <label>House Number:</label>
                                    <input type="text" onChange={event => setHouseNumber(event.target.value)} className="border-2 border-gray-300 p-2 rounded" />
                                </div>
                                <div className="flex flex-col">
                                    <label>Village:</label>
                                    <input type="text" onChange={event => setVillage(event.target.value)} className="border-2 border-gray-300 p-2 rounded" />
                                </div>
                                <div className="flex flex-col">
                                    <label >Postal Code:</label>
                                    <input type="text" onChange={event => setPostalCode(event.target.value)} className="border-2 border-gray-300 p-2 rounded" />
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

export default Address