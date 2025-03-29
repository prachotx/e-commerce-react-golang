import axios from "axios";
import Wrapper from "../components/layout/Wrapper"
import { useEffect, useState } from "react";
import { getErrorMessage } from "../utils/getErrorMessage";
import CartItemList from "../components/CartItemList";
import MainLayout from "../components/layout/MainLayout";
import { CartResponse } from "../types/interfaces";

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
        <MainLayout title="Cart">
            <div>
                <Wrapper>
                    <div>
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
        </MainLayout>
    )
}

export default Cart