import axios from 'axios'

const getQuestions = async (
  setQuestions,
  myPosition,
  setisLoading,
  setPageCount,
  page,
) => {
  const url = `http://localhost:8090/question/research/location?lat=${myPosition.lat}&lon=${myPosition.lon}&page=${page}`
  axios
    .get(url)
    .then((res) => {
      if (res) {
        setQuestions(res.data.results)
        setPageCount(res.data.totalPages)
        setisLoading(false)
      }
    })
    .catch((err) => {
      console.error(err)
    })
}

export default getQuestions
