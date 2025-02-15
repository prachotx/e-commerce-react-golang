import axios from "axios"
import { FormEvent, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getErrorMessage } from "../utils/getErrorMessage"
import { CategoryResponse } from "../types/interfaces"
import DashBoardLayout from "../components/layout/DashboardLayout"

const EditProduct = () => {
    const id = useParams().id
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [stock, setStock] = useState<number>(0)
    const [discount, setDiscount] = useState<number>(0)
    const [categoryID, setCategoryID] = useState<number>()
    const [categorys, setCategorys] = useState<CategoryResponse>()
    const navigate = useNavigate()

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/products/${id}`)
            setName(res.data.name)
            setDescription(res.data.description)
            setPrice(res.data.price)
            setStock(res.data.stock)
            setDiscount(res.data.discount)
            setCategoryID(res.data.category_id)
        } catch (err) {
            alert(getErrorMessage(err))
        }
    }

    const fetchCategory = async () => {
        try {
            const res = await axios.get("http://localhost:8080/categorys")
            setCategorys(res.data)
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        try {
            const res = await axios.put(`http://localhost:8080/products/${id}`, {
                category_id: categoryID,
                name,
                description,
                price,
                stock,
                discount
            }, { withCredentials: true })
            alert(res.data.message)
            navigate("/admin/products")
        } catch (err) {
            alert(getErrorMessage(err))
        }
    }

    useEffect(() => {
        fetchProduct()
        fetchCategory()
    }, [])

    return (
        <DashBoardLayout title="Edit Product">
            <form onSubmit={handleSubmit}>
                <h1>Add Product</h1>
                <div>
                    <label htmlFor="">name</label>
                    <input value={name} type="text" onChange={event => setName(event.target.value)} className="border-2 border-gray-300" />
                </div>
                <div>
                    <label htmlFor="">description</label>
                    <input value={description} type="text" onChange={event => setDescription(event.target.value)} className="border-2 border-gray-300" />
                </div>
                <div>
                    <label htmlFor="">price</label>
                    <input value={price} type="text" onChange={event => setPrice(Number(event.target.value))} className="border-2 border-gray-300" />
                </div>
                <div>
                    <label htmlFor="">stock</label>
                    <input value={stock} type="text" onChange={event => setStock(Number(event.target.value))} className="border-2 border-gray-300" />
                </div>
                <div>
                    <label htmlFor="">discount</label>
                    <input value={discount} type="text" onChange={event => setDiscount(Number(event.target.value))} className="border-2 border-gray-300" />
                </div>
                <div>
                    <select onChange={event => setCategoryID(Number(event.target.value))} name="" id="">
                        {categorys?.categorys.map((item) => (
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

export default EditProduct