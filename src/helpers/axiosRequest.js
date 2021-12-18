import axios from 'axios'

const getQuestions = async (url, token) => {
  axios
    .get(url)
    .then((res) => {
      if (res) {
        return res.data
      }
    })
    .catch((err) => {
      console.error(err)
    })
}

export default getQuestions
