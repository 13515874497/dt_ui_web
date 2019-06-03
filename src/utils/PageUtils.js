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
  handlerTableData(res,pageData,subField){
    if(res.code === 200){
      const data = res.data;
      let tableData = [];
      





      data.dataList.forEach(parent=>{
        parent._versionParent = parent.version;
        
        //1.---------------
        
        let key = 'entryList';
        //---------------

				console.log(key)

        let childrens = parent[key] || [];

        delete parent[key];
        childrens = childrens.map((children,index)=>{
          let data = {...parent,...children}
          //如果是第一个元素 那么得出需要合并的个数 
          if(index === 0){
            data._mergeNum = childrens.length;
          }
          return data
        });
        if(!childrens.length){
          parent._mergeNum = 1;
          childrens = [{...parent}]
        }
        tableData = tableData.concat(childrens)
      });
      pageData.tableData = tableData;
      pageData.currentPage = data.current_page
      pageData.total_size = data.total_size
    }
  }
}
