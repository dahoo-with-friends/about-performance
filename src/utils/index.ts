/* eslint-disable no-undef */
import { message } from 'antd'

// 删除cookie
export function deleteCookie() {
  document.cookie = 'token='
}

// 日志记录
export function logger(level: string, msg: any) {
  switch (level) {
    case 'error':
      console.error(new Date(), JSON.stringify(msg))
      break
    case 'warn':
      console.warn(new Date(), JSON.stringify(msg))
      break
    case 'log':
      console.log(new Date(), JSON.stringify(msg))
      break
  }
}

// 读取cookie
export function getCookie() {
  const cookies = document.cookie.split(';')
  let cookie: any
  cookies.forEach((item) => {
    if (item.split('=')[0].trim() == 'token') {
      cookie = item.split('=')[1]
    }
  })
  return cookie
}

// 校验当前用户是否开启权限
export function getUserMedia() {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        resolve(stream)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// 检查 value 是不是函数
export function isFunction(value: any) {
  return Object.prototype.toString.call(value) === '[object Function]'
}

// 把对象转换成url参数
export function setUrlParams(params: any) {
  if (Object.prototype.toString.call(params) === '[object Object]') {
    let str = ''
    Object.keys(params).forEach((item, index) => {
      if (index == 0) {
        str += `?${item}=${params[item]}`
      } else {
        str += `&${item}=${params[item]}`
      }
    })
    return str
  }
}

// 检查 value 是否为有效的类数组长度
export function isLength(value: any) {
  return (
    typeof value == 'number' &&
    value > -1 &&
    value % 1 == 0 &&
    value <= Number.MAX_SAFE_INTEGER
  )
}

// 检查 value 是否是类数组
export function isArrayLike(value: any) {
  return value != null && isLength(value.length) && !isFunction(value)
}

// 检测数据是不是除了symbol外的原始数据
export function isStatic(value: any) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'undefined' ||
    value === null
  )
}

// 判断数据是不是Object类型的数据
export function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

// 检查 value 是否为空
export function isEmpty(value: any) {
  if (value == null) {
    return true
  }
  if (isArrayLike(value)) {
    return !value.length
  } else if (isPlainObject(value)) {
    for (const key in value) {
      if (window.hasOwnProperty.call(value, key)) {
        return false
      }
    }
    return true
  }
  return false
}

// /获取url中的参数
export function getQueryString() {
  const href = window.location.href
  const sub = href.lastIndexOf('?')
  const url = href.substr(sub + 1)
  const result: any = {}
  const param = /([^?=&]+)=([^&]+)/gi
  let match: any
  while ((match = param.exec(url)) !== null) {
    result[match[1]] = match[2]
  }
  return result
}
