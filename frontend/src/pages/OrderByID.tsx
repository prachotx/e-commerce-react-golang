import { useParams } from "react-router"
import Wrapper from "../components/layout/Wrapper"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import axios from "axios"
import { getErrorMessage } from "../utils/getErrorMessage"
import Pagination from "../components/Pagination"
import { IoIosArrowForward } from "react-icons/io";

interface Order {
    id: number;
    user_id: number
    total_amount: number
    status: string
    address: string
    province: string
    district: string
    sub_district: string
    postcode: string
    created_at: string;
    updated_at: string;
}

interface OrderItem {
    id: number
    order_id: number
    product_id: number
    product: Product
    quantity: number
    price: number
    created_at: string;
    updated_at: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    discount: number;
    image_url: string;
    created_at: string;
    updated_at: string;
}

interface OrdersResponse {
    order: Order;
    order_items: OrderItem[]
    limit: number;
    page: number;
    total: number;
    total_page: number;
}

const OrderByID = () => {
    const id = useParams().id
    const [orders, setOrders] = useState<OrdersResponse>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState<number>(1)

    const fetchOrderDetail = async () => {
        try {
            setLoading(true)
            setError(null)
            const query = new URLSearchParams({ page: String(page) })
            const res = await axios.get(`http://localhost:8080/orders/${id}?${query}`, { withCredentials: true })
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
        <main className="bg-gray-200">
            <Navbar />
            <div>
                <Wrapper>
                    <div className="py-4">
                        <div className="flex items-center text-lg mb-4">
                            <span>home</span>
                            <span><IoIosArrowForward /></span>
                            <span>order</span>
                        </div>
                        <div className="bg-white p-4 rounded">
                            <div>
                                <h1>total_amount : {orders?.order.total_amount}</h1>
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
                                                <div>name : {item.product.name}</div>
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
                    </div>
                </Wrapper>
            </div>
        </main>
    )
}

export default OrderByID