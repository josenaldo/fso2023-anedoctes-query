import axios from 'axios'

const baseUrl = 'http://localhost:3001/anedoctes'

export const getAnedoctes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
