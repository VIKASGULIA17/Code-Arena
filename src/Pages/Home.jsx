import React from 'react'
import {EnhancedNavbar} from '../components/Navbar'
import HeroSection from '../components/home/HeroSection'
import Footer from '../components/Footer'
import { useDsaContext } from '../context/DsaContext'

const Home = () => {

  const {dsaContent} = useDsaContext();

  console.log(dsaContent);

  return (
    <>
     <div className='overflow-hidden'>
      <EnhancedNavbar />
      {/* <TestingPage/> */}
      <HeroSection />
      <Footer />
      </div>
    
    </>
  )
}

export default Home