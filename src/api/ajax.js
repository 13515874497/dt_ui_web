/*
ajax请求函数模块
*/
import axios from 'axios'
import router from '../router'
import Vue from 'vue'
import {
  Message
} from 'element-ui'
export default function ajax(url, data = {}, type = 'GET', msg) {

  return new Promise(function (resolve, reject) {
    let token = Vue.prototype.getCookie('token');
    console.log(token);

    axios.defaults.headers.common['token'] = token;
    // 执行异步ajax请求
    let promise
    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
      console.log(url)
    } else {
      // 发送post请求
      promise = axios.post(url, data)
      console.log(url)
    }
    // axios.interceptors.request.use(config => {
    //   return config
    // }, error => {
    //   Message.error('加载超时')
    //   return Promise.reject(error)
    // })
    // axios.interceptors.response.use(data => {
    //   return data
    // }, error => {
    //   if(error && error.response){
    //     switch (error.response.status) {
    //       case 400:
    //         Message.error('错误请求')
    //         break;
    //       case 401:
    //         Message.error('未授权，请重新登陆')
    //         break;
    //       case 403:
    //         Message.error('拒绝访问')
    //         break;
    //       case 404:
    //         Message.error('请求错误，未找到资源')
    //         break;
    //       case 405:
    //         Message.error('请求方法未允许')
    //         break;
    //       case 408:
    //         Message.error('错误请求超时')
    //         break;
    //       case 500:
    //         Message.error('服务端出错')
    //         break;
    //       case 501:
    //         Message.error('网络未实现')
    //         break;
    //       case 502:
    //         Message.error('网络错误')
    //         break;
    //       case 503:
    //         Message.error('服务不可用')
    //         break;
    //       case 504:
    //         Message.error('网络超时')
    //         break;
    //       case 505:
    //         Message.error('http版本不支持该请求')
    //         break;
    //       default:
    //         Message.error('连接错误${error.message.status}')
    //     }
    //   }else{
    //     Message.error('网络出现问题，请稍候再试')
    //   }
    //   return Promise.reject(error)
    // })
    promise.then(function (response) {
      // 成功了调用resolve()
      data = {
        "code": 200,
        "msg": "success",
        "data": {
          "user": {
            "uid": 367,
            "userName": "vvvv",
            "pwd": null,
            "status": 1,
            "accountStatus": 0,
            "createIdUser": 1,
            "upIdUser": null,
            "createDate": 1550215905999,
            "upDate": null,
            "userExpirationDate": 0,
            "pwdValidityPeriod": 0,
            "userStatus": null,
            "version": null,
            "name": null,
            "roles": null,
            "rName": null,
            "rId": null,
            "landingTime": 1552897889645,
            "mobilePhone": null,
            "menuName": null,
            "delUser": 0,
            "delDate": null,
            "restoreDate": null,
            "uIds": null,
            "type": null,
            "computerName": null,
            "firstLogin": true
          },
          "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aWRlb1Rva2VuIiwiaWQiOjM2NywibmFtZSI6InZ2dnYiLCJzdGF0dXMiOjEsImlhdCI6MTU1Mjg5Nzg4OSwiZXhwIjoxNTUzNTAyNjg5fQ.Sn1b9HlCtIUoSlZWGWyM7Vm_1nWBH7m16rBbumdNCYQ"
        }
      }
      switch (response.data.code) {
        case -2:
          router.push('/login');
          Message({
            showClose: true,
            message: response.data.msg,
            type: "error"
          });
          break;
      }

      resolve(response.data)


      if (msg) {
        if (response.data.code == 200) {
          if (msg[0]) {
            Message({
              showClose: true,
              message: msg[0],
              type: "success"
            });
          }

        } else {
          if (msg[1]) {
            Message({
              showClose: true,
              message: msg[1] || response.msg,
              type: "error"
            });
          }

        }

      }
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })

  })
}
