import Wrapper from "./layout/Wrapper"

const Footer = () => {
    return (
        <footer className="bg-violet-500 rounded-t-[200px]">
            <Wrapper>
                <div className="h-[200px] text-center pt-8">
                    <span className="text-white">Copyright © 2048 Prachot Company. All rights reserved</span>
                </div>
            </Wrapper>
        </footer>
    )
}

export default Footer