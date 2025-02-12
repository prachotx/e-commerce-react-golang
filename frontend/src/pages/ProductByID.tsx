import { useNavigate, useParams } from "react-router"
import Wrapper from "../components/layout/Wrapper"
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { getErrorMessage } from "../utils/getErrorMessage";
import { RiShoppingBag4Line } from "react-icons/ri";
import MainLayout from "../components/layout/MainLayout";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    discount: number
    image_url: string;
    created_at: string;
    updated_at: string;
}

const ProductByID = () => {
    const id = useParams().id
    const [product, setProduct] = useState<Product>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [quantityToggle, setQuantityToggle] = useState<boolean>(false)
    const [quantity, setQuantity] = useState<string>("")
    const navigate = useNavigate()

    const quantityModalToggle = () => {
        setQuantityToggle(!quantityToggle)
    }

    const fetchProduct = async () => {
        try {
            setLoading(true)
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
                        <div className="max-w-[45%]">
                            <h3 className="text-2xl font-bold">Call of Dud</h3>
                            <h5 className="my-6">
                                <span className="text-gray-400 line-through mr-2">$28</span>
                                <span className="text-violet-500 text-2xl font-bold">$22</span>
                            </h5>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate quo molestiae maxime architecto dolores laboriosam quam consectetur, odio delectus nam.</p>
                            <div className="flex mt-6 gap-4">
                                <input type="text" className="bg-gray-100 rounded-[25px] w-[40px] shadow text-black" />
                                <button className="my-btn flex items-center"><RiShoppingBag4Line className="text-xl mr-2" />Add to Cart</button>
                            </div>
                        </div>
                        {/* {loading ? (
                                <div>loading...</div>
                            ) : error ? (
                                <div>{error}</div>
                            ) : (
                                <div>
                                    <div>name : {product?.name}</div>
                                    <div>description : {product?.description}</div>
                                    <div>price : {product?.price}</div>
                                    <div>stock : {product?.stock}</div>
                                    <div className="flex justify-end">
                                        <button onClick={quantityModalToggle} className="bg-green-500 p-2 rounded-lg text-white">Add to Cart</button>
                                        {quantityToggle && (
                                            <Modal>
                                                <div className="bg-white rounded-lg p-6 w-1/3">
                                                    <h2 className="text-2xl font-bold mb-4">Enter your Quantity</h2>
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="flex flex-col mb-4">
                                                            <label>Quantity</label>
                                                            <input
                                                                value={quantity}
                                                                type="number"
                                                                max={product?.stock}
                                                                min={1}
                                                                onChange={(event) => setQuantity(event.target.value)}
                                                                className="border-2 border-gray-300 p-2 rounded"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="flex justify-end">
                                                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mr-2">Add</button>
                                                            <button
                                                                type="button"
                                                                onClick={quantityModalToggle}
                                                                className="bg-red-500 text-white px-4 py-2 rounded"
                                                            >
                                                                Close
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </Modal>
                                        )}
                                    </div>
                                </div>
                            )} */}
                    </div>
                </Wrapper>
            </div>
        </MainLayout>
    )
}

export default ProductByID