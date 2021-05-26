'use strict';
exports.main = async (event, context) => {
  try {
    const res = await uniCloud.sendSms({
      //smsKey、smsSecret值为开通
      smsKey: 'c1a796526964331315f9a3c2428a5bab', 
      smsSecret: 'a48fa01db12498d5e7e941a8c9067bd7',
      phone: event.phone, // 为验证码的接收者号码
      templateId: '11994', // 短信模板id
	  name: '小简打车', // 请注意使用自行申请的模板时必须传name字段，值为报备时填写的应用名称
      data: {
        code: event.code, // 测试的验证码，可自定义
        action: '登录', // 表明用途
        expMinute: '3', // 有效时间 单位分钟
      }
    })
    // 调用成功，请注意这时不代表发送成功
    return res
  } catch(err) {
    // 调用失败
    console.log(err.errCode)
    console.log(err.errMsg)
    return {
      code: err.errCode,
      msg: err.errMsg
    }
  }
};
