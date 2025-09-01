// pages/stock/stock.js

import api from '../../utils/api.js'

const app = getApp();
let timer = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    nav: [{
      label: '指数',
      node: 'dpzs'
    }, {
      label: '深股',
      node: 'sgt_sz'
    }, {
      label: '泸股',
      node: 'hgt_sh'
    }],
    tabCur: 0,
    params: {
      page: 1,
      num: 25,
      node: 'dpzs'
    },
    list: [],
    pageEnd: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStockList(this.data.params)
  },

  getStockList(params) {
    api[this.data.tabCur==0 ? 'GetStockDpzs' : 'GetStockList' ](params).then(res => {
      console.log(res)
      this.setData({
        list: this.data.list.length==0 ? res : this.data.list.concat(res)
      })
      if(res.length<this.data.params.num) {
        this.setData({
          pageEnd: true
        })
      }
    })    
  },

  tabSelect(e) {
    let data =e.currentTarget.dataset
    this.setData({
      tabCur: data.id,
      'params.page': 1,
      'params.node': data.node,
      list: [],
      pageEnd: false
    })
    this.getStockList(this.data.params)
  },

  goDetail(e) {
    let data = e.currentTarget.dataset
    wx.setStorageSync('detail', data.item)
    wx.navigateTo({
      url: `/pages/stock/detail/detail?type=${data.type}`
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
    if(!this.data.pageEnd) {
      this.setData({
        'params.page': this.data.params.page+1
      })
      this.getStockList(this.data.params)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})