import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Problems from './Pages/Problems'
// import About from './Pages/About'
import ProblemDetails from './components/problem/ProblemDetails'
import Contest from './Pages/Contest'
import Profile from './Pages/Profile'
import NotFound from './Pages/NotFound'
import Login from './Pages/Authentication/Login'
import Signup from './Pages/Authentication/Signup'
import AlgoVisualizer from './Pages/AlgoVisualizer'
import OngoingContestPage from './components/Contest/OngoingContestPage'
import ContestRegistration from './components/Contest/ContestRegistration'
import SessionExpired from './components/others/SessionExpired'
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import UserManagement from './Pages/Admin/UserManagement'
import ProblemManagement from './Pages/Admin/ProblemManagement'
import ContestManagement from './Pages/Admin/ContestManagement'
import Analysis from './Pages/Admin/Analysis'


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='problem' element={<Problems />} />
        <Route path='/problem/:id' element={<ProblemDetails />} />
        <Route path='contest' element={<Contest />} />
        <Route path='contest/registration' element={<ContestRegistration />} />
        <Route path='contest/:contestName' element={<OngoingContestPage />} />
        <Route path='profile' element={<Profile />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='algovisualizer' element={<AlgoVisualizer />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/sessionExpired' element={<SessionExpired />} />

        {/* Admin Panel Routes */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path='users' element={<UserManagement />} />
          <Route path='problems' element={<ProblemManagement />} />
          <Route path='contests' element={<ContestManagement />} />
          <Route path='analysis' element={<Analysis />} />
        </Route>

        {/* <Route path='/about' element={<About />} /> */}
      </Routes>
    </>
  )
}

export default App