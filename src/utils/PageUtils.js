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
  //普通的表格数据
  pageInfo(res, pageData) {
    if (res.code === 200) {
      const data = res.data
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
  //有子表的表格  需要将父数据拷贝一份给子数据
  handlerTableData(res,pageData){
    if(res.code === 200){
      const data = res.data;
      let tableData = [];
      console.log('33333333333333333333333333333333333333333333333333');
      console.log(data);
      
      data.dataList.forEach(parent=>{
        let childrens = parent.noticeEntryList || [];
        console.log(childrens);
        
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
        console.log(childrens);
      });
      console.log(tableData);
      
      pageData.tableData = tableData;
      pageData.currentPage = data.current_page
      pageData.total_size = data.total_size
    }
  }
}
