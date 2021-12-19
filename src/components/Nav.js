import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({ keycloak }) => {
  return (
    <div>
      <div className="top-0 w-full flex flex-wrap">
        <section className="x-auto">
          <nav className="flex justify-between bg-gray-200 text-blue-800 w-screen">
            <div className="flex justify-evenly px-5 xl:px-12 py-6 w-full items-center">
              <h1 className="text-3xl font-bold font-heading">
                Full Stack Test App
              </h1>
              {keycloak.authenticated && (
                <div className=" flex flex-wrapmd:flex px-4 mx-auto font-semibold font-heading space-x-12">
                  <div>
                    <Link className="hover:text-blue-800" to="/home">
                      Home
                    </Link>
                  </div>
                  <div>
                    <Link className="hover:text-blue-800" to="/favoris">
                      Mes Favoris
                    </Link>
                  </div>
                </div>
              )}

              <div className="hover:text-gray-200">
                {!keycloak.authenticated && (
                  <button
                    type="button"
                    className="text-blue-800"
                    onClick={() => keycloak.login()}
                  >
                    Login
                  </button>
                )}

                {!!keycloak.authenticated && (
                  <button
                    type="button"
                    className="text-blue-800"
                    onClick={() => keycloak.logout()}
                  >
                    Logout ({keycloak.tokenParsed.name})
                  </button>
                )}
              </div>
            </div>
          </nav>
        </section>
      </div>
    </div>
  )
}

export default Nav
