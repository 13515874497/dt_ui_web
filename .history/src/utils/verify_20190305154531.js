export const isNumber = (rule, value, cb) => {
  console.log(value);
  let re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
  let val = Number(value);
  
  if (!re.test(val)) {
    cb(new Error('请输入数字'));
  } else {
    cb();
  }
}





export const userName = (rule, value, callback) => {
  var reUserName = /^[a-zA-Z][0-9a-zA-Z_]{3,9}$/
  if (!value) {
    return callback(new Error('账号不能为空~'))
  }
  if (!reUserName.test(value)) {
    return callback(new Error('长度在4-10之间，已字母开头，只能包含字符、数字和下划线~'))
  } else {
    const userData = repGetUserName(value)
    userData.then((result) => {
      if (result.data !== null) {
        callback(new Error('用户名已被注册'))
      } else {
        callback()
      }
    })
  }
}

export const pwd = (rule, value, callback) => {
  var pwd = /^[A-Za-z0-9]{6,20}$/
  if (value === '') {
    callback(new Error('请输入密码'))
  }
  if (this.addForm.checkedPwd === true) {
    if (!pwd.test(value)) {
      callback(new Error('密码规则：6-20位字母或数字组合'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

export const confirmPwd = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== this.addForm.pwd) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}


export const pwdAlwaysInput = (rule, value, callback) => {
  if (this.addForm.checkedPwdAlways !== true) {
    if (!value) {
      return callback(new Error('天数不能为空'))
    }
    if (!Number.isInteger(value)) {
      callback(new Error('请输入数字值'))
    } else {
      {
        callback()
      }
    }
  } else {
    callback()
  }
}


export const staffValue = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('必须选择一个员工~'))
  } else {
    callback()
  }
}

export const effectiveDate = (rule, value, callback) => {
  if (this.addForm.checkedUserAlways !== true) {
    if (value === '' || value === null) {
      callback(new Error('必须选择一个时间~'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
export const rolesId = (rule, value, callback) => {
  if (value.length === 0) {
    callback(new Error('必须选择一个角色~'))
  } else {
    callback()
  }
}
