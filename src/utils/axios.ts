import axios from 'axios'

const $axios = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
})

export default $axios
