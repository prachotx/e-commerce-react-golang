import Wrapper from "./layout/Wrapper"
import { Link } from "react-router";
import { PiShoppingCart } from "react-icons/pi";
import { useAuth } from "../provider/authProvider";
import Profile from "./Profile";
import Logo from "./Logo";

const Navbar = () => {
  const { token } = useAuth()

  return (
    <nav className="bg-white">
      <Wrapper>
        <div className="flex items-center justify-between h-20">
          <Logo />
          <ul className="flex gap-4">
            <li>
              <Link to="/">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products">
                Shop
              </Link>
            </li>
            <li>Order</li>
          </ul>
          <div className="flex items-center">
            <Link to="/cart">
              <PiShoppingCart className="text-3xl mr-8" />
            </Link>
            {token ? (
              <Profile />
            ) : (
              <Link to="/login" className="bg-gray-300 w-20 h-10 flex items-center justify-center rounded">
                Login
              </Link>
            )}
          </div>
        </div>
      </Wrapper>
    </nav>
  )
}

export default Navbar