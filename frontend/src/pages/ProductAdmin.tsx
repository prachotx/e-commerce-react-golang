import { useEffect, useState } from "react";
import { Link } from "react-router"
import { getErrorMessage } from "../utils/getErrorMessage";
import axios from "axios";
import Pagination from "../components/Pagination";
import { BiSearch } from "react-icons/bi";
import { CategoryResponse, ProductsResponse } from "../types/interfaces";
import DashBoardLayout from "../components/layout/DashboardLayout";

const ProductAdmin = () => {
    const [products, setProducts] = useState<ProductsResponse>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [search, setSearch] = useState<string>("")
    const [max, setMax] = useState<number>(0)
    const [min, setMin] = useState<number>(0)
    const [sort, setSort] = useState<string>("")
    const [page, setPage] = useState<number>(1)
    const [categorys, setCategorys] = useState<CategoryResponse>()
    const [categoryID, setCategoryID] = useState<number>()

    const fetchProducts = async () => {
        try {
            setLoading(true)
            setError(null)
            const query = new URLSearchParams({
                search,
                category_id: String(categoryID),
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

    const fetchCategory = async () => {
        try {
            const res = await axios.get("http://localhost:8080/categorys")
            setCategorys(res.data)
        } catch (err) {
            alert(getErrorMessage(err));
        }
    }

    useEffect(() => {
        fetchProducts()
        fetchCategory()
    }, [categoryID, sort, page, max, min])

    const handleDelete = async (id: number) => {
        try {
            const res = await axios.delete(`http://localhost:8080/products/${id}`, { withCredentials: true })
            fetchProducts()
            alert(res.data.message)
        } catch (err) {
            alert(getErrorMessage(err))
        }
    }

    return (
        <DashBoardLayout title="Product">
            <Link to="/admin/add_product"><button className="bg-green-300 p-2">Add Product</button></Link>
            <div className="flex">
                <div className="flex items-center rounded border-2 border-gray-300">
                    <input type="text" onChange={event => setSearch(event.target.value)} className="outline-none px-2 rounded-full" />
                    <button type="submit" className="bg-gray-300 text-lg p-2"><BiSearch /></button>
                </div>
                <select onChange={event => setSort(event.target.value)} className="ml-4 border-2 border-gray-300 rounded p-1">
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
                </select>
                <select onChange={event => setCategoryID(Number(event.target.value))} className="ml-4 border-2 border-gray-300 rounded p-1">
                    <option value={0}>All</option>
                    {categorys?.categorys.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
            </div>
            <table className="w-full">
                <thead>
                    <tr>
                        <td>image</td>
                        <td>category</td>
                        <td>name</td>
                        <td>description</td>
                        <td>price</td>
                        <td>discount</td>
                        <td>stock</td>
                        <td>create_at</td>
                        <td>opt</td>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>{error}</div>
                    ) : (
                        <>
                            {products?.products.map((item) => (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.category?.name}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                    <td>{item.discount}</td>
                                    <td>{item.stock}</td>
                                    <td>{item.created_at}</td>
                                    <td>
                                        <Link to={`/admin/edit_product/${item.id}`}><button className="bg-yellow-300 p-2">edit</button></Link>
                                        <button onClick={() => handleDelete(item.id)} className="bg-red-300 p-2">delete</button>
                                    </td>
                                </tr>
                            ))}
                            <Pagination page={products?.page || 1} total_page={products?.total_page || 1} setPage={setPage} />
                        </>
                    )}
                </tbody>
            </table>
        </DashBoardLayout>
    )
}

export default ProductAdmin