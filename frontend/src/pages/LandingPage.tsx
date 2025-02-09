import Navbar from "../components/Navbar"
import Welcome from "../components/Welcome"
import Footer from "../components/Footer"
import Subscribe from "../components/Subscribe"

const LandingPage = () => {
  return (
    <main className="p-2">
      <Navbar />
      <Welcome />
      <Subscribe />
      <Footer />
    </main>
  )
}

export default LandingPage