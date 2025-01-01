import { FormEvent, useState } from "react";
import Wrapper from "../components/layout/Wrapper"
import Navbar from "../components/Navbar"
import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";

const Address = () => {
    const [province, setProvince] = useState<string>(""); // จังหวัด
    const [district, setDistrict] = useState<string>(""); // อำเภอ
    const [subDistrict, setSubDistrict] = useState<string>(""); // ตำบล
    const [houseNumber, setHouseNumber] = useState<string>(""); // บ้านเลขที่
    const [village, setVillage] = useState<string>(""); // หมู่
    const [postalCode, setPostalCode] = useState<string>(""); // รหัสไปรษณีย์

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        const address = `จังหวัด ${province} อำเภอ ${district} ตำบล ${subDistrict} บ้านเลขที่ ${houseNumber} หมู่ ${village} รหัสไปรษณีย์ ${postalCode}`
        try {
            await axios.post("http://localhost:8080/users/address",
                { address },
                { withCredentials: true }
            )
            alert("ok")
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
                                <h2>Add Address</h2>
                                <label>Province:</label>
                                <select onChange={event => setProvince(event.target.value)}>
                                    <option value="นครพนม">Province 1</option>
                                    <option value="2asdasd">Province 2</option>
                                </select>
                                <br />
                                <label>District:</label>
                                <select onChange={event => setDistrict(event.target.value)}>
                                    <option value="ธาตุพนท">District 1</option>
                                    <option value="2asdasd">District 2</option>
                                </select>
                                <br />
                                <label>Subdistrict:</label>
                                <select onChange={event => setSubDistrict(event.target.value)}>
                                    <option value="เหนือ">Subdistrict 1</option>
                                    <option value="2asdasd">Subdistrict 2</option>
                                </select>
                                <br />
                                <label>House Number:</label>
                                <input type="text" onChange={event => setHouseNumber(event.target.value)} />
                                <br />
                                <label>Village:</label>
                                <input type="text" onChange={event => setVillage(event.target.value)} />
                                <br />
                                <label >Postal Code:</label>
                                <input type="text" onChange={event => setPostalCode(event.target.value)} />
                                <br />
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </Wrapper>
            </div>
        </main>
    )
}

export default Address