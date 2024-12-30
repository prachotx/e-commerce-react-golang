import { useParams } from "react-router"
import Navbar from "../components/Navbar"
import Wrapper from "../components/layout/Wrapper"
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";
import { getErrorMessage } from "../utils/errorHandler";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image_url: string;
    created_at: string;
    updated_at: string;
}

const ProductByID = () => {
    const id = useParams().id
    const [product, setProduct] = useState<Product>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

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

    return (
        <main className="bg-gray-200">
            <Navbar />
            <div>
                <Wrapper>
                    <div className="py-4">
                        <div className="flex items-center text-lg mb-4">
                            <span>home</span>
                            <span><IoIosArrowForward /></span>
                            <span>shop</span>
                        </div>
                        <div className="bg-white p-4 rounded">
                            {loading ? (
                                <div>loading...</div>
                            ) : error ? (
                                <div>{error}</div>
                            ) : (
                                <div>
                                    <div>{product?.name}</div>
                                    <div>{product?.description}</div>
                                    <div>{product?.price}</div>
                                    <div>{product?.stock}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </Wrapper>
            </div>
        </main>
    )
}
export default ProductByID