import axios from "axios"
import { FormEvent, useEffect, useState } from "react";
import Wrapper from "../components/layout/Wrapper";
import { BiSearch } from "react-icons/bi";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import { getErrorMessage } from "../utils/getErrorMessage";
import MainLayout from "../components/layout/MainLayout";

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

interface ProductsResponse {
    limit: number;
    page: number;
    products: Product[];
    total: number;
    total_page: number;
}

function Products() {
    const [products, setProducts] = useState<ProductsResponse>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [search, setSearch] = useState<string>("")
    const [max, setMax] = useState<number>(0)
    const [min, setMin] = useState<number>(0)
    const [sort, setSort] = useState<string>("")
    const [page, setPage] = useState<number>(1)

    const fetchProducts = async () => {
        try {
            setLoading(true)
            setError(null)
            const query = new URLSearchParams({
                search,
                sort,
                max: String(max),
                min: String(min),
                page: String(page),
            });
            const res = await axios.get(`http://localhost:8080/products?${query}`)
            setProducts(res.data)
        } catch (err) {
            setError(getErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        fetchProducts()
    }

    useEffect(() => {
        fetchProducts()
    }, [sort, page, max, min])

    return (
        <MainLayout>
            <div>
                <Wrapper>
                    <div>
                        <form onSubmit={handleSubmit}>
                            {/* <div className="flex items-center rounded border-2 border-gray-300">
                                    <input type="text" onChange={event => setSearch(event.target.value)} className="outline-none px-2 rounded-full" />
                                    <button type="submit" className="bg-gray-300 text-lg p-2"><BiSearch /></button>
                                </div> */}
                            <form className={`flex justify-between pl-7 mb-6 max-w-[450px] bg-gray-100 rounded-[25px] shadow`}>
                                <input type="text" className="text-sm text-black outline-none bg-gray-100" placeholder="Search" />
                                <button type="submit" className="bg-[#ff9671] rounded-[25px] text-xl px-6 py-3 font-medium uppercase text-white hover:bg-violet-500"><BiSearch /></button>
                            </form>
                            <div>
                                <button className="my-btn mr-4">Highest</button>
                                <button className="my-btn">Lowest</button>
                            </div>
                            {/* <select onChange={event => setSort(event.target.value)} className="ml-4 border-2 border-gray-300 rounded p-1">
                                    <option value="desc">Highest Price</option>
                                    <option value="asc">Lowest Price</option>
                                </select>
                                <select onChange={(event) => {
                                    let str = event.target.value
                                    let result = str.split(" ")
                                    setMax(Number(result[0]))
                                    setMin(Number(result[1]))
                                }} className="ml-4 border-2 border-gray-300 rounded p-1">
                                    <option value="0 0">Select Price Range</option>
                                    <option value="1500 500">1500 - 500</option>
                                    <option value="500 0">500 - 0</option>
                                </select> */}
                        </form>
                        {loading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div>{error}</div>
                        ) : (
                            <>
                                <div className="grid grid-cols-4 gap-6 mt-6">
                                    {products?.products.map((item) => (
                                        <ProductList key={item.id} id={item.id} name={item.name} price={item.price} discount={item.discount} />
                                    ))}
                                </div>
                                <Pagination page={products?.page || 1} total_page={products?.total_page || 1} setPage={setPage} />
                            </>
                        )}
                    </div>
                </Wrapper>
            </div>
        </MainLayout>
    )
}

export default Products