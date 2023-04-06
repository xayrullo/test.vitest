import axios, { type AxiosResponse } from 'axios'

const $axios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})
$axios.interceptors.request.use(
  (config) => {
    config.headers['Accept-Language'] = localStorage.getItem('locale')

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

console.log('Axios: ', $axios)

export default $axios
export type {
    AxiosResponse
}
