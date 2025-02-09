type Props = {
    placeholder: string
    nameBtn: string
    width: string
}

const InputBox = ({ placeholder, nameBtn, width }: Props) => {
    return (
        <form className={`flex justify-between mt-16 pl-7 ${width} bg-white  rounded-[25px] shadow`}>
            <input type="text" className="text-sm text-black outline-none" placeholder={placeholder} required />
            <button type="submit" className="bg-[#ff9671] rounded-[25px] px-4 py-3 font-medium uppercase text-white hover:bg-violet-500">{nameBtn}</button>
        </form>
    )
}

export default InputBox