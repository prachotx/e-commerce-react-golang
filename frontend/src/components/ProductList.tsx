import { Link } from "react-router"
import { calculatePrice } from "../utils/calculatePrice"

type Props = {
    id: number
    name: string
    price: number
    discount: number
}

const ProductList = ({ id, name, price, discount }: Props) => {
    return (
        <Link to={`/products/${id}`} className="flex flex-col border-2 border-gray-300 rounded">
            <img src="https://placehold.co/600x400" alt="" />
            <div className="text-center py-4 text-lg">
                <h2>{name}</h2>
                <p className="text-orange-500">THB {calculatePrice(price, discount)}</p>
                <div>
                    <span className="text-gray-400 line-through mr-2">THB {price}</span>
                    <span>-{discount}%</span>
                </div>
            </div>
        </Link>
    )
}

export default ProductList