export default {
  /**
   * 封装userPage对象
   * @param current_page
   * @param page_size
   * @returns {{currentPage: *, pageSize: *}}
   */
  getUserPage (current_page, page_size) {
    const currentPage = current_page
    const pageSize = page_size
    var userPage
    userPage = {currentPage, pageSize}
    return userPage
  },
  /**
   * 封装赋值信息
   * @param result
   * @param pageData
   */
  pageInfo (result, pageData) {
    const data = result.data

    data.dataList.forEach((item,index) => {
      if(item.systemLogStatus){
        for(let key in item.systemLogStatus){
          item[key] = item.systemLogStatus[key]
        }
        delete item.systemLogStatus;
      }  
    });
    
    pageData.tableData = data.dataList  
    pageData.currentPage = data.current_page
    pageData.total_size = data.total_size
  }

}
