import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

const Modal = ({ children }: Props) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            {children}
        </div>
    )
}

export default Modal