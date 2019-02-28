import {Loading} from 'element-ui'

export default{
  loading_dom(text1,dom){
    let loadingInstance = Loading.service({
      text: text1,
      spinner:'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
      target: dom
    })
    return loadingInstance
  },

}
