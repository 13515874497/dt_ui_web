import {
  Alert
} from "element-ui";

function type(obj) {
  var toString = Object.prototype.toString;
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(obj)];
}
//深拷贝
export const deepClone = (data) => {
  var t = type(data),
    o, i, ni;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (i = 0, ni = data.length; i < ni; i++) {
      o.push(deepClone(data[i]));
    }
    return o;
  } else if (t === 'object') {
    for (i in data) {
      o[i] = deepClone(data[i]);
    }
    return o;
  }
}



//数组去重
export const unique = (arr) => {
  let obj = {},
    r = [],
    len = arr.length;
  for (let i = 0; i < len; i++) {
    let item = arr[i];
    if (obj[item]){
      continue;
    }else {
      obj[item] = 1;
      r.push(item);
    }
  }
  return r;
}
//判断数组中是否有重复的元素
export const isRepetArr = (arr) => {
  let hash = {};
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if (hash[item]) {
      return true
    }
    hash[item] = true;
  }
  return false
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
export const getTreePath = (value, tree, _id, _children) => {


  for (let i = 0; i < tree.length; i++) {
    let path = [];
    let id = tree[i][_id];
    let children = tree[i][_children];
    path.push(id);
    if (value === id) {
      return path
    } else {
      if (children && children.length) {
        let result = getTreePath(value, children, _id, _children);
        if (result) {
          return path.concat(result);
        }
      }
    }
  }
}
