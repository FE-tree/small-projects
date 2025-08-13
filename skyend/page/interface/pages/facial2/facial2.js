// page/interface/pages/facial2/facial2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record: false,
    video: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getToken()
    this.setData({
      ctx: wx.createCameraContext('myCamera')
    })
  },

  getToken() {
    let _this = this,
      key = 'KRCXXL090zi5kj7INmQ3u1N9',
      secret = 'G8VQixIVNfY7DSjY5RUeQLyAGqkGcyGi'
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
      success(res) {
        console.log(res.data)
        _this.setData({
          token: res.data.access_token
        })
      }
    })
  },

  recordVideo() {
    let _this = this
    if (this.data.record) {
      this.data.ctx.stopRecord({
        success: (res) => {
          console.log(res);
          _this.setData({
            record: false,
            video: res
          })
        },
        fail: (e) => {
          console.log(e);
        }
      })
    } else {
      this.data.ctx.startRecord({
        success: (res) => {
          console.log(res);
          _this.setData({
            record: true
          })
        },
        fail: (e) => {
          console.log(e);
        }
      })
    }
  },

  facial() {
    wx.showLoading({
      title: '加载中...',
    })
    wx.downloadFile({
      url: this.data.video.tempVideoPath,
      success: function (res) {
        console.log('filePath:', res.tempFilePath);
        let FSM = wx.getFileSystemManager();
        // console.log(FSM.readFileSync(res.tempFilePath, "base64"))
        wx.request({
          method: 'POST',
          url: 'https://aip.baidubce.com/rest/2.0/face/v1/faceliveness/verify',
          data: {
            video_base64: FSM.readFileSync(res.tempFilePath, "base64"),
            session_id: '',
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            wx.hideLoading();
            console.log(res)
          }
        })
      },
      fail() {
        wx.hideLoading();
      }
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