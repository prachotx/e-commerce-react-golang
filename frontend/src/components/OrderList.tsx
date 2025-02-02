type Props = {
    total_amount: number
    status: string
    address: string
    province: string
    district: string
    subDistrict: string
    postCode: string
}

const OrderList = ({
    total_amount,
    status,
    address,
    province,
    district,
    subDistrict,
    postCode
}: Props) => {
    return (
        <div className="flex justify-between border-2 border-gray-300 p-4 rounded">
            <div>{total_amount}</div>
            <div>
                <span>{address}</span>
                <span>{province}</span>
                <span>{district}</span>
                <span>{subDistrict}</span>
                <span>{postCode}</span>
            </div>
            <div>{status}</div>
        </div>
    )
}

export default OrderList