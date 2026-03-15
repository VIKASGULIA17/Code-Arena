import React from 'react'
import {EnhancedNavbar} from '../components/Navbar'
import HeroSection from '../components/home/HeroSection'
import Footer from '../components/Footer'
import TestingPage from '../../AIService/testingPage'

const Home = () => {
  return (
    <>
     <div className='overflow-hidden'>
      <EnhancedNavbar />
      <TestingPage/>
      <HeroSection />
      <Footer />
      </div>
    
    </>
  )
}

export default Home