import {
  repHead,
} from '../api'
import loading from '../utils/loading'

export default {
  async requestGetHead(id) {
    let loadingInstance = loading.loading_dom({text:'加载中',background:'rgba(255, 255, 255, 1)',target:'.el-main'});
    
    const resultHead = await repHead(id)
    
    loadingInstance.close();
    if (resultHead.code === 200) {
      if (resultHead.data.length === 0) {
        //如果是0 就全部不显示
        return null
      }
      resultHead.data.sort((a, b) => {
        return a.topOrder - b.topOrder;
      })
      return resultHead.data
    }

  }
}
