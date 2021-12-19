import Home from '../pages/Homepage'

const PrivateRoute = ({ children, isAuth }) => {
  return isAuth ? children : <Home />
}

export default PrivateRoute
