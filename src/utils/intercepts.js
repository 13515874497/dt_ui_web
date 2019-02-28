import axios from 'axios'
import {Message} from 'element-ui'
export default {
//   a(){
//     axios.defaults.timeout = 5000
// // http请求拦截器
//     axios.interceptors.request.use(config => {
//       return config
//     }, error => {
//       Message.error('加载超时')
//       return Promise.reject(error)
//     })
//     axios.interceptors.response.use(data => {
//       return data
//     }, error => {
//       if(error && error.response){
//         switch (error.response.status) {
//           case 400:
//             Message.error('错误请求')
//             break;
//           case 401:
//             Message.error('未授权，请重新登陆')
//             break;
//           case 403:
//             Message.error('拒绝访问')
//             break;
//           case 404:
//             Message.error('请求错误，未找到资源')
//             break;
//           case 405:
//             Message.error('请求方法未允许')
//             break;
//           case 408:
//             Message.error('错误请求超时')
//             break;
//           case 500:
//             Message.error('服务端出错')
//             break;
//           case 501:
//             Message.error('网络未实现')
//             break;
//           case 502:
//             Message.error('网络错误')
//             break;
//           case 503:
//             Message.error('服务不可用')
//             break;
//           case 504:
//             Message.error('网络超时')
//             break;
//           case 505:
//             Message.error('http版本不支持该请求')
//             break;
//           default:
//             Message.error('连接错误${error.message.status}')
//         }
//       }else{
//         Message.error('网络出现问题，请稍候再试')
//       }
//       return Promise.reject(error)
//     })
//   }
}
