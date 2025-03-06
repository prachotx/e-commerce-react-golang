import { useParams } from "react-router"
import DashBoardLayout from "../components/layout/DashboardLayout"
import { useEffect, useState } from "react"
import { OrdersItemResponse } from "../types/interfaces"
import { getErrorMessage } from "../utils/getErrorMessage"
import axios from "axios"
import Pagination from "../components/Pagination"

const OrderByIDAdmin = () => {
    const id = useParams().id
    const [orders, setOrders] = useState<OrdersItemResponse>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState<number>(1)

    const fetchOrderDetail = async () => {
        try {
            setLoading(true)
            setError(null)
            const query = new URLSearchParams({ page: String(page) })
            const res = await axios.get(`http://localhost:8080/orders/${id}?${query}`, { withCredentials: true })
            console.log(res.data);
            
            setOrders(res.data)
        } catch (err) {
            setError(getErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrderDetail()
    }, [])

    return (
        <DashBoardLayout title="Order">
            <div>
                <div className="flex flex-col">
                    <span>{orders?.order.address}</span>
                    <span>{orders?.order.province}</span>
                    <span>{orders?.order.district}</span>
                    <span>{orders?.order.sub_district}</span>
                    <span>{orders?.order.postcode}</span>
                </div>  
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>{error}</div>
                ) : (
                    <>
                        <div className="flex flex-col gap-4">
                            {orders?.order_items.map((item) => (
                                <div>
                                    <div>product name : {item.product.name}</div>
                                    <div>description : {item.product.description}</div>
                                    <div>price : {item.product.price}</div>
                                    <div>discount : {item.product.discount}</div>
                                    <div>quantity : {item.quantity}</div>
                                    <div>total price : {item.price}</div>
                                </div>
                            ))}
                        </div>
                        <Pagination page={orders?.page || 1} total_page={orders?.total_page || 1} setPage={setPage} />
                    </>
                )}
            </div>
        </DashBoardLayout>
    )
}

export default OrderByIDAdmin