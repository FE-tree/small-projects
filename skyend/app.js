//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    let host = '';
    console.log('env', __wxConfig.envVersion);
    let ve = __wxConfig.envVersion;
    switch (ve) {
      case 'develop':
        host = 'https://开发版环境域名';
        break;
      case 'trial':
        host = 'https://体验版环境域名';
        break;
      case 'release':
        host = 'https://正式版环境域名';
        break;
      default:
        host = 'https://测试版环境域名';
    }
    console.log(host)
  },
  globalData: {
    userInfo: null,
    baiduapikey: 'KRCXXL090zi5kj7INmQ3u1N9',
    baidusecretkey: 'G8VQixIVNfY7DSjY5RUeQLyAGqkGcyGi'
  }
})