import axios from 'axios'

const getQuestions = async (setQuestions, myPosition, setisLoading) => {
  const url = `http://localhost:8090/question/research/location?lat=${myPosition.lat}&lon=${myPosition.lon}`
  axios
    .get(url)
    .then((res) => {
      if (res) {
        setQuestions(res.data.results)
        setisLoading(false)
      }
    })
    .catch((err) => {
      console.error(err)
    })
}

export default getQuestions
