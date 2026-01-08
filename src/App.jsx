import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Problems from './Pages/Problems'
// import About from './Pages/About'
import ProblemDetails from './components/problem/ProblemDetails'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='problem' element={<Problems />} />
      <Route path='/problem/:id' element={<ProblemDetails />} />
      
      {/* <Route path='/about' element={<About />} /> */}
    </Routes>
    </>
  )
}

export default App