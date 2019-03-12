import {isNumber} from './verify'
export default {
  str: [{
    required: false,
    type: 'string',
    message: '请输入字符',
    trigger: 'blur',
  }],
  number: [{
    required: false,
    validator: isNumber,
    message: '请输入数字',
    trigger: 'blur',
  }],
  boolean: [{
    required: false,
    type: 'boolean',
    message: 'boolean布尔类型',
    trigger: 'blur',
  }],
  date: [{
    required: false,
    message: '请选择日期',
    trigger: 'blur'
  }],
  status: [{
    required: false,
    message: '请选择状态',
    trigger: 'blur'
  }],



  //必填
  _str: [{
    required: true,
    type: 'string',
    message: '请输入字符',
    trigger: 'blur',
  }],
  _number: [{
    validator: isNumber,
    message: '至少输入一个数字',
    trigger: 'blur'
  },{
    required: true,
    message: '至少输入一个数字',
    trigger: 'blur'
  }
],
  _boolean: [{
    required: true,
    type: 'boolean',
    message: 'boolean布尔类型',
    trigger: 'blur',
  }],
  _date: [{
    required: true,
    message: '请输入日期',
    trigger: 'blur'
  }],
  _status: [{
    required: true,
    message: '请选择状态',
    trigger: 'blur'
  }]
}
