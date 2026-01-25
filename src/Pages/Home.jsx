import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/home/HeroSection'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
     <div className='overflow-hidden'>
      <Navbar />
      <HeroSection />
      <Footer />
      </div>
    
    </>
  )
}

export default Home