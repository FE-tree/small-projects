
import qs from '../libs/qs'

let header = {
  // 'content-type': 'application/json'
  'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
}

function httpRequest(method, url, data, config) {
  let promise = new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      method: method,
      header: config ? config : header,
      data: data,
      success: function(res) {
        // console.log('返回结果：', res.data)
        resolve(res.data)
      },
      fail: function(err) {
        wx.showModal({
          content: '网络错误，请刷新重试',
          content: JSON.stringify(res),
          showCancel: false
        })
        reject(false)
      },
      complete: function() {
        wx.hideLoading();
      }
    })
  });
  return promise
}

// 抛出请求
const http = httpRequest

/*
* 新浪接口
*/

const host = 'http://vip.stock.finance.sina.com.cn/quotes_service/api/json_v2.php/'
const node = {}

// 获取股票数据接口（根据股票代码）
const GetStockInfo = (code) => { // 新浪
  return http('get', 'http://hq.sinajs.cn/rn='+Date.now()+'&list=' + code)
}

// 获取排行榜
const GetRank = (data) => {
  return http('get', host + 'Market_Center.getHQNodeDataSimple?page=1&num=10&sort=' + data.sort + '&asc=' + data.asc + '&node=hs_a&_s_r_a=init')
}

// 获取分类菜单
const GetMenu = () => {
  return http('get', host + 'Market_Center.getHQNodes')
}
// 获取大盘指数
const GetStockDpzs = (data) => {
  return http('get', host + `Market_Center.getHQNodeDataSimple?page=${data.page}&num=${data.num}&sort=symbol&asc=1&node=${data.node}&_s_r_a=init`)
}
// 获取深/泸股列表
const GetStockList = (data) => {
  return http('get', host + `Market_Center.getHQNodeData?page=${data.page}&num=${data.num}&sort=symbol&asc=1&node=${data.node}&symbol=&_s_r_a=init`)
}

const api = {
  GetStockInfo,
  GetRank,
  GetStockDpzs,
  GetStockList
}

export default api

