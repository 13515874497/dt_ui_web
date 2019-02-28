import axios from 'axios'
import { Message } from 'element-ui'

export default {
  // intercept(loadingInstance){
  //   axios.defaults.timeout = 5000
  //   // http请求拦截器
  //   axios.interceptors.request.use(config => {
  //     return config
  //   }, error => {
  //     loadingInstance.close()
  //     Message.error('加载超时')
  //     return Promise.reject(error)
  //   })
  //   // http响应拦截器
  //   axios.interceptors.response.use(data => {
  //     loadingInstance.close()
  //     return data
  //   }, error => {
  //     if(error && error.response){
  //       switch (error.response.status) {
  //         case 400:
  //           loadingInstance.close()
  //           Message.error('错误请求')
  //           break;
  //         case 401:
  //           loadingInstance.close()
  //           Message.error('未授权，请重新登陆')
  //           break;
  //         case 403:
  //           loadingInstance.close()
  //           Message.error('拒绝访问')
  //           break;
  //         case 404:
  //           loadingInstance.close()
  //           Message.error('请求错误，未找到资源')
  //           break;
  //         case 405:
  //           loadingInstance.close()
  //           Message.error('请求方法未允许')
  //           break;
  //         case 408:
  //           loadingInstance.close()
  //           Message.error('错误请求超时')
  //           break;
  //         case 500:
  //           loadingInstance.close()
  //           Message.error('服务端出错')
  //           break;
  //         case 501:
  //           loadingInstance.close()
  //           Message.error('网络未实现')
  //           break;
  //         case 502:
  //           loadingInstance.close()
  //           Message.error('网络错误')
  //           break;
  //         case 503:
  //           loadingInstance.close()
  //           Message.error('服务不可用')
  //           break;
  //         case 504:
  //           loadingInstance.close()
  //           Message.error('网络超时')
  //           break;
  //         case 505:
  //           loadingInstance.close()
  //           Message.error('http版本不支持该请求')
  //           break;
  //         default:
  //           loadingInstance.close()
  //           Message.error('连接错误${error.message.status}')
  //       }
  //     }else{
  //       loadingInstance.close()
  //       Message.error('网络出现问题，请稍候再试')
  //     }
  //     return Promise.reject(error)
  //   })
  // }
}
