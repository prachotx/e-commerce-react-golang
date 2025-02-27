import { Link } from "react-router"
import DashBoardLayout from "../components/layout/DashboardLayout"
import axios from "axios"
import { useEffect, useState } from "react"
import { getErrorMessage } from "../utils/getErrorMessage"
import { CategoryResponse } from "../types/interfaces"
import Pagination from "../components/Pagination"
import Loading from "../components/Loading"
import { alertSuccess } from "../utils/alertSuccess"
import { alertError } from "../utils/alertError"

const CategoryAdmin = () => {
    const [categorys, setCategorys] = useState<CategoryResponse>()
    const [page, setPage] = useState<number>(1)
    const [loading, setLoadng] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fetchCategory = async () => {
        try {
            setLoadng(true)
            setError(null)
            const query = new URLSearchParams({ page: String(page) })
            const res = await axios.get(`http://localhost:8080/categorys?${query}`)
            setCategorys(res.data)
        } catch (err) {
            alert(getErrorMessage(err));
        } finally {
            setLoadng(false)
        }
    }

    const handleDelete = async (id: number) => {
        try {
            const res = await axios.delete(`http://localhost:8080/categorys/${id}`, { withCredentials: true })
            fetchCategory()
            alertSuccess(res.data.message)
        } catch (err) {
            alertError(getErrorMessage(err))
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [page])

    return (
        <DashBoardLayout title="Category">
            <Link to="/admin/add_category">
                <button className="bg-green-300 p-2 rounded">Add Category</button>
            </Link>
            {loading ? (
                <Loading />
            ) : error ? (
                <div>error</div>
            ) : (
                <table className="w-full mt-6">
                    <thead className="border-2 border-gray-400 bg-gray-100">
                        <tr>
                            <td>name</td>
                            <td>product</td>
                            <td>create_at</td>
                            <td>opt</td>
                        </tr>
                    </thead>
                    <tbody>
                        {categorys?.categorys.map((item) => (
                            <tr className="border-2 border-gray-400">
                                <td>{item.name}</td>
                                <td>{item.products.length}</td>
                                <td>{item.created_at}</td>
                                <td>
                                    <Link to={`/admin/edit_category/${item.id}`}>
                                        <button className="bg-yellow-300 p-2 rounded mr-2">edit</button>
                                    </Link>
                                    <button onClick={() => handleDelete(item.id)} className="bg-red-300 p-2 rounded">delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <Pagination page={categorys?.page || 1} total_page={categorys?.total_page || 1} setPage={setPage} />
        </DashBoardLayout>
    )
}

export default CategoryAdmin