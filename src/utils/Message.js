import {Message, MessageBox, Notification} from 'element-ui'

export default {
  successMessage (msg) {
    return Message({
      showClose: true,
      message: msg,
      type: 'success'
    })
  },
  errorMessage (msg) {
    return Message({
      showClose: true,
      message: msg,
      type: 'error'
    })
  },
  infoMessage (msg) {
    return Message({
      type: 'info',
      message: msg
    })
  },
  messageBox (msg) {
    return MessageBox(msg, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true
    })
  },
  messageNotSuccess (msg, title) {
    return Notification({
      title: title,
      message: msg,
      type: 'success',
      duration: 0
    })
  },
  messageNotError (msg, title) {
    return Notification.error({
      title: title,
      message: msg,
      duration: 0
    })
  },
  messageNotDError (msg, title) {
    return Notification.error({
      title: title,
      message: msg,
      position: 'top-left'
    })
  }
}
