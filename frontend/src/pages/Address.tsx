import { FormEvent, useEffect, useState } from "react";
import Wrapper from "../components/layout/Wrapper"
import Navbar from "../components/Navbar"
import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router";
import { getErrorMessage } from "../utils/errorHandler";

// interface Province {
//     id: number
//     geography_id: number
//     name_th: string
//     name_en: string
//     created_at: string
//     updated_at: string
//     deleted_at: string
// }

const Address = () => {
    const [provinces, setProvinces] = useState<any[]>([]); // จังหวัด
    const [selectProvince, setSelectProvince] = useState<string>("")
    const [district, setDistrict] = useState<string>(""); // อำเภอ
    const [subDistrict, setSubDistrict] = useState<string>(""); // ตำบล
    const [houseNumber, setHouseNumber] = useState<string>(""); // บ้านเลขที่
    const [village, setVillage] = useState<string>(""); // หมู่
    const [postalCode, setPostalCode] = useState<string>(""); // รหัสไปรษณีย์
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const fetchProvince = async () => {
        try {
            setLoading(true)
            setError(null)
            const res = await axios.get("https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json")
            setProvinces(res.data)
        } catch (err) {
            setError(getErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProvince()
    }, [])

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        const address = `จังหวัด ${selectProvince} อำเภอ ${district} ตำบล ${subDistrict} บ้านเลขที่ ${houseNumber} หมู่ ${village} รหัสไปรษณีย์ ${postalCode}`
        try {
            await axios.post("http://localhost:8080/users/address",
                { address },
                { withCredentials: true }
            )
            alert("ok")
            navigate("/account")
        } catch (err) {
            console.log(err);
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
                                <div className="flex flex-col">
                                    <label>Province</label>
                                    <select onChange={event => setSelectProvince(event.target.value)} className="border-2 border-gray-300 p-2 rounded">
                                        {loading ? (
                                            <option value="2222" selected>loading...</option>
                                        ) : error ? (
                                            <option value="2222" selected>{error}</option>
                                        ) : (
                                            <option value="2222">1</option>
                                        )}
                                    </select>
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
                                <button type="submit" className="mt-4 bg-green-400 w-20 h-10 rounded-lg">Submit</button>
                            </form>
                        </div>
                    </div>
                </Wrapper>
            </div>
        </main>
    )
}

export default Address