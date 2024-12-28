import axios from "axios"
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react"
import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode"

interface User {
    exp: number;
    role: string;
    user_id: number;
    username: string
}

interface AuthContextType {
    token: string | null
    setToken: (newToken: string) => void
    user: User | null
    logout: () => void
}

const AuthContext = createContext<AuthContextType>({
    token: null,
    setToken: () => {},
    user: null,
    logout: () => {},
});

type Props = {
    children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
    const [token, setToken_] = useState<string | null>(Cookies.get("jwt") || null)
    const [user, setUser] = useState<{ [key: string]: any } | null>(null)

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["authorization"] = "bearer " + token
            try {
                const decoded = jwtDecode(token)
                setUser(decoded)
            } catch (err) {
                setUser(null)
            }
        } else {
            delete axios.defaults.headers.common["authorization"]
            setUser(null)
        }
    }, [token])

    const setToken = (newToken: string) => {
        setToken_(newToken)
    }

    const logout = () => {
        Cookies.remove("jwt")
        setToken_(null)
        setUser(null)
    }

    const contextValue = useMemo(() => (
        {
            token,
            setToken,
            user,
            logout
        }
    ), [token, user])

    return (
        <AuthContext.Provider value={contextValue as AuthContextType}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthProvider