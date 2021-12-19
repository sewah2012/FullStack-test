import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FavoritesList from '../components/FavoritesList'
import { useKeycloak } from '@react-keycloak/web'

const Favorites = () => {
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { keycloak } = useKeycloak()

  const userId = keycloak.idTokenParsed.sub
  console.log(keycloak.idTokenParsed.sub)

  const favoritesURl = `http://localhost:8090/question/likes?userId=${userId}`
  useEffect(() => {
    axios
      .get(favoritesURl)
      .then((res) => {
        if (res) {
          setQuestions(res.data.likes)
          console.log(res.data.likes)
        }
      })
      .catch((err) => {
        console.log(err)
      })

    setIsLoading(false)
    return () => {}
  }, [favoritesURl])

  return <FavoritesList questions={questions} isLoading={isLoading} />
}

export default Favorites
