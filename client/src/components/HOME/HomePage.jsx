
import { useState } from 'react'
import Navbar from '../Navbar'
import Hero from './Hero'
import Services from './Services'
import { Home } from 'lucide-react'

function HomePage() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Hero/>
    <Services/>
    </>
  )
}

export default HomePage
