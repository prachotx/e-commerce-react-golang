import Wrapper from "./layout/Wrapper"
import { Link, NavLink } from "react-router";
import { PiShoppingCart } from "react-icons/pi";
import { useAuth } from "../providers/authProvider";
import Profile from "./Profile";
import Logo from "./Logo";

const Navbar = () => {
  const { token } = useAuth()

  return (
    <nav className="bg-violet-500 text-white">
      <Wrapper>
        <div className="flex items-center justify-between h-24">
          <Logo />
          <ul className="flex items-center gap-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "bg-violet-600 py-3 px-4 rounded-[20px] text-white" : "py-3 px-4 rounded-[20px] hover:bg-violet-600"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? "bg-violet-600 py-3 px-4 rounded-[20px] text-white" : "py-3 px-4 rounded-[20px] hover:bg-violet-600"
                }
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? "bg-violet-600 block py-3 px-4 rounded-[20px]" : "py-3 px-4 rounded-[20px] block hover:bg-violet-600"
                }
              >
                <PiShoppingCart className="text-3xl" />
              </NavLink>
            </li>
            <li>
              {token ? (
                <Profile />
              ) : (
                <Link to="/login" className="my-btn">Sign In</Link>
              )}
            </li>
          </ul>
        </div>
      </Wrapper>
    </nav>
  )
}

export default Navbar 