import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloakConfig from './keycloak'
import PrivateRoute from './helpers/PrivateRoute'
import Nav from './components/Nav'
import WelcomePage from './pages/Homepage'
import SecuredPage from './pages/SecuredPage'

function App() {
  return (
    <div>
      <ReactKeycloakProvider authClient={keycloakConfig}>
        <Nav />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<WelcomePage />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <SecuredPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/favoris"
              element={
                <PrivateRoute>
                  <h1> my favorites will be here </h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ReactKeycloakProvider>
    </div>
  )
}

export default App
