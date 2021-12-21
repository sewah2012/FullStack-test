import { useKeycloak } from '@react-keycloak/web'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react/cjs/react.development'

const Demande = ({ loadQuestions }) => {
  const { keycloak } = useKeycloak()
  const loggedInUser = keycloak.tokenParsed.preferred_username
  const [addingQuestion, setAddingQuestion] = useState(false)
  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lon: 0,
  })
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    content: '',
    location: {
      lat: 0,
      lon: 0,
    },
    response: [],
    ownerId: loggedInUser,
  })

  const onChangeHandler = (e) => {
    setNewQuestion({
      ...newQuestion,
      [e.target.name]: e.target.value,
    })
  }

  const addQuestionURL = `http://localhost:8090/question/post`
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setAddingQuestion(true)
    if (!newQuestion.title.trim()) {
      setAddingQuestion(false)
      return alert('Your question title is empty.')
    }

    if (!newQuestion.content.trim()) {
      setAddingQuestion(false)
      return alert('Your question content is empty.')
    }

    const data = {
      title: newQuestion.title,
      content: newQuestion.content,
      location: {
        lat: currentLocation.lat,
        lon: currentLocation.lon,
      },
      response: [],
      ownerId: loggedInUser,
    }
    axios
      .post(addQuestionURL, data)
      .then((res) => {
        if (res) {
          setNewQuestion({
            title: '',
            content: '',
            location: {
              lat: 0,
              lon: 0,
            },
            response: [],
            ownerId: loggedInUser,
          })

          setAddingQuestion(false)
          loadQuestions(0)
        }
        setAddingQuestion(false)
      })
      .catch((err) => {
        setAddingQuestion(false)
        console.log(err)
      })
  }

  const getLocation = (e) => {
    e.preventDefault()
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      })
    })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      })
    })
    return () => {}
  }, [])
  return (
    <div className="flex items-center justify-center  mt-4 mx-8 max-w-lg">
      <form className="w-full max-w-xl rounded-lg px-4 pt-2">
        <div className="flex flex-wrap -mx-3 mb-6">
          <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
            Demande une Questions
          </h2>
          <div className="w-full md:w-full px-3 mt-2">
            <input
              name="title"
              value={newQuestion.title}
              onChange={onChangeHandler}
              placeholder="Titre de votre question"
              type="text"
              className="rounded border border-gray-400 leading-normal resize-none w-full h-10 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white mb-5"
            />
            <textarea
              className="rounded border border-gray-400 leading-normal resize-none w-full h-40 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
              name="content"
              value={newQuestion.content}
              onChange={onChangeHandler}
              placeholder="Typer votre repondre ici.."
              required
            />
          </div>
          <div className="m-5 ">
            <button
              onClick={getLocation}
              className="border-2 bg-white text-gray-700 rounded p-2"
            >
              Get my Location{' '}
            </button>
            <div className="p-5">
              <h4>Latitude: {currentLocation.lat}</h4>
              <h4>Longitude: {currentLocation.lon}</h4>
            </div>
          </div>
          <div className="w-full flex items-start md:w-full px-3">
            <div className="-mr-1">
              <button
                disabled={addingQuestion}
                name="submit"
                onClick={onSubmitHandler}
                type="submit"
                className="text-blue bg-blue-700 text-yellow-50  font-medium p-3 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-green-400"
              >
                Posez Question
              </button>
            </div>
            {addingQuestion && <h2>Posting your question</h2>}
          </div>
        </div>
      </form>
    </div>
  )
}

export default Demande
