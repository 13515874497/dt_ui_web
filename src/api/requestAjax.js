import {
  repHead,
} from '../api'
import loading from '../utils/loading'

export default {
  async requestGetHead (id) {
    let loadingInstance = loading.loading_dom('加载中', document.getElementById('Account'))
    const resultHead = await repHead(id)
    if (resultHead.code === 200) {
      if (resultHead.data.length === 0) {
        //如果是0 就全部不显示
        loadingInstance.close()
        return null
      }
      loadingInstance.close()
      return resultHead.data
    }

  }
}
