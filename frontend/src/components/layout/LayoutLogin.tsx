import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

const LayoutLogin = ({ children }: Props) => {
    return (
        <main className="h-screen grid grid-cols-2">
            <div className="bg-gray-200">
                
            </div>
            <div className="flex items-center justify-center">
                {children}
            </div>
        </main>
    )
}

export default LayoutLogin