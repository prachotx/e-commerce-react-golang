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
                <h1>Add Product</h1>
                <div>
                    <label htmlFor="">name</label>
                    <input type="text" onChange={event => setName(event.target.value)} className="border-2 border-gray-300" />
                </div>
                <div>
                    <label htmlFor="">description</label>
                    <input type="text" onChange={event => setDescription(event.target.value)} className="border-2 border-gray-300" />
                </div>
                <div>
                    <label htmlFor="">price</label>
                    <input type="text" onChange={event => setPrice(Number(event.target.value))} className="border-2 border-gray-300" />
                </div>
                <div>
                    <label htmlFor="">stock</label>
                    <input type="text" onChange={event => setStock(Number(event.target.value))} className="border-2 border-gray-300" />
                </div>
                <div>
                    <label htmlFor="">discount</label>
                    <input type="text" onChange={event => setDiscount(Number(event.target.value))} className="border-2 border-gray-300" />
                </div>
                <div>
                    <select value={categoryID} onChange={event => setCategoryID(Number(event.target.value))} name="" id="">
                        {categorys.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <button type="submit" className="bg-green-300 p-2">add</button>
                </div>
            </form>
        </DashBoardLayout>
    )
}

export default AddProduct