// 格式化后台返回的时间戳  1476113456849
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

// 格式化国际标准时间 Wed Nov 06 2019 10:22:27 GMT+0800 (中国标准时间)
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-') + ' 00:00:00 ' 
}
// 格式化后台返回 2019-11-06T01:58:51.000+0000 的日期
const formatDates = date => {
  const d = new Date(date);
  const month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
  const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
  const hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
  const min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
  const sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
  const times = d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec;
  
  return times;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  formatDates: formatDates
}
