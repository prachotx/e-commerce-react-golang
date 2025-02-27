import { MdErrorOutline } from "react-icons/md";

type Props = {
    message: string
}

const Error = ({ message }: Props) => {
    return (
        <>
            <MdErrorOutline className="text-7xl mr-4" />
            <div>
                <h4 className="font-medium">Something Went Wrong !</h4>
                <p className="font-medium text-2xl">{message}</p>
            </div>
        </>
    )
}

export default Error