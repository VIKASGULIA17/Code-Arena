import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/home/HeroSection'
import MiddleSection from '../components/home/MiddleSection'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
     <div className='overflow-hidden'>
      <Navbar />
      <HeroSection />
      <MiddleSection />
      <Footer />
      </div>
    
    </>
  )
}

export default Home