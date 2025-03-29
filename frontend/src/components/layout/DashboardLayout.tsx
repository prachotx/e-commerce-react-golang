import { ReactNode } from "react"
import { Link, NavLink } from "react-router"
import { MdStorefront } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

type Props = {
    children: ReactNode
    title: string
}

const DashBoardLayout = ({ children, title }: Props) => {
    return (
        <main className="flex min-h-screen">
            <aside className="w-[430px] bg-violet-500">
                <div className="text-white">
                    <Link to="/">
                        <h1 className="text-3xl py-4 px-6 font-medium">LUGX</h1>
                    </Link>
                    <ul className="font-medium">
                        <li>
                            <NavLink to="/admin/products"
                                className={({ isActive }) =>
                                    isActive ? "flex items-center py-4 px-6 border-l-4 border-white" : "flex items-center py-4 px-7"
                                }
                            >
                                <MdStorefront className="text-xl mr-6" />
                                <div>Product</div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/categorys"
                                className={({ isActive }) =>
                                    isActive ? "flex items-center py-4 px-6 border-l-4 border-white" : "flex items-center py-4 px-7"
                                }
                            >
                                <BiCategory className="text-xl mr-6" />
                                <div>Category</div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/orders"
                                className={({ isActive }) =>
                                    isActive ? "flex items-center py-4 px-6 border-l-4 border-white" : "flex items-center py-4 px-7"
                                }
                            >
                                <FaRegStar className="text-xl mr-6" />
                                <div>Order</div>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </aside>
            <div className="w-full py-4 px-6">
                <h1 className="text-2xl font-medium">{title}</h1>
                <a href="https://github.com/prachotx/e-commerce-react-golang" target="_blank" className="block bg-violet-500 text-white rounded-[20px] my-6">
                    <div className="flex items-center py-4 px-6">
                        <FaStar className="mr-4" />
                        <h3>Star this Project on GitHub</h3>
                    </div>
                </a>
                {children}
            </div>
            <ToastContainer />
        </main>
    )
}

export default DashBoardLayout