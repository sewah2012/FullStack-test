import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from './keycloak'
import PrivateRoute from './helpers/PrivateRoute'
import Nav from './components/Nav'
import WelcomePage from './pages/Homepage'
import SecuredPage from './pages/SecuredPage'

function App() {
  return (
    <div>
      <ReactKeycloakProvider authClient={keycloak}>
        <Nav />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<WelcomePage />} />
            <Route
              path="/secured"
              element={
                <PrivateRoute>
                  <SecuredPage />
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
