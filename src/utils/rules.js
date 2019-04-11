import {isNumber,DBFieldRepeat} from './verify'
export default {
  str: [{
    required: false,
    type: 'string',
    message: '请输入字符',
    trigger: 'change',
  }],
  number: [{
    required: false,
    validator: isNumber,
    message: '请输入数字',
    trigger: 'change',
  }],
  boolean: [{
    required: false,
    type: 'boolean',
    message: 'boolean布尔类型',
    trigger: 'change',
  }],
  date: [{
    required: false,
    message: '请选择日期',
    trigger: 'change'
  }],
  status: [{
    required: false,
    message: '请选择状态',
    trigger: 'change'
  }],
  


  //必填
  _str: [{
    required: true,
    type: 'string',
    message: '请输入字符',
    trigger: 'change',
  },{
    validator: DBFieldRepeat,  //验证字段在数据库是否冲突
    trigger: 'blur'
  }
],
  _number: [{
    validator: isNumber,
    message: '至少输入一个数字',
    trigger: 'change'
  },{
    required: true,
    message: '至少输入一个数字',
    trigger: 'change'
  }
],
  _boolean: [{
    required: true,
    type: 'boolean',
    message: 'boolean布尔类型',
    trigger: 'change',
  }],
  _date: [{
    required: true,
    message: '请输入日期',
    trigger: 'change'
  }],
  _status: [{
    required: true,
    message: '请选择状态',
    trigger: 'change'
  }],
}
