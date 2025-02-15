import axios from "axios"
import DashBoardLayout from "../components/layout/DashboardLayout"
import { getErrorMessage } from "../utils/getErrorMessage"
import { FormEvent, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

const EditCategory = () => {
    const id = useParams().id
    const [name, setName] = useState<any>()
    const navigate = useNavigate()

    const fetchCategory = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/categorys/${id}`)
            setName(res.data.name)
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        try {
            const res = await axios.put(`http://localhost:8080/categorys/${id}`, { name }, { withCredentials: true })
            alert(res.data.message)
            navigate("/admin/categorys")
        } catch (err) {
            alert(getErrorMessage(err))
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])

  return (
    <DashBoardLayout title="Edit Category">
        <h1>Edit Category</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="">name</label>
                <input value={name} type="text" onChange={event => setName(event.target.value)} className="border-2 border-gray-300" />
            </div>
            <div>
                <button type="submit" className="bg-green-300 p-2">edit</button>
            </div>
        </form>
    </DashBoardLayout>
  )
}

export default EditCategory
