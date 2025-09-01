// pages/detail/detail.js

import api from '../../../utils/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: '',
    nav: ['分时', '日K', '周K', '月K'],
    tabCur: 0,
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
    })
    let info = wx.getStorageSync('detail')
      info.volume = this.formatNum(info.volume)
      info.amount = this.formatNum(info.amount)
      this.setData({
        info,
        color: info.pricechange > 0 ? 'red' : info.pricechange < 0 ? 'green' : 'blue'
      })
  },

  formatNum(num) {
    if(num>100000000) {
      return (num/100000000).toFixed(2) + '亿'
    } else if(num>10000) {
      return (num/10000).toFixed(2) + '万'
    } else {
      return num
    }
  },

  tabSelect(e) {
    let data = e.currentTarget.dataset
    this.setData({
      tabCur: data.index
    })
  },

  tabImage() {
    let urls = [
      'http://image.sinajs.cn/newchart/min/n/sh000001.gif',
      'http://image.sinajs.cn/newchart/daily/n/sh000001.gif',
      'http://image.sinajs.cn/newchart/weekly/n/sh000001.gif',
      'http://image.sinajs.cn/newchart/monthly/n/sh000001.gif'
    ]
    wx.previewImage({
      current: urls[this.data.tabCur],
      urls
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