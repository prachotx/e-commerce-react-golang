import { Dispatch, SetStateAction } from "react";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

type Props = {
    page: number
    total_page: number
    setPage: Dispatch<SetStateAction<number>>
}

const Pagination = ({ page, total_page, setPage  }: Props) => {
    return (
        <div className="flex justify-between mt-4">
            <div>{page} / {total_page}</div>
            <div className="text-xl">
                <button onClick={() => setPage(page - 1)} disabled={page <= 1}><MdKeyboardDoubleArrowLeft /></button>
                <button onClick={() => setPage(page + 1)} disabled={page >= total_page}><MdKeyboardDoubleArrowRight /></button>
            </div>
        </div>
    )
}

export default Pagination