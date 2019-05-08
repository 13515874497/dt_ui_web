import {
  Alert
} from "element-ui";

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
  let isChange = false;
  if (add.length || del.length) {
    isChange = true;
  }
  return {
    add,
    del,
    isChange
  }
}

//获取树结构某个id的路径
export const getTreePath = (value,tree, _id, _children) => {

  
  for (let i = 0; i < tree.length; i++) {
    let path = [];
    let id = tree[i][_id];
    let children = tree[i][_children];
    path.push(id);
    if(value === id){
      return path
    }else {
      if(children&& children.length){
        let result = getTreePath(value,children,_id,_children);
        // console.log(result);
        
        if(result){
          return path.concat(result);
        }
      }
    }
  }
}
