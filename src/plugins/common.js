import OSS from 'ali-oss'
/*
*
* 手机号
* GZ
* */
function isPhone (tel) {
  return !!tel.toString().match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
}
/*
*
* 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
* GZ
*
* */
 function isCardNo(card){

   return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(card.toString());

 }

/*
*
*
* OSS 配置
* */

function OSSConfig() {
  return new OSS({
    region:"oss-cn-hangzhou",
    accessKeyId: 'LTAIWdQJ7wCZeAe3',
    accessKeySecret: 'TJvqnChNIqOUREaCb8VPmVZoKUMhSZ',
    // stsToken: '',
    bucket: 'carbinet'
  })

}




/*
*
* 时间大小对比
* */
function TimeSzie(first,last) {
  let datasTime = new Date(first).getTime()
  let valueTime = new Date(last).getTime()
  if(datasTime > valueTime) {
    return true
  }
  return false
}

/*
*
* 数字校验
*
* */

function isNumber(data) {
  return /.*\d.*/.test(data)
}


/*
*
* 中文匹配
* */

function isChinese(data) {
  return /[\u4e00-\u9fa5]/.test(data)
}

/*
*
* 中文与字母匹配
* */
function isW(data) {
  return /^[a-zA-Z\u4e00-\u9fa5]+$/.test(data)
}

/*
* 数字字母匹配
*
* */
function isNumber_AZ(data) {
  return /^[a-zA-Z\d]+$/.test(data)
}

/*数字小数点校验*/
function circleNumber(data) {
  return /^\d+(\.\d+)?$/.test(data)
}

 export {
  isPhone,
   isCardNo,
   OSSConfig,
   TimeSzie,
   isNumber,
   isChinese,
   isW,
   isNumber_AZ,
   circleNumber,

}

