import axios from "axios";
import Modal from "./Modal"
import { getErrorMessage } from "../utils/errorHandler";
import { FormEvent, useState } from "react";

type Props = {
    id: number;
    name: string;
    price: number;
    quantity: number
    total: number
    toggleDelete: boolean
    toggleDeleteModal: () => void
    toggleEdit: boolean
    toggleEditModal: () => void
    fetchCart: () => void
}

const CartItemList = ({ id, name, price, quantity, total, toggleDelete, toggleDeleteModal, toggleEdit, toggleEditModal, fetchCart }: Props) => {
    const [quantityEdit, setQuantityEdit] = useState<string>(String(quantity))

    const deleteCartItem = async () => {
        try {
            const res = await axios.delete(`http://localhost:8080/cart/${id}`, { withCredentials: true })
            fetchCart()
            alert(res.data.message)
        } catch (err) {
            console.log(getErrorMessage(err));
        }
    }

    const editCartItem = async (event: FormEvent) => {
        event.preventDefault()
        try {
            const res = await axios.put(`http://localhost:8080/cart/${id}`,
                { quantity: parseInt(quantityEdit) },
                { withCredentials: true }
            )
            fetchCart()
            alert(res.data.message)
        } catch (err) {
            alert(getErrorMessage(err))
        }
    }

    return (
        <div key={id} className="border-2 border-gray-300 rounded p-2 mb-2 flex justify-between">
            <div>
                <div>name : {name}</div>
                <div>price : {price}</div>
                <div>quantity : {quantity}</div>
                <div>total : {total}</div>
            </div>
            <div>
                <button onClick={toggleEditModal} className="bg-yellow-300 p-2 rounded mr-2">edit</button>
                <button onClick={toggleDeleteModal} className="bg-red-300 p-2 rounded">delete</button>
            </div>
            {toggleDelete && (
                <Modal>
                    <div className="bg-white rounded-lg p-6 w-1/3">
                        <h2 className="text-2xl font-bold mb-4">Are you sure ? to <span className="text-red-500">Delete</span></h2>
                        <div className="flex justify-end">
                            <button onClick={deleteCartItem} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Delete</button>
                            <button
                                onClick={toggleDeleteModal}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
            {toggleEdit && (
                <Modal>
                    <div className="bg-white rounded-lg p-6 w-1/3">
                        <h2 className="text-2xl font-bold mb-4">Enter your Quantity</h2>
                        <form onSubmit={editCartItem}>
                            <div className="flex flex-col mb-4">
                                <label>Quantity</label>
                                <input value={quantityEdit} type="number" min={1} onChange={(event) => setQuantityEdit(event.target.value)} className="border-2 border-gray-300 p-2 rounded" required />
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mr-2 disabled:bg-gray-600">Add</button>
                                <button
                                    type="button"
                                    onClick={toggleEditModal}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default CartItemList