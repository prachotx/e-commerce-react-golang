import axios from "axios"
import { FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { getErrorMessage } from "../utils/getErrorMessage"
import DashBoardLayout from "../components/layout/DashboardLayout"

const AddProduct = () => {
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [stock, setStock] = useState<number>(0)
    const [discount, setDiscount] = useState<number>(0)
    const [categoryID, setCategoryID] = useState<number>()
    const navigate = useNavigate()
    const [categorys, setCategorys] = useState<any[]>([])

    const fetchCategory = async () => {
        try {
            const res = await axios.get("http://localhost:8080/categorys")
            setCategorys(res.data.categorys)
            if (res.data.categorys.length > 0) {
                setCategoryID(res.data.categorys[0].id)
            }
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        try {
            const res = await axios.post("http://localhost:8080/products", {
                category_id: categoryID,
                name,
                description,
                price,
                stock,
                discount
            }, { withCredentials: true })
            navigate("/admin/products", { state: { successMessage: res.data.message } })
        } catch (err) {
            alert(getErrorMessage(err))
        }
    }

    return (
        <DashBoardLayout title="Add Product">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-xl mb-2">Name</label>
                    <input type="text" onChange={event => setName(event.target.value)} className="border-2 border-gray-300 outline-none w-full rounded-[25px] px-4 py-2" />
                </div>
                <div className="mb-4">
                    <label className="block text-xl mb-2">Description</label>
                    <input type="text" onChange={event => setDescription(event.target.value)} className="border-2 border-gray-300 outline-none w-full rounded-[25px] px-4 py-2" />
                </div>
                <div className="mb-4">
                    <label className="block text-xl mb-2">Price</label>
                    <input type="text" onChange={event => setPrice(Number(event.target.value))} className="border-2 border-gray-300 outline-none w-full rounded-[25px] px-4 py-2" />
                </div>
                <div className="mb-4">
                    <label className="block text-xl mb-2">Stock</label>
                    <input type="text" onChange={event => setStock(Number(event.target.value))} className="border-2 border-gray-300 outline-none w-full rounded-[25px] px-4 py-2" />
                </div>
                <div className="mb-4">
                    <label className="block text-xl mb-2">Discount</label>
                    <input type="text" onChange={event => setDiscount(Number(event.target.value))} className="border-2 border-gray-300 outline-none w-full rounded-[25px] px-4 py-2" />
                </div>
                <div className="mb-8">
                    <label className="block text-xl mb-2">Category</label>
                    <select value={categoryID} onChange={event => setCategoryID(Number(event.target.value))} className="border-2 border-gray-300 outline-none w-full rounded-[25px] px-4 py-2">
                        {categorys.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-10 text-center">
                    <button type="submit" className="bg-green-300 py-4 w-full max-w-md rounded-[20px] uppercase">add</button>
                </div>
            </form>
        </DashBoardLayout>
    )
}

export default AddProduct