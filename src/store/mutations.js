/* 直接更新state的多个方法的对象*/
import Vue from 'vue'
import {
  RECEIVE_USER_INFO,
  RECEIVE_MENU_LIST
} from './mutation-types'
export default {
  [RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [RECEIVE_MENU_LIST] (state, {menuList}) {
    state.menuList = menuList
  }

}
