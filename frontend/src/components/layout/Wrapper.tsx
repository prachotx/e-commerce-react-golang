import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

function Wrapper({ children }: Props) {
  return (
    <div className="max-w-[1200px] mx-auto">
        {children}
    </div>
  )
}

export default Wrapper