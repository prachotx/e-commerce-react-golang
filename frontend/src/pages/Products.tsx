import axios from "axios"
import { FormEvent, useEffect, useState } from "react";
import Wrapper from "../components/layout/Wrapper";
import { BiSearch } from "react-icons/bi";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import { getErrorMessage } from "../utils/getErrorMessage";
import MainLayout from "../components/layout/MainLayout";
import { ProductsResponse } from "../types/interfaces";
import Loading from "../components/Loading";
import Error from "../components/Error";

function Products() {
    const [products, setProducts] = useState<ProductsResponse>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [search, setSearch] = useState<string>("")
    const [max, setMax] = useState<number>(0)
    const [min, setMin] = useState<number>(0)
    const [sort, setSort] = useState<string>("")
    const [page, setPage] = useState<number>(1)
    const [categoryID, setCategoryID] = useState<number>(0)

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
                category_id: categoryID === 0 ? "" : String(categoryID),
            });
            const res = await axios.get(`http://localhost:8080/products?${query}`)
            console.log(res.data);
            
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
    }, [sort, page, max, min, categoryID])

    return (
        <MainLayout title="Shop">
            <div>
                <Wrapper>
                    <div>
                        <form onSubmit={handleSubmit} className="mb-[90px]">
                            <div className={`flex justify-center mx-auto pl-7 mb-[90px] max-w-[450px] bg-gray-100 rounded-[25px] shadow`}>
                                <input type="text" onChange={event => setSearch(event.target.value)} className="text-sm text-black outline-none bg-gray-100 w-full" placeholder="Search" />
                                <button type="submit" className="bg-[#ff9671] rounded-[25px] text-xl px-6 py-3 font-medium uppercase text-white hover:bg-violet-500"><BiSearch /></button>
                            </div>
                            <div className="flex flex-wrap gap-6 justify-center mb-[90px]">
                                <button onClick={() => setCategoryID(0)} className="bg-gray-200 font-semibold py-3 px-4 rounded-[20px] shadow uppercase">Show All</button>
                                {products?.categorys.map((item) => (
                                    <button key={item.id} onClick={() => setCategoryID(item.id)} className="bg-gray-200 font-semibold py-3 px-4 rounded-[20px] shadow uppercase">{item.name}</button>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-6 justify-center">
                                <button className="bg-gray-200 font-semibold py-3 px-4 rounded-[20px] shadow uppercase">Highest</button>
                                <button className="bg-gray-200 font-semibold py-3 px-4 rounded-[20px] shadow uppercase">Lowest</button>
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
                            <div className="flex items-center justify-center h-[400px]">
                                <Loading />
                            </div>
                        ) : error ? (
                            <div className="flex items-center justify-center h-[400px]">
                                <Error message={error} />
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-4 gap-6 mt-6">
                                    {products?.products.map((item) => (
                                        <ProductList key={item.id} id={item.id} category={item.category.name} name={item.name} price={item.price} discount={item.discount} />
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