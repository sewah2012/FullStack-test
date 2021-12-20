import React, { useEffect, useState } from 'react'
import Search from '../components/Search'
import Demande from '../components/Demande'
import ListeQuestion from '../components/ListeQuestion'
import axios from 'axios'
import SearchHits from '../components/SearchHits'
import getQuestions from '../helpers/axiosRequest'

const Secured = () => {
  const [isLoading, setisLoading] = useState(true)
  const [isSearching, setIsSearching] = useState(false)

  const [questions, setQuestions] = useState([])
  const [searchHits, setSearchHits] = useState([])

  const [myPosition, setMyPosition] = useState({
    lat: 34.2307571,
    lon: -6.6103882,
  })

  const url = `http://localhost:8090/question/research/location?lat=${myPosition.lat}&lon=${myPosition.lon}`
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setMyPosition({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      })
    })
    getQuestions(setQuestions, myPosition, setisLoading)

    return () => {}
  }, [])

  const onSearch = (searchTerm) => {
    setisLoading(true)
    setIsSearching(true)
    const searchUrl = `http://localhost:8090/question/research?search=${searchTerm}`
    if (searchTerm === '') return alert('Search term missing. Please Provide.')
    axios
      .get(searchUrl)
      .then((res) => {
        if (res) {
          if (res) {
            setSearchHits(res.data.questions)
            setisLoading(false)
          }
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const closeSearch = () => {
    setIsSearching(!isSearching)
  }

  const fetchMore = async (sortValue, tieBreaker) => {
    setisLoading(true)
    const url = `http://localhost:8090/question/research/location?lat=${myPosition.lat}&lon=${myPosition.lon}&sortValue=${sortValue}&tieBreaker=${tieBreaker}`
    const response = await axios.get(url)
    if (response) {
      setQuestions(response.data.results)

      console.log(response.data.results)
      setisLoading(false)
    }
  }
  return (
    <div className="bg-gray-50 pt-5">
      <Search onSearch={onSearch} />
      {isSearching && <button onClick={closeSearch}>Exit Search </button>}
      <div className="flex p-5 justify-start items-start flex-wrap">
        <Demande />

        {isSearching ? (
          <SearchHits results={searchHits} />
        ) : isLoading ? (
          <h1>loading ...</h1>
        ) : (
          <ListeQuestion
            fetchMore={fetchMore}
            questions={questions}
            className="flex-1 mlr-5"
          />
        )}
      </div>
    </div>
  )
}

export default Secured
