import Wrapper from "../components/layout/Wrapper"
import Navbar from "../components/Navbar"
import { IoIosArrowForward } from "react-icons/io";

const Cart = () => {
    return (
        <main>
            <Navbar />
            <div>
                <Wrapper>
                    <div className="py-4">
                        <div className="flex items-center text-lg mb-4">
                            <span>home</span>
                            <span><IoIosArrowForward /></span>
                            <span>cart</span>
                        </div>
                    </div>
                </Wrapper>
            </div>
        </main>
    )
}

export default Cart