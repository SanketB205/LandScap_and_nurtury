
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Hero from './Hero'
import Services from '../Services'
import { Home } from 'lucide-react'
import Footer from '../../components/Footer'

function HomePage() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Hero />
      <Services />
      <Footer />
    </>
  )
}

export default HomePage
