import { useKeycloak } from '@react-keycloak/web'
import Home from '../pages/Homepage'

const PrivateRoute = ({ children }) => {
  const { keycloak } = useKeycloak()

  const isLoggedIn = keycloak.authenticated

  // if (isLoggedIn) {
  //   console.log(keycloak.token)
  // }

  return isLoggedIn ? children : <Home />
}

export default PrivateRoute
