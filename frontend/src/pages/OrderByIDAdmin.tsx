import { useParams } from "react-router"
import DashBoardLayout from "../components/layout/DashboardLayout"
// import { useEffect, useState } from "react"
// import { OrdersItemResponse } from "../types/interfaces"
// import { getErrorMessage } from "../utils/getErrorMessage"
// import axios from "axios"

const OrderByIDAdmin = () => {
    const id = useParams().id
    // const [orders, setOrders] = useState<OrdersItemResponse>()
    // const [loading, setLoading] = useState<boolean>(false)
    // const [error, setError] = useState<string | null>(null)
    // const [page, setPage] = useState<number>(1)

    // const fetchOrderDetail = async () => {
    //     try {
    //         setLoading(true)
    //         setError(null)
    //         const query = new URLSearchParams({ page: String(page) })
    //         const res = await axios.get(`http://localhost:8080/orders/${id}?${query}`, { withCredentials: true })
    //         setOrders(res.data)
    //     } catch (err) {
    //         setError(getErrorMessage(err))
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    // useEffect(() => {
    //     fetchOrderDetail()
    // }, [])

    return (
        <DashBoardLayout title="Order">
            {id}
        </DashBoardLayout>
    )
}

export default OrderByIDAdmin