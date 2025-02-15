import Wrapper from "./layout/Wrapper"
import { FaShippingFast } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { PiShoppingCart } from "react-icons/pi";
import { FiLayout } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
import { getErrorMessage } from "../utils/getErrorMessage";
import { calculatePrice } from "../utils/calculatePrice";
import { Link, useNavigate } from "react-router";
import { RiShoppingBag4Line } from "react-icons/ri";
import { Product } from "../types/interfaces";

const Welcome = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [search, setSearch] = useState<string>("")
    const navigate = useNavigate()

    const fetchProducts = async () => {
        try {
            setLoading(true)
            setError(null)
            const res = await axios.get("http://localhost:8080/landing")
            setProducts(res.data)
        } catch (err) {
            setError(getErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleSearch = () => {
        navigate(`/product?search=${search}`)
    }

    return (
        <>
            <header className="bg-violet-500 rounded-b-[200px]">
                <Wrapper>
                    <div className="flex justify-between h-[900px] text-white relative">
                        <div className="max-w-[50%] h-[300px] mt-[200px]">
                            <h2 className="text-xl font-medium uppercase">Welcome to Lugx</h2>
                            <h1 className="text-5xl font-semibold uppercase my-6">Best Gameing site ever!</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit velit deserunt dolorum dolor officiis aut hic temporibus sed, laboriosam nostrum.</p>
                            <form onSubmit={handleSearch} className="flex justify-between mt-16 pl-7 w-[450px] bg-white  rounded-[25px] shadow">
                                <input type="text" onChange={event => setSearch(event.target.value)} className="text-sm text-black outline-none" placeholder="Type Something" required />
                                <button type="submit" className="bg-[#ff9671] rounded-[25px] px-4 py-3 font-medium uppercase text-white hover:bg-violet-500">Search Now</button>
                            </form>
                        </div>
                        <div className="mt-[100px]">
                            <div className="w-[420px] h-[500px] bg-white rounded-[25px] relative">
                                <img src="https://www.svgrepo.com/show/420323/avatar-avocado-food.svg" alt="" />
                                <div className="bg-violet-500 px-3 py-1 font-medium rounded-[25px] text-2xl absolute top-4 right-4">
                                    {loading ? (
                                        <>00</>
                                    ) : error ? (
                                        <>00</>
                                    ) : products.length > 0 ? (
                                        <>${calculatePrice(products[0].price, products[0].discount)}</>
                                    ) : (
                                        <>00</>
                                    )}
                                </div>
                                <div className="bg-[#ff9671] text-3xl font-semibold w-[100px] h-[100px] absolute left-[-25px] bottom-[-20px] rounded-full flex items-center justify-center">
                                    {loading ? (
                                        <>00</>
                                    ) : error ? (
                                        <>00</>
                                    ) : products.length > 0 ? (
                                        <>-{products[0].discount}%</>
                                    ) : (
                                        <>00</>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 uppercase absolute bottom-[-90px] w-full">
                            <div className="h-[200px] rounded-[25px] bg-white shadow-lg">
                                <div className="bg-violet-500 w-[90px] h-[90px] mx-auto rounded-full flex items-center justify-center text-5xl my-6"><FaShippingFast /></div>
                                <h3 className="text-black text-center text-lg font-semibold">Derivery</h3>
                            </div>
                            <div className="h-[200px] rounded-[25px] bg-white shadow-lg">
                                <div className="bg-violet-500 w-[90px] h-[90px] mx-auto rounded-full flex items-center justify-center text-5xl my-6"><MdOutlinePayment /></div>
                                <h3 className="text-black text-center text-lg font-semibold">Payment</h3>
                            </div>
                            <div className="h-[200px] rounded-[25px] bg-white shadow-lg">
                                <div className="bg-violet-500 w-[90px] h-[90px] mx-auto rounded-full flex items-center justify-center text-5xl my-6"><PiShoppingCart /></div>
                                <h3 className="text-black text-center text-lg font-semibold">Cart</h3>
                            </div>
                            <div className="h-[200px] rounded-[25px] bg-white shadow-lg">
                                <div className="bg-violet-500 w-[90px] h-[90px] mx-auto rounded-full flex items-center justify-center text-5xl my-6"><FiLayout /></div>
                                <h3 className="text-black text-center text-lg font-semibold">Easy layout</h3>
                            </div>
                        </div>
                    </div>
                </Wrapper>
            </header>
            <div className="my-[200px]">
                <Wrapper>
                    <div>
                        <h5 className="text-[#ff9671] font-bold uppercase mb-4">Discount</h5>
                        <div className="flex justify-between">
                            <h3 className="text-4xl font-bold">Discount Games</h3>
                            <Link to="/products" className="my-btn">View All</Link>
                        </div>
                        <div className="grid grid-cols-4 mt-12 gap-6">
                            {loading ? (
                                <div>loading...</div>
                            ) : error ? (
                                <div>{error}</div>
                            ) : (
                                <>
                                    {products.map((item) => (
                                        <Link key={item.id} to={`/products/${item.id}`} className="bg-gray-100 rounded-[25px] overflow-hidden relative">
                                            <img className="rounded-[25px]" src="https://placehold.co/600x400" alt="" />
                                            <div className="bg-violet-500 text-white absolute top-4 right-4 px-4 py-2 rounded-[10px]">
                                                <h6 className="text-right line-through">${item.price}</h6>
                                                <h6 className="text-lg font-semibold">${calculatePrice(item.price, item.discount)}</h6>
                                            </div>
                                            <div className="p-6 flex items-center justify-between">
                                                <div>
                                                    <p className="text-gray-500">Action</p>
                                                    <h4 className="font-semibold">{item.name}</h4>
                                                </div>
                                                <button className="bg-[#ff9671] flex items-center justify-center w-[45px] h-[45px] rounded-full text-white text-2xl"><RiShoppingBag4Line /></button>
                                            </div>
                                        </Link>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </Wrapper>
            </div>
        </>
    )
}

export default Welcome