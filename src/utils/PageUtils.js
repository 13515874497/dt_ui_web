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
  handlerTableData(res, pageData) { //res:后台返回的数据 pageData:Mxtable2 $data.data  origin_tableData:Mxtable2 $data.origin_tableData
    if (res.code === 200) {
      const data = res.data;

      data.dataList.forEach(parent => {
        if (parent.systemLogStatus) {
          for (let key in parent.systemLogStatus) {
            parent[key] = parent.systemLogStatus[key]
          }
          delete parent.systemLogStatus;
        }
      });
      pageData.origin_tableData = JSON.parse(JSON.stringify(data.dataList))
      

      let tableData = [];
      data.dataList.forEach(parent => {
        let childrens = parent['entryList'] || [];

        delete parent['entryList'];
        childrens = childrens.map((children, index) => {
          let data = {
            ...parent,
            ...children
          }
          data._transportTypeId = [1];
          //如果是第一个元素 那么得出需要合并的个数 
          if (index === 0) {
            data._mergeNum = childrens.length;
          }
          return data
        });
        if (!childrens.length) {
          parent._mergeNum = 1;
          childrens = [{
            ...parent
          }]
        }
        tableData = tableData.concat(childrens)
      });
      pageData.tableData = tableData;
      pageData.currentPage = data.current_page
      pageData.total_size = data.total_size
    }
  }
}
