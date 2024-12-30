import Wrapper from "../components/layout/Wrapper"
import Logo from "../components/Logo"
import Navbar from "../components/Navbar"

const Home = () => {
  return (
    <main className="bg-gray-200">
      <Navbar />
      <div>
        <Wrapper>
          <div className="h-screen flex items-center justify-center">
            <div><h2>Welcome to</h2><Logo /></div>
          </div>
        </Wrapper>
      </div>
    </main>
  )
}

export default Home