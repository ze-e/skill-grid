import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import LoginView from '../components/LoginView'
import SkillView from '../components/SkillView'
import ProfileView from '../components/ProfileView'

import Layout from '../components/Layout/Layout'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'

export default function App () {
  return (
    <BrowserRouter>
      <Layout>
          <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route exact path="login" element={<LoginView />} />
          <Route exact path="profile" element={<ProtectedRoute Component={<ProfileView/>} />} />
          <Route exact path="skills" element={<ProtectedRoute Component={<SkillView/>} />} />
        </Routes>
      </Layout>
      </BrowserRouter>
  )
}
