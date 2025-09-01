// pages/gold/gold.js

import api from '../../utils/api.js'
import { formatData } from '../../utils/util.js'

const dic = {
  'AG99.9': 'Ag99.9',
  'AG99.99': 'Ag99.99',
  'AG9999': '白银9999',
  'AGTD': '白银延期',
  'AU100': '沪金100G',
  'AU100G': 'Au100g',
  'AU50G': '沪 条50G',
  'AU99.99': '沪金9999',
  'AU995': '黄金995',
  'AU9995': '沪  金95',
  'AU9999': '沪  金99',
  'AUTD': '黄金延期',
  'AUTN06': '纽约金TN06',
  'AUTN1': '延期单金',
  'AUTN12': '纽约金TN12',
  'AUTN2': '延期双金',
  'IAU100G': 'I黄金100G',
  'IAU99.5': 'I黄金995',
  'IAU99.99': 'I黄金9999',
  'MAUTD': 'M黄金延期',
  'NYAUTN06': 'NYAUTN06',
  'NYAUTN12': 'NYAUTN12',
  'PGC30G': '熊猫金币30G',
  'PT99.95': 'Pt99.95',
  'PT9995': '沪  铂95',
  'SHAG': '上海银',
  'SHAU': '上海金',
}

// var 代码="代码，品种,显示名称，最新价，均价，昨日均价，开盘价，最高价，最低价，昨收价,买价，卖价，买入量，卖出量，总成交量，总成交额，更新时间，涨跌幅"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dic,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStock()
  },

  getStock() {
    api.GetStockInfo('SGE_AG99_9,SGE_AG99_99,SGE_AG9999,SGE_AGTD,SGE_AU100,SGE_AU100G,SGE_AU50G,SGE_AU99_99,SGE_AU995,SGE_AU9995,SGE_AU9999,SGE_AUTD,SGE_AUTN06,SGE_AUTN1,SGE_AUTN12,SGE_AUTN2,SGE_IAU100G,SGE_IAU99_5,SGE_IAU99_99,SGE_MAUTD,SGE_NYAUTN06,SGE_NYAUTN12,SGE_PGC30G,SGE_PT99_95,SGE_PT9995,SGE_SHAG,SGE_SHAU').then(res => {
      let data = formatData(res)
      data.map((item, i) => {
        if(item[17]!='--' && item[17]!='') {
          data[i][18] = item[17].replace('%', '')
        }
      })
      
      this.setData({
        list: data
      })
    })
  },

  goDetail(e) {
    let data = e.currentTarget.dataset
    let arr = data.item
    wx.setStorageSync('detail', {
      "symbol": arr[0],
      "name": arr[1],
      "trade": arr[3],
      "pricechange": arr[18] || arr[17],
      "changepercent": arr[3] - arr[9],
      "buy": arr[10],
      "sell": arr[11],
      "settlement": arr[5],
      "open": arr[6],
      "high": arr[7],
      "low": arr[8],
      "volume": arr[14],
      "amount": arr[15],
      "code": arr[0],
      "ticktime": arr[16]
    })
    wx.navigateTo({
        url: '/pages/stock/detail/detail?type=gold'
    })
},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})