import React from 'react'
import {EnhancedNavbar} from '../components/Navbar'
import HeroSection from '../components/home/HeroSection'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
     <div className='overflow-hidden'>
      <EnhancedNavbar />
      <HeroSection />
      <Footer />
      </div>
    
    </>
  )
}

export default Home