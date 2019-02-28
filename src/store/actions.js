/* 通过mutation间接更新state的多个方法的对象*/
import {
  RECEIVE_USER_INFO,
  RECEIVE_MENU_LIST
} from './mutation-types'
import {repMenu} from '../api'
import storageUtils from '../utils/storageUtils'

export default {
  // 同步记录用户信息
  recordUser ({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },
  recordMenuList({commit},menuList){
    commit(RECEIVE_MENU_LIST, {menuList})
  }
  //获取菜单
}

