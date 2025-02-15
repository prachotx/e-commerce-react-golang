import { useNavigate, useParams } from "react-router"
import Wrapper from "../components/layout/Wrapper"
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { getErrorMessage } from "../utils/getErrorMessage";
import { RiShoppingBag4Line } from "react-icons/ri";
import MainLayout from "../components/layout/MainLayout";
import { calculatePrice } from "../utils/calculatePrice";
import { useAuth } from "../providers/authProvider";
import { Product } from "../types/interfaces";

const ProductByID = () => {
    const id = useParams().id
    const [product, setProduct] = useState<Product>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [quantity, setQuantity] = useState<string>("")
    const navigate = useNavigate()
    const { token } = useAuth()

    const fetchProduct = async () => {
        try {
            setLoading(true)
            setError(null)
            const res = await axios.get(`http://localhost:8080/products/${id}`)
            setProduct(res.data)
        } catch (err) {
            setError(getErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        if (!id) {
            alert("invalid product id")
            return
        }
        if (!token) {
            navigate("/login")
        }
        try {
            const res = await axios.post("http://localhost:8080/cart",
                { product_id: parseInt(id), quantity: parseInt(quantity) },
                { withCredentials: true }
            )
            alert(res.data.message)
            navigate("/products")
        } catch (err) {
            alert(getErrorMessage(err))
        }
    }

    return (
        <MainLayout>
            <div>
                <Wrapper>
                    <div className="flex justify-between">
                        <div>
                            <img className="rounded-[25px]" src="https://placehold.co/600x400" alt="" />
                        </div>
                        <div className="w-[45%]">
                            {loading ? (
                                <div>loading...</div>
                            ) : error ? (
                                <div>{error}</div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold">{product?.name}</h3>
                                    <h5 className="my-6">
                                        <span className="text-gray-400 line-through mr-2">${product?.price}</span>
                                        <span className="text-violet-500 text-2xl font-bold">${calculatePrice(Number(product?.price), Number(product?.discount))}</span>
                                    </h5>
                                    <p>{product?.description} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis dignissimos ipsa sapiente perspiciatis amet quod in quasi nesciunt dolor fuga!</p>
                                    <div className="flex items-center mt-6 gap-4">
                                        <div className="bg-gray-100 p-4 rounded-[25px]">
                                            <input type="text" onChange={event => setQuantity(event.target.value)} className="bg-gray-100 w-8 outline-none text-center" />
                                        </div>
                                        <button onClick={handleSubmit} className="my-btn flex items-center"><RiShoppingBag4Line className="text-xl mr-2" />Add to Cart</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </Wrapper>
            </div>
        </MainLayout>
    )
}

export default ProductByID