import { useEffect, useState } from "react"
import DashBoardLayout from "../components/layout/DashboardLayout"
import { OrdersResponse } from "../types/interfaces"
import axios from "axios"
import { getErrorMessage } from "../utils/getErrorMessage"
import Pagination from "../components/Pagination"
import Loading from "../components/Loading"
import { Link } from "react-router"
import { BiSearch } from "react-icons/bi";

const OrderAdmin = () => {
    const [orders, setOrders] = useState<OrdersResponse>()
    const [page, setPage] = useState<number>(1)
    const [loading, setLoadng] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fetchOrders = async () => {
        try {
            setLoadng(true)
            setError(null)
            const query = new URLSearchParams({ page: String(page) })
            const res = await axios.get(`http://localhost:8080/admin/orders?${query}`, { withCredentials: true })
            console.log(res.data);

            setOrders(res.data)
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoadng(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    return (
        <DashBoardLayout title="Order">
            {loading ? (
                <Loading />
            ) : error ? (
                <div>{error}</div>
            ) : (
                <table className="w-full mt-6">
                    <thead className="border-2 border-gray-400 bg-gray-100">
                        <tr>
                            <td>total_amount</td>
                            <td>status</td>
                            <td>create_at</td>
                            <td>view</td>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.orders.map((item) => (
                            <tr className="border-2 border-gray-400">
                                <td>{item.total_amount}</td>
                                <td>{item.status}</td>
                                <td>{item.created_at}</td>
                                <td>
                                    <Link to={`/admin/orders/${item.id}`}>
                                        <button className="text-2xl bg-sky-400 block p-2 rounded-lg">
                                            <BiSearch />
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <Pagination page={orders?.page || 1} total_page={orders?.total_page || 1} setPage={setPage} />
        </DashBoardLayout>
    )
}

export default OrderAdmin