import { BrowserRouter, Route, Routes } from 'react-router-dom'

import PrivateRoute from './helpers/PrivateRoute'
import Nav from './components/Nav'
import WelcomePage from './pages/Homepage'
import SecuredPage from './pages/SecuredPage'
import Favorites from './pages/Favorites'
import { useKeycloak } from '@react-keycloak/web'
import axios from 'axios'

function App() {
  const { keycloak } = useKeycloak()
  const isAuth = keycloak.authenticated

  axios.defaults.headers.common['Authorization'] = `Bearer ${keycloak.idToken}`
  return (
    <div>
      <BrowserRouter>
        <Nav keycloak={keycloak} />

        <Routes>
          <Route exact path="/" element={<WelcomePage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute isAuth={isAuth}>
                <SecuredPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/favoris"
            element={
              <PrivateRoute isAuth={isAuth}>
                <Favorites />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
