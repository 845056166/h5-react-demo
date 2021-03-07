import axios, { AxiosRequestConfig } from 'axios'
import { store } from '@/store/index'
export interface RequestConfig extends AxiosRequestConfig {
  showLoading?: boolean
  headers?: any
}

axios.defaults.timeout = 30000

// 需要 loading 的请求计数器
let needLoadingRequestCount = 0
// 需要进行登录的请求计数器
let needLoginRequestCount = 0

axios.interceptors.request.use(
  async (config: RequestConfig) => {
    if (config.showLoading) {
      showLoading()
    }

    if (config.headers.needFp) {
    }

    return config
  },
  error => {
    tryHideLoading()
    Promise.reject(error)
  }
)

axios.interceptors.response.use(
  async response => {
    tryHideLoading()
    let responseData = response.data
    responseData.headers = response.headers
    return responseData
  },
  error => {
    if (error.response && error.response.status) {
      if (error.response.status === 403 || error.response.status === 401) {
        if (needLoginRequestCount === 0) {
          needLoginRequestCount++
        }
      } else {
        tryHideLoading()
      }
    } else {
      tryHideLoading()
      Promise.reject(error)
    }
  }
)

export async function get(
  url: string,
  data?: object,
  config?: RequestConfig
): Promise<any> {
  return axios.get(`${url}`, config).catch(error => {
    console.log(error)
  })
}

export async function post(
  url: string,
  data?: any,
  config?: RequestConfig
): Promise<any> {
  return axios.post(url, data, config).catch(error => {
    console.log(error)
  })
}

export default {
  get,
  post
}

function showLoading(): void {
  const { appStore } = store

  if (needLoadingRequestCount === 0) {
    appStore.loading.show()
  }
  needLoadingRequestCount++
}

function tryHideLoading(): void {
  const { appStore } = store
  if (needLoadingRequestCount <= 0) return

  needLoadingRequestCount--

  if (needLoadingRequestCount === 0) {
    setTimeout(() => {
      if (needLoadingRequestCount === 0) {
        appStore.loading.hide()
      }
    }, 300)
  }
}
