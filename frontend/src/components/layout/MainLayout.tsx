import { ReactNode } from "react";
import Navbar from "../Navbar"
import Wrapper from "./Wrapper"
import { IoIosArrowForward } from "react-icons/io";
import Footer from "../Footer";

type Props = {
    children: ReactNode,
    title: string
}

const MainLayout = ({ children, title }: Props) => {
    return (
        <main className="p-2">
            <Navbar />
            <header className="bg-violet-500 rounded-b-[150px]">
                <Wrapper>
                    <div className="h-[250px] flex items-center justify-center text-white">
                        <div>
                            <h2 className="uppercase text-5xl font-bold mb-6">{title}</h2>
                            <p className="flex items-center justify-center">
                                <span>Home</span>
                                <span><IoIosArrowForward /></span>
                                <span>{title}</span>
                            </p>
                        </div>
                    </div>
                </Wrapper>
            </header>
            <div className="py-[140px]">
                {children}
            </div>
            <Footer />
        </main>
    )
}

export default MainLayout