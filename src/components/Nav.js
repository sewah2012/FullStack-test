import React from 'react'
import { useKeycloak } from '@react-keycloak/web'
const Nav = () => {
  const { keycloak, initialized } = useKeycloak()
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
                    <a className="hover:text-blue-800" href="/home">
                      Home
                    </a>
                  </div>
                  <div>
                    <a className="hover:text-blue-800" href="/favoris">
                      Mes Favoris
                    </a>
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
