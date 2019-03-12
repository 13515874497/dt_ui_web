import {isNumber} from './verify'
export default {
  str: [{
    required: false,
    type: 'string',
    message: '请输入字符',
    trigger: 'bulr',
  }],
  number: [{
    required: false,
    validator: isNumber,
    message: '请输入数字',
    trigger: 'bulr',
  }],
  boolean: [{
    required: false,
    type: 'boolean',
    message: 'boolean布尔类型',
    trigger: 'bulr',
  }],
  date: [{
    required: false,
    message: '请选择日期',
    trigger: 'bulr'
  }],
  status: [{
    required: false,
    message: '请选择状态',
    trigger: 'bulr'
  }],



  //必填
  _str: [{
    required: true,
    type: 'string',
    message: '请输入字符',
    trigger: 'bulr',
  }],
  _number: [{
    validator: isNumber,
    message: '至少输入一个数字',
    trigger: 'bulr'
  },{
    required: true,
    message: '至少输入一个数字',
    trigger: 'bulr'
  }
],
  _boolean: [{
    required: true,
    type: 'boolean',
    message: 'boolean布尔类型',
    trigger: 'bulr',
  }],
  _date: [{
    required: true,
    message: '请输入日期',
    trigger: 'bulr'
  }],
  _status: [{
    required: true,
    message: '请选择状态',
    trigger: 'bulr'
  }]
}
