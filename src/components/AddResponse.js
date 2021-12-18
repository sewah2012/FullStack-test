import React, { useState } from 'react'
import { useKeycloak } from '@react-keycloak/web'
import axios from 'axios'

const AddResponse = ({ questionId }) => {
  const { keycloak } = useKeycloak()
  const loggedInUser = keycloak.tokenParsed.name
  const [responseText, setResponseText] = useState({
    response: '',
    author: loggedInUser,
  })
  const [addingQuestion, setaddingQuestion] = useState(false)

  const addResponseURL = `http://localhost:8090/question/response/${questionId}`

  const onChangeHandler = (e) => {
    setResponseText({
      ...responseText,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    setaddingQuestion(true)
    if (!responseText.response.trim()) {
      setaddingQuestion(false)
      return alert('Your response is empty.')
    }

    axios
      .post(addResponseURL, responseText)
      .then((res) => {
        if (res) {
          setResponseText({ response: '', author: loggedInUser })

          setaddingQuestion(false)
          window.location.reload(true)
        }
        setaddingQuestion(false)
      })
      .catch((err) => {
        setaddingQuestion(false)
        console.log(err)
      })
  }

  return (
    <div className="flex items-center justify-center  mt-4 mx-8 max-w-lg">
      <form className="w-full max-w-xl rounded-lg px-4 pt-2">
        <div className="flex flex-wrap -mx-3 mb-6">
          <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
            Posez votre repondre
          </h2>
          <div className="w-full md:w-full px-3 mt-2">
            <textarea
              className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
              name="response"
              value={responseText.response}
              onChange={onChangeHandler}
              placeholder="Typer votre repondre ici.."
              required
            />
          </div>
          <div className="w-full flex items-start md:w-full px-3">
            <div className="-mr-1">
              <input
                disabled={addingQuestion}
                name="submit"
                onClick={onSubmitHandler}
                type="submit"
                className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                value="Post Comment"
              />
            </div>
            {addingQuestion && <h2>Adding your Response</h2>}
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddResponse
