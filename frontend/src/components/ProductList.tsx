import { Link } from "react-router"
import { calculatePrice } from "../utils/calculatePrice"
import { RiShoppingBag4Line } from "react-icons/ri";

type Props = {
    id: number
    name: string
    price: number
    discount: number
}

const ProductList = ({ id, name, price, discount }: Props) => {
    return (
        <Link key={id} to={`/products/${id}`} className="bg-gray-100 rounded-[25px] overflow-hidden relative">
            <img className="rounded-[25px]" src="https://placehold.co/600x400" alt="" />
            <div className="bg-violet-500 text-white absolute top-4 right-4 px-4 py-2 rounded-[10px]">
                <h6 className="text-right line-through">${price}</h6>
                <h6 className="text-lg font-semibold">${calculatePrice(price, discount)}</h6>
            </div>
            <div className="p-6 flex items-center justify-between">
                <div>
                    <p className="text-gray-500">Action</p>
                    <h4 className="font-semibold">{name}</h4>
                </div>
                <button className="bg-[#ff9671] flex items-center justify-center w-[45px] h-[45px] rounded-full text-white text-2xl"><RiShoppingBag4Line /></button>
            </div>
        </Link>
    )
}

export default ProductList