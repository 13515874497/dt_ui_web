/* eslint-disable no-new */
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store'
import focus from './utils/focus'
import VueResource from 'vue-resource'
import login_intercept from './utils/login_intercept'
import loading from './utils/loading'
import './assets/icon/iconfont.css'//
import router from './router'
import {
  Badge,
  Button,
  Input,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  TableColumn,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Row,
  Col,
  Select,
  Option,
  OptionGroup,
  DatePicker,
  Pagination,
  Cascader,
  Tag,
  Popover,
  Form,
  FormItem,
  Switch,
  TimePicker,
  Radio,
  RadioGroup,
  Dialog,
  RadioButton,
  Transfer,
  Tree,
  Card,
  Upload,
  Progress,
  Steps,
  Step, Message,Autocomplete,
  Tabs,
  TabPane,
  Tooltip
} from 'element-ui'
import {repIndex} from './api'
import moment from 'moment'
Vue.component(Badge.name,Badge)
Vue.component(Button.name, Button)
Vue.component(Input.name, Input)
Vue.component(Container.name, Container)
Vue.component(Header.name, Header)
Vue.component(Aside.name, Aside)
Vue.component(Main.name, Main)
Vue.component(Footer.name, Footer)
Vue.component(Menu.name, Menu)
Vue.component(Submenu.name, Submenu)
Vue.component(MenuItem.name, MenuItem)
Vue.component(Dropdown.name, Dropdown)
Vue.component(DropdownMenu.name, DropdownMenu)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component(MenuItemGroup.name, MenuItemGroup)
Vue.component(Table.name, Table)
Vue.component(Checkbox.name, Checkbox)
Vue.component(CheckboxButton.name, CheckboxButton)
Vue.component(CheckboxGroup.name, CheckboxGroup)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(OptionGroup.name, OptionGroup)
Vue.component(DatePicker.name, DatePicker)
Vue.component(Pagination.name, Pagination)
Vue.component(Cascader.name, Cascader)
Vue.component(Tag.name, Tag)
Vue.component(Popover.name, Popover)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Switch.name, Switch)
Vue.component(TimePicker.name, TimePicker)
Vue.component(Radio.name, Radio)
Vue.component(RadioGroup.name, RadioGroup)
Vue.component(Dialog.name, Dialog)
Vue.component(RadioButton.name, RadioButton)
Vue.component(Transfer.name, Transfer)
Vue.component(Tree.name, Tree)
Vue.component(Card.name, Card)
Vue.component(Upload.name, Upload)
Vue.component(Progress.name, Progress)
Vue.component(Steps.name, Steps)
Vue.component(Step.name, Step)
Vue.component(Autocomplete.name, Autocomplete)
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)
Vue.component(Tooltip.name, Tooltip)
Vue.use(focus)
Vue.use(VueResource)
// 设置Cookie
Vue.prototype.setCookie = function (c_name, value, expiredays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = c_name + '=' + encodeURI(value) +
    ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}
//获取cookie
Vue.prototype.getCookie = function (c_name) {
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(c_name)
    if (c_start !== -1) {
      c_start = c_start + c_name.length + 1
      var c_end = document.cookie.indexOf(';', c_start)
      if (c_end === -1) c_end = document.cookie.length
      return decodeURI(document.cookie.substring(c_start, c_end))
    }
  }
  return ''
}
router.beforeEach((to, from, next) => {
  let rep =repIndex()
  rep.then((res)=>{
    console.log(to.fullPath==='/login')
    console.log(res)
    if(to.fullPath === '/login'){
      if (res.code === 200 && res.msg === 'ok') {
        next({path: '/index'})
        return
      }
    }
    if (to.matched.some(m => m.meta.showLogin)) {
      if (res.code === 200 && res.msg === 'ok') {
        // console.log("检测顺利进入")
        next()
      } else if (to.path !== '/') {
        next({path: '/login'})
        return Message({
          showClose: true,
          message: '检测到您还未登录,请登录后操作！',
          type: 'error'
        })
      }
    } else {
      // console.log("无检测进入")
      next()
    }
  }).catch(()=>{
    return Message({
      showClose: true,
      message: '数据异常，请联系后台管理员！',
      type: 'error'
    })
  })
})
//时间过滤器
Vue.filter('date-format',(value,formatStr='YYYY-MM-DD HH:mm:ss')=>{
  return moment(value).format(formatStr)
})
//获取屏幕尺寸
Vue.prototype.getViewportSize = function(){
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  };
};
new Vue({
  el: '#app',
  store,
  login_intercept,
  loading,
  render: h => h(App),
  template: '<App/>',
  router
})

