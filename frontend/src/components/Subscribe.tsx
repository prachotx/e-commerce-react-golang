import { Link } from "react-router"
import InputBox from "./InputBox"
import Wrapper from "./layout/Wrapper"

const Subscribe = () => {
    return (
        <div className="mb-[400px]">
            <Wrapper>
                <div className="relative">
                    <div className="bg-gray-100 max-w-[40%] absolute top-0 left-0 p-[80px] rounded-[25px] mt-20">
                        <h6 className="text-[#ff9671] text-sm font-semibold uppercase mb-6">Out Shop</h6>
                        <h3 className="text-4xl font-bold">Go Pre-Order Buy & Get Best <span className="text-violet-500">Prices</span> For You!</h3>
                        <p className="font-medium my-12">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil illo dignissimos autem odio tenetur expedita.</p>
                        <div>
                            <Link to="/products" className="my-btn">Shop Now</Link>
                        </div>
                    </div>
                    <img className="rounded-[25px] mx-auto" src="https://placehold.co/600x400" alt="" />
                    <div className="bg-gray-100 max-w-[45%] absolute top-0 right-0 p-[80px] rounded-[25px] mt-40">
                        <h6 className="text-[#ff9671] text-sm font-semibold uppercase mb-6">NEWSLETTER</h6>
                        <h3 className="text-4xl font-bold">Get Up To $100 Off Just Buy <span className="text-violet-500">Subscribe</span> Newsletter!</h3>
                        <InputBox placeholder="Your email . . ." nameBtn="Subscribe Now" width="" />
                    </div>
                </div>
            </Wrapper>
        </div>
    )
}

export default Subscribe