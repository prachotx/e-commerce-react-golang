import Wrapper from "./layout/Wrapper"
import { Link, NavLink } from "react-router";
import { PiShoppingCart } from "react-icons/pi";
import { useAuth } from "../providers/authProvider";
import Profile from "./Profile";
import Logo from "./Logo";
import Button from "./Button";

const Navbar = () => {
  const { token } = useAuth()

  return (
    <nav className="bg-violet-500 text-white">
      <Wrapper>
        <div className="flex items-center justify-between h-24">
          <Logo />
          <ul className="flex gap-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "bg-violet-600 py-3 px-4 rounded-[20px] text-white" : "py-3 px-4 rounded-[20px]"
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? "bg-violet-600 py-3 px-4 rounded-[20px] text-white" : "py-3 px-4 rounded-[20px]"
                }
              >
                Shop
              </NavLink>
            </li>
            <li>
              <Link to="/cart">
                <PiShoppingCart className="text-3xl" />
              </Link>
            </li>
            <li>
              {token ? (
                <Profile />
              ) : (
                <Button name="Sign In" path="/login" />
              )}
            </li>
          </ul>
        </div>
      </Wrapper>
    </nav>
  )
}

export default Navbar 