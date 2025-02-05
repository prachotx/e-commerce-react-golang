import Wrapper from "./layout/Wrapper"
import { FaShippingFast } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { PiShoppingCart } from "react-icons/pi";
import { FiLayout } from "react-icons/fi";

const Header = () => {
    return (
        <header className="bg-violet-500 rounded-b-[200px] mb-[200px]">
            <Wrapper>
                <div className="flex justify-between h-[900px] text-white">
                    <div className="max-w-[50%] h-[300px] mt-[200px]">
                        <h2 className="text-xl font-medium uppercase">Welcome to Lugx</h2>
                        <h1 className="text-5xl font-semibold uppercase my-6">Best Gameing site ever!</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit velit deserunt dolorum dolor officiis aut hic temporibus sed, laboriosam nostrum.</p>
                        <div className="flex justify-between mt-16 pl-7 bg-white w-[450px] rounded-[25px] shadow">
                            <input type="text" className="text-sm text-black outline-none" placeholder="Type Something" />
                            <button type="submit" className="bg-[#ff9671] rounded-[25px] px-4 py-3 font-medium uppercase">Search Now</button>
                        </div>
                    </div>
                    <div className="mt-[100px]">
                        <div className="w-[420px] h-[500px] bg-white rounded-[25px] relative">
                            <img src="https://www.svgrepo.com/show/420323/avatar-avocado-food.svg" alt="" />
                            <div className="bg-violet-500 px-3 py-1 font-medium rounded-[25px] text-2xl absolute top-4 right-4">$22</div>
                            <div className="bg-[#ff9671] text-3xl font-semibold w-[100px] h-[100px] absolute left-[-25px] bottom-[-20px] rounded-full flex items-center justify-center">-40%</div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4 uppercase">
                    <div className="h-[200px] rounded-[25px] bg-white shadow-lg">
                        <div><FaShippingFast /></div>
                        <h3>Derivery</h3>
                    </div>
                    <div className="h-[200px] rounded-[25px] bg-white shadow-lg">
                        <div><MdOutlinePayment /></div>
                        <h3>Payment</h3>
                    </div>
                    <div className="h-[200px] rounded-[25px] bg-white shadow-lg">
                        <div><PiShoppingCart /></div>
                        <h3>Cart</h3>
                    </div>
                    <div className="h-[200px] rounded-[25px] bg-white shadow-lg">
                        <div><FiLayout /></div>
                        <h3>Easy layout</h3>
                    </div>
                </div>
            </Wrapper>
        </header>
    )
}

export default Header