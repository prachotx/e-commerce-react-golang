import { FormEvent, useState } from "react"
import LayoutLogin from "../components/layout/LayoutLogin"
import axios, { AxiosError } from "axios"
import { useNavigate } from "react-router"

const Register = () => {
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault()
    if (password != confirmPassword) {
      setError("passwords do not match")
    }
    try {
      setLoading(true)
      setError(null)
      await axios.post(
        "http://localhost:8080/users/register",
        { username, email, password }
      )
      navigate("/login")
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  const getErrorMessage = (error: unknown): string => {
    return (error as AxiosError<{ message: string }>)?.response?.data?.message ?? "an unexpected error occurred";
  };

  return (
    <LayoutLogin>
      <form onSubmit={handleRegister} className="w-[380px] relative">
        <h1 className="text-2xl font-semibold text-center mb-6">Sign up to Prachot</h1>
        <div className="mb-4">
          <input type="text" placeholder="Username" onChange={event => setUsername(event.target.value)} className="bg-gray-100 py-3 px-4 w-full rounded-full outline-none placeholder:text-gray-400" />
        </div>
        <div className="mb-4">
          <input type="email" placeholder="Email" onChange={event => setEmail(event.target.value)} className="bg-gray-100 py-3 px-4 w-full rounded-full outline-none placeholder:text-gray-400" />
        </div>
        <div className="mb-4">
          <input type="password" placeholder="Password" onChange={event => setPassword(event.target.value)} className="bg-gray-100 py-3 px-4 w-full rounded-full outline-none placeholder:text-gray-400" />
        </div>
        <div className="mb-4">
          <input type="password" placeholder="Confirm Password" onChange={event => setConfirmPassword(event.target.value)} className="bg-gray-100 py-3 px-4 w-full rounded-full outline-none placeholder:text-gray-400" />
        </div>
        <div className="mb-4">
          <button type="submit" className="bg-green-300 uppercase w-full py-3 rounded-full disabled:bg-gray-600" disabled={loading}>Sign up</button>
        </div>
        <div className="absolute text-center">
          {error && <span className="text-red-500">{error}</span>}
        </div>
      </form>
    </LayoutLogin>
  )
}

export default Register