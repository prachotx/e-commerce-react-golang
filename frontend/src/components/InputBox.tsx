import { ChangeEvent } from "react"

type Props = {
    title: string
    onChange: (event: ChangeEvent) => void
}

const InputBox = ({ title, onChange }: Props) => {
    return (
        <div className="flex flex-col mt-4">
            <label>{title}</label>
            <input type="text" onChange={onChange} className="border-2 border-gray-300 p-2 rounded" required />
        </div>
    )
}

export default InputBox