import axios from "axios"
import DashBoardLayout from "../components/layout/DashboardLayout"
import { getErrorMessage } from "../utils/getErrorMessage"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router"

const AddCategory = () => {
    const [name, setName] = useState<string>("")
    const navigate = useNavigate()

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        try {
            const res = await axios.post("http://localhost:8080/categorys", { name }, { withCredentials: true })
            alert(res.data.message)
            navigate("/admin/categorys")
        } catch (err) {
            alert(getErrorMessage(err))
        }
    }

    return (
        <DashBoardLayout title="Add Category">
            <h1>Add Category</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">name</label>
                    <input type="text" onChange={event => setName(event.target.value)} className="border-2 border-gray-300" />
                </div>
                <div>
                    <button type="submit" className="bg-green-300 p-2">add</button>
                </div>
            </form>
        </DashBoardLayout>
    )
}

export default AddCategory
