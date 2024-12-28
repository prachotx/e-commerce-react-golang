import { Link } from "react-router"

type Props = {
    id: number
    name: string,
    price: number
}

const ProductList = ({ id, name, price }: Props) => {
    return (
        <Link to={`/products/${id}`} className="flex flex-col border-2 border-gray-300 rounded">
            <img src="https://placehold.co/600x400" alt="" />
            <div className="text-center py-4 text-lg">
                <h2>{name}</h2>
                <p className="text-orange-500">THB {price}</p>
            </div>
        </Link>
    )
}

export default ProductList