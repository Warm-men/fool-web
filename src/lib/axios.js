import axios from 'axios'
import qs from 'qs'
import { Toast } from 'antd-mobile'
// import utils from '@src/utils'
// import {HashRouter} from 'react-router-dom'
// const router = new HashRouter()
let CancelToken = axios.CancelToken

// 如果前后台非同域部署需要用
// axios.defaults.withCredentials = true

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    let requestName
    if (config.data) {
      requestName = config.data.requestName
    }
    // 判断，如果这里拿到的参数中的 requestName 在上一次请求中已经存在，就取消上一次的请求
    if (requestName) {
      if (axios[requestName] && axios[requestName].cancel) {
        axios[requestName].cancel()
      }
      config.cancelToken = new CancelToken(c => {
        axios[requestName] = {}
        axios[requestName].cancel = c
      })
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    // if (response.data.ret === 0) {
    //   // 正常
    //   return response.data
    // } else if (response.data.ret === 1000001) {
    //   // 没有登录或者登录过期 跳到getOauth页面自动登录
    //   router.history.push('/autoAuth')
    // } else {
    //   // 其他错误
    //   message.error(JSON.stringify(response.data))
    //   // throw后就会走到catch
    //   throw response.data
    // }
    if (
      response.data.ret === 1000001 &&
      !sessionStorage.getItem('againAuthority')
    ) {
      sessionStorage.setItem('againAuthority', 1)
      window.location.reload()
    } else {
      return response.data
    }
  },
  error => {
    // message.error('后台接口报错')
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误(400)'
          break
        case 401:
          error.message = '未授权，请重新登录(401)'
          break
        case 403:
          error.message = '拒绝访问(403)'
          break
        case 404:
          error.message = '请求出错(404)'
          break
        case 408:
          error.message = '请求超时(408)'
          break
        case 500:
          error.message = '服务器错误(500)'
          break
        case 501:
          error.message = '服务未实现(501)'
          break
        case 502:
          error.message = '网络错误(502)'
          break
        case 503:
          error.message = '服务不可用(503)'
          break
        case 504:
          error.message = '网络超时(504)'
          break
        case 505:
          error.message = 'HTTP版本不受支持(505)'
          break
        default:
          error.message = `连接出错(${error.response.status})!`
      }
    } else {
      // error.message = '连接服务器失败!'
    }
    // Toast.hide();
    // Toast.info(error.message, 2);
    return Promise.reject(error)
  }
)

const ajaxs = (option = {}) => {
  const {
    url = '',
    params = {},
    methods = 'post',
    isJson = true,
    exception = false
  } = option
  console.log(url)

  return new Promise((resolve, reject) => {
    let op = {
      url: methods !== 'post' ? url + `?${qs.stringify(params)}` : url,
      data: methods !== 'post' ? qs.stringify(params) : params,
      transformRequest: [
        function(fData, headers) {
          headers['Content-Type'] = isJson
            ? 'application/json'
            : 'application/x-www-form-urlencoded;charset=utf-8'
          return isJson ? JSON.stringify(fData) : qs.stringify(fData)
        }
      ],
      withCredentials: true,
      method: methods
    }
    axios(op).then(
      res => {
        if (res) {
          const { ret, retmsg = '', retdata = {} } = res
          if (ret !== 0) {
            Toast.hide()
            Toast.info(retmsg)
          }
          resolve(retdata)
        }
      },
      err => {
        // if (!utils.includesUrl(url) || exception) {
        //   // exception  用于同一个接口的  需要抛出异常的  传递此参数
        //   Toast.hide()
        //   Toast.info(err.message)
        // }
        reject(err)
      }
    )
  })
}

export default ajaxs
