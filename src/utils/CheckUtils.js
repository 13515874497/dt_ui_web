import message from '../utils/Message'

export default {
  /**
   * 校验上传文件信息
   * @param file
   * @param uploadFrom
   * @returns {boolean}
   */
  checkFileInfo (file, uploadFrom) {
    let fileShopNameDt = file.name.indexOf('电兔')
    //宏名
    let fileShopNameHm = file.name.indexOf('宏名')
    //诚夕
    let fileShopNameCx = file.name.indexOf('诚夕')
    //洲判断
    console.log(uploadFrom.areaId === '')
    //店铺文件判断
    if (fileShopNameDt === -1 && uploadFrom.shopId === 1) {
      message.errorMessage('不是电兔的文件/请注意操作~')
      return false
    } else if (fileShopNameHm === -1 && uploadFrom.shopId === 2) {
      message.errorMessage('不是宏名的文件/请注意操作~')
      return false
    } else if (fileShopNameCx === -1 && uploadFrom.shopId === 3) {
      message.errorMessage('不是诚夕的文件/请注意操作~')
      return false
    }
    if (uploadFrom.areaId === '') {
      //站点文件判断
      if (file.name.indexOf('美国') === -1 && uploadFrom.siteId === 1) {
        message.errorMessage('不是美国站的文件~')
        return false
      } else if (file.name.indexOf('加拿大') === -1 && uploadFrom.siteId === 2) {
        message.errorMessage('不是加拿大站的文件~')
        return false
      } else if (file.name.indexOf('澳大利亚') === -1 && uploadFrom.siteId === 3) {
        message.errorMessage('不是澳大利亚站的文件~')
        return false
      }
      else if (file.name.indexOf('英国') === -1 && uploadFrom.siteId === 4) {
        message.errorMessage('不是英国站的文件~')
        return false
      }
      else if (file.name.indexOf('德国') === -1 && uploadFrom.siteId === 5) {
        message.errorMessage('不是德国站的文件~')
        return false
      }
      else if (file.name.indexOf('法国') === -1 && uploadFrom.siteId === 6) {
        message.errorMessage('不是法国站的文件~')
        return false
      } else if (file.name.indexOf('意大利') === -1 && uploadFrom.siteId === 7) {
        message.errorMessage('不是意大利站的文件~')
        return false
      } else if (file.name.indexOf('西班牙') === -1 && uploadFrom.siteId === 8) {
        message.errorMessage('不是西班牙站的文件~')
        return false
      } else if (file.name.indexOf('日本') === -1 && uploadFrom.siteId === 9) {
        message.errorMessage('不是日本站的文件~')
        return false
      } else if (file.name.indexOf('墨西哥') === -1 && uploadFrom.siteId === 10) {
        message.errorMessage('不是墨西哥站的文件~')
        return false
      }
    } else {
      //洲判断
      if (file.name.indexOf('北美') === -1 && uploadFrom.areaId === 1) {
        message.errorMessage('不是北美的文件~')
        return false
      } else if (file.name.indexOf('太平洋') === -1 && uploadFrom.areaId === 2) {
        message.errorMessage('不是太平洋的文件~')
        return false
      } else if (file.name.indexOf('欧洲') === -1 && uploadFrom.areaId === 3) {
        message.errorMessage('不是欧洲的文件~')
        return false
      }
      else if (file.name.indexOf('亚洲') === -1 && uploadFrom.areaId === 4) {
        message.errorMessage('不是亚洲的文件~')
        return false
      }
    }
    const fileSize = file.size / 1024 / 1024 < 100
    if (!fileSize) {
      message.errorMessage('文件不能超过100MB')
      return false
    }
    return true
  }
}
