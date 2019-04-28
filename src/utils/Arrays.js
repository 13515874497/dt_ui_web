  //数组去重
  export const unique = (arr) => {
    let obj = {},
      r = [],
      len = arr.length;
    for (let i = 0; i < len; i++) {
      let item = arr[i];
      if (obj[item]) break;
      obj[item] = 1;
      r.push(item);
    }
    return r;
  }
  //数组获取不同(用于id值的比较)
  export const getDifferent = (origin, curr) => {
    let add = curr
      .filter(item => {
        return !origin.includes(item);
      })
    let del = origin
      .filter(item => {
        return !curr.includes(item);
      })
    let isRemoveAll = false;
    if(!add.length && origin.length === del.length ){
      isRemoveAll = true
    }
    return {
      add,
      del,
      isRemoveAll
    }
  }
