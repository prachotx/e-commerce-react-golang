import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

function Wrapper({ children }: Props) {
  return (
    <div className="max-w-[1300px] mx-auto px-4">
        {children}
    </div>
  )
}

export default Wrapper