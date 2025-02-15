import axios from "axios";
import Wrapper from "../components/layout/Wrapper"
import Navbar from "../components/Navbar"
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { getErrorMessage } from "../utils/getErrorMessage";
import Pagination from "../components/Pagination";
import OrderList from "../components/OrderList";
import { OrdersResponse } from "../types/interfaces";

const Orders = () => {
    const [orders, setOrders] = useState<OrdersResponse>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>()
    const [page, setPage] = useState<number>(1)

    const fetchOrder = async () => {
        try {
            setLoading(true)
            setError(null)
            const query = new URLSearchParams({ page: String(page) })
            const res = await axios.get(`http://localhost:8080/orders?${query}`, { withCredentials: true })
            setOrders(res.data)
            console.log(res.data);

        } catch (err) {
            setError(getErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrder()
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
                            {loading ? (
                                <div>Loading...</div>
                            ) : error ? (
                                <div>{error}</div>
                            ) : (
                                <>
                                    <div className="flex flex-col gap-4">
                                        {orders?.orders.map((item) => (
                                            <OrderList
                                                key={item.id}
                                                id={item.id}
                                                total_amount={item.total_amount}
                                                status={item.status}
                                                address={item.address}
                                                province={item.province}
                                                district={item.district}
                                                subDistrict={item.sub_district}
                                                postCode={item.postcode}
                                            />
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

export default Orders