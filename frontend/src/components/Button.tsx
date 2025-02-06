import { Link } from "react-router"

type Props = {
    name: string
    path: string
}

const Button = ({ name, path }: Props) => {
    return (
        <Link to={path} className="bg-[#ff9671] text-white font-medium py-3 px-4 rounded-[20px] shadow uppercase">
            {name}
        </Link>
    )
}

export default Button