import axios from "axios";
import Wrapper from "../components/layout/Wrapper"
import Navbar from "../components/Navbar"
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { getErrorMessage } from "../utils/getErrorMessage";
import CartItemList from "../components/CartItemList";

interface CartItems {
    cart_item_id: number;
    product_id: number
    name: string;
    price: number;
    quantity: number
    total: number
}

interface CartResponse {
    limit: number;
    page: number;
    cart_items: CartItems[];
    total_amount: number
    total: number;
    total_page: number;
}

const Cart = () => {
    const [cart, setCart] = useState<CartResponse>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [toggleDelete, setToggleDelete] = useState<boolean>(false)
    const [toggleEdit, setToggleEdit] = useState<boolean>(false)

    const fetchCart = async () => {
        try {
            setLoading(true)
            setError(null)
            const res = await axios.get("http://localhost:8080/cart", {
                withCredentials: true
            })
            setCart(res.data)
        } catch (err) {
            setError(getErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])

    const toggleDeleteModal = () => {
        setToggleDelete(!toggleDelete)
    }

    const toggleEditModal = () => {
        setToggleEdit(!toggleEdit)
    }

    return (
        <main className="bg-gray-200">
            <Navbar />
            <div>
                <Wrapper>
                    <div className="py-4">
                        <div className="flex items-center text-lg mb-4">
                            <span>home</span>
                            <span><IoIosArrowForward /></span>
                            <span>cart</span>
                        </div>
                        <div className="bg-white p-4 rounded ">
                            {loading ? (
                                <div>loading...</div>
                            ) : error ? (
                                <div>{error}</div>
                            ) : (
                                <div>
                                    {cart?.cart_items.map((item) => (
                                        <CartItemList 
                                        id={item.cart_item_id} 
                                        name={item.name}
                                        price={item.price}
                                        quantity={item.quantity}
                                        total={item.total}
                                        toggleDelete={toggleDelete}
                                        toggleDeleteModal={toggleDeleteModal}
                                        toggleEdit={toggleEdit}
                                        toggleEditModal={toggleEditModal}
                                        fetchCart={fetchCart}
                                        />
                                    ))}
                                </div>
                            )}
                            <div className="flex justify-end">
                                <a href="/create_order" className="btn bg-green-300 p-2 rounded">Create Order</a>
                            </div>
                        </div>
                    </div>
                </Wrapper>
            </div>
        </main>
    )
}

export default Cart