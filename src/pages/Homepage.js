import { useKeycloak } from '@react-keycloak/web'
import React from 'react'

const Home = () => {
  const { keycloak, initialized } = useKeycloak()

  return (
    <div className="mx-auto mt-40 w-[80%] p-10 flex flex-wrap justify-around items-center">
      <div className="flex-1">
        <h1 className="text-green-800  text-5xl">
          Bienvenue dans notre belle application de questions et réponses à
          proximité
        </h1>
      </div>

      <div className="flex flex-col justify-evenly item w-[40%]">
        <button
          onClick={() => keycloak.login()}
          className="px-20 py-3 bg-blue-700 rounded text-white m-5"
        >
          Login
        </button>
        <button
          onClick={() => keycloak.register()}
          className="px-20 py-3 bg-green-800 rounded text-white m-5"
        >
          Register
        </button>
      </div>
    </div>
  )
}

export default Home
