import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import Modal from "./Modal";
import axios from "axios";
import { getErrorMessage } from "../utils/errorHandler";

type Props = {
    id: number
    address: string
    fetchAddress: () => void
}

const AddressList = ({ id, address, fetchAddress }: Props) => {
    const [deleteToggle, setDeleteToggle] = useState<boolean>(false)

    const deleteModalToggle = () => {
        setDeleteToggle(!deleteToggle)
    }

    const deleteAddress = async () => {
        try {
            const res = await axios.delete(`http://localhost:8080/users/address/${id}`, { withCredentials: true })
            fetchAddress()
            alert(res.data.message)
        } catch (err) {
            console.log(getErrorMessage(err));
        }
    }

    return (
        <>
            <div className="border-2 border-gray-300 rounded h-[100px] flex items-center justify-between mb-4 p-4">
                <div>{address}</div>
                <div className="flex flex-col gap-2">
                    <button className="text-2xl bg-yellow-400 p-2 rounded-lg"><AiOutlineEdit /></button>
                    <button onClick={deleteModalToggle} className="text-2xl bg-red-400 p-2 rounded-lg"><MdDeleteOutline /></button>
                </div>
            </div>
            {deleteToggle && (
                <Modal>
                    <div className="bg-white rounded-lg p-6 w-1/3">
                        <h2 className="text-2xl font-bold mb-4">Are you sure ? to <span className="text-red-500">Delete</span></h2>
                        <div className="flex justify-end">
                            <button onClick={deleteAddress} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Delete</button>
                            <button
                                onClick={deleteModalToggle}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default AddressList