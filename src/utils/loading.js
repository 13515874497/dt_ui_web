import {Loading} from 'element-ui'

export default{
  loading_dom({text='',spinner,background='rgba(0, 0, 0, 0.7)',target}){
    // let loadingInstance = Loading.service({
    //   text: text1,
    //   // spinner:'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.7)',
    //   target: dom
    // })
    let loadingInstance = Loading.service({
      text,
      spinner,
      background,
      target
    })
    return loadingInstance
  },
}
