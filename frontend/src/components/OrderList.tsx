import { Link } from "react-router"

type Props = {
    id: number
    total_amount: number
    status: string
    address: string
    province: string
    district: string
    subDistrict: string
    postCode: string
}

const OrderList = ({
    id,
    total_amount,
    status,
    address,
    province,
    district,
    subDistrict,
    postCode
}: Props) => {
    return (
        <Link to={`/orders/${id}`} className="flex justify-between border-2 border-gray-300 p-4 rounded">
            <div>{total_amount}</div>
            <div>
                <span>{address}</span>
                <span>{province}</span>
                <span>{district}</span>
                <span>{subDistrict}</span>
                <span>{postCode}</span>
            </div>
            <div>{status}</div>
        </Link>
    )
}

export default OrderList