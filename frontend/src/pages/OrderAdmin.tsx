import { useEffect, useState } from "react"
import DashBoardLayout from "../components/layout/DashboardLayout"
import { OrdersResponse } from "../types/interfaces"
import axios from "axios"
import { getErrorMessage } from "../utils/getErrorMessage"
import Pagination from "../components/Pagination"
import Loading from "../components/Loading"
import { Link } from "react-router"

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
            const res = await axios.get(`http://localhost:8080/admin_orders?${query}`, { withCredentials: true })
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
                            <td>product</td>
                            <td>create_at</td>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.orders.map((item) => (
                            <tr className="border-2 border-gray-400">
                                <td><Link to={`/admin/orders/${item.id}`}>{item.total_amount}</Link></td>
                                <td><button className="bg-sky-300 inline p-2 rounded">{item.status}</button></td>
                                <td>{item.created_at}</td>
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