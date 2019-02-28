/*
向local中存储数据的工具模块
1. 向外暴露一个函数(功能)
   只有一个功能需要暴露
2. 向外暴露一个对象(包含多个功能)
   有多个功能需要暴露
 */

export default {
  //读取
  readData (dataKey) {
    return JSON.parse(localStorage.getItem(dataKey) || '[]')
  },
  //写入
  saveData (dataKey, data) {
    localStorage.setItem(dataKey, JSON.stringify(data))
  }
}

/*
export function xxx() {

}

export function yyy () {

}*/
