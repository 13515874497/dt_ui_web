  //数组去重
export const unique = (arr)=> {
  let obj = {},r = [],len = arr.length;
  for(let i = 0; i< len;i ++){
    let item = arr[i];
    if(obj[item]) break;
    obj[item] = 1;
    r.push(item);
  }
  return r;
}
  

