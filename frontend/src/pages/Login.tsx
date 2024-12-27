import axios, { AxiosError } from "axios"
import { FormEvent, useRef, useState } from "react"
import LayoutLogin from "../components/layout/LayoutLogin"
import { Link, useNavigate } from "react-router"

function Login() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const emailRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const navigate = useNavigate()

    const handleLogin = async (event: FormEvent) => {
        event.preventDefault();
        try {
            setLoading(true)
            await axios.post(
                "http://localhost:8080/users/login",
                { email, password },
                { withCredentials: true }
            );
            navigate("/")
        } catch (err) {
            const message = getErrorMessage(err)
            if (message == "user not found") {
                emailRef.current?.focus()
                setLoading(false)
                setError(message)
            } else if (message == "password is incorrect") {
                passwordRef.current?.focus()
                setError(message)
            } else {
                setError(message)
            }
        } finally {
            setLoading(false)
        }
    };

    const getErrorMessage = (error: unknown): string => {
        return (error as AxiosError<{ message: string }>)?.response?.data?.message ?? "an unexpected error occurred";
    };

    return (
        <LayoutLogin>
            <form onSubmit={handleLogin} className="w-[380px] relative">
                <h1 className="text-2xl font-semibold text-center mb-6">Sign in to Joinman</h1>
                <div className="mb-4">
                    <input type="email" placeholder="Email" ref={emailRef} onChange={event => setEmail(event.target.value)} className="bg-gray-100 py-3 px-4 w-full rounded-full placeholder:text-gray-400" />
                </div>
                <div>
                    <input type="password" placeholder="Password" ref={passwordRef} onChange={event => setPassword(event.target.value)} className="bg-gray-100 py-3 px-4 w-full rounded-full placeholder:text-gray-400" />
                </div>
                <div className="flex justify-between my-4">
                    <div className="flex items-center gap-1">
                        <input type="checkbox" />
                        <p>Remember me</p>
                    </div>
                    <div>
                        <a href="/register" className="text-blue-600 underline">Forgot Password?</a>
                    </div>
                </div>
                <div className="mb-4">
                    <button type="submit" className="bg-green-300 uppercase w-full py-3 rounded-full disabled:bg-gray-600" disabled={loading}>Sign in</button>
                </div>
                <div className="text-center">
                    <span>Don't have an account? <Link to="/register" className="text-blue-600">Sign Up now</Link></span>
                </div>
                <div className="absolute text-center">
                    {error && <span className="text-red-500">{error}</span>}
                </div>
            </form>
        </LayoutLogin>
    )
}

export default Login