import { FormEvent, useEffect, useState } from "react";
import Wrapper from "../components/layout/Wrapper"
import Navbar from "../components/Navbar"
import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import { getErrorMessage } from "../utils/getErrorMessage";
import { Address } from "../types/interfaces";

const CreateOrder = () => {
    const [address, setAddress] = useState<Address[]>()
    const [selectAddress, setSelectAddress] = useState<number>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fetchAddress = async () => {
        try {
            setLoading(true)
            setError(null)
            const res = await axios.get("http://localhost:8080/users/address", { withCredentials: true })
            setAddress(res.data)
        } catch (err) {
            setError(getErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        try {
            setLoading(true)
            setError(null)
            const res = await axios.post(`http://localhost:8080/orders/${selectAddress}`, { withCredentials: true })
            alert(res.data.message)
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
                            <span>cart</span>
                            <span><IoIosArrowForward /></span>
                            <span>create order</span>
                        </div>
                        <div className="bg-white p-4 rounded">
                            <form onSubmit={handleSubmit}>
                                <h2 className="text-xl">Create Order</h2>
                                {loading ? (
                                    <div>loading...</div>
                                ) : error ? (
                                    <div>{error}</div>
                                ) : (
                                    <select onChange={(event) => setSelectAddress(Number(event.target.value))} className="border-2 border-gray-300 rounded w-full h-[100px] p-4">
                                        {address?.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                <span>{item.address}</span>
                                                <span>{item.province}</span>
                                                <span>{item.district}</span>
                                                <span>{item.sub_district}</span>
                                                <span>{item.postcode}</span>
                                            </option>
                                        ))}
                                    </select>
                                )}
                                <div className="flex justify-end mt-4">
                                <button type="submit" className="bg-green-300 p-2 rounded disabled:bg-gray-600"  disabled={loading}>Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Wrapper>
            </div>
        </main>
    )
}

export default CreateOrder