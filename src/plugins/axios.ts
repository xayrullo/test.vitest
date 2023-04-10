import axios, { type AxiosResponse } from 'axios'

const $axios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})
$axios.interceptors.request.use(
  (config: any) => {
    config.headers['Accept-Language'] = localStorage.getItem('locale')

    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

export default $axios
export type {
    AxiosResponse
}
