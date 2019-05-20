export default {
  /**
   * 封装userPage对象
   * @param current_page
   * @param page_size
   * @returns {{currentPage: *, pageSize: *}}
   */
  getUserPage(current_page, page_size) {
    const currentPage = current_page
    const pageSize = page_size
    var userPage
    userPage = {
      currentPage,
      pageSize
    }
    return userPage
  },
  /**
   * 封装赋值信息
   * @param result
   * @param pageData
   */
  pageInfo(result, pageData) {
    if (result.code === 200) {
      const data = result.data
      data.dataList.forEach((item, index) => {
        if (item.systemLogStatus) {
          for (let key in item.systemLogStatus) {
            item[key] = item.systemLogStatus[key]
          }
          delete item.systemLogStatus;
        }
      });
      pageData.tableData = data.dataList
      pageData.currentPage = data.current_page
      pageData.total_size = data.total_size
    }
  },
  handlerTableData(res,pageData){
    if(res.code === 200){
      const data = res.data;
      let tableData = [];
      
      data.dataList.forEach(parent=>{
        let childrens = parent.noticeEntryList || [];

        delete parent.noticeEntryList;
        childrens = childrens.map((children,index)=>{
          let data = {...parent,...children}
          data._versionParent = parent.version;
          //如果是第一个元素 那么得出需要合并的个数 
          if(index === 0){
            data._mergeNum = childrens.length;
          }
          return data
        });
        tableData = tableData.concat(childrens)
      });
      pageData.tableData = tableData;
      pageData.currentPage = data.current_page
      pageData.total_size = data.total_size
    }
  }

}
