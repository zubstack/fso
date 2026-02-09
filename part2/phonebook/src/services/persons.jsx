import axios from "axios"

const URL = 'http://localhost:3002/persons'

const getAll = () => {
  const request = axios.get(URL)
  return request.then(result => result.data)
}

const create = (payload) => {
  const request = axios.post(URL, payload)
  return request.then(result => result.data)
}

const remove = (id) => {
  const request = axios.delete(`${URL}/${id}`)
  return request.then(result => result.data)
}

export default {getAll, create, remove}
