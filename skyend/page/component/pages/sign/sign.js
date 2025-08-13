// page/component/pages/sign/sign.js

var ctx = null;
var touchs = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    signImage: ''
  },

  // 画布的触摸移动开始手势响应
  start: function (event) {
    // console.log("触摸开始" + event.changedTouches[0].x);
    // console.log("触摸开始" + event.changedTouches[0].y);
    //获取触摸开始的 x,y
    let point = { x: event.changedTouches[0].x, y: event.changedTouches[0].y }
    touchs.push(point);
  },
  // 画布的触摸移动手势响应
  move: function (e) {
    let point = { x: e.touches[0].x, y: e.touches[0].y }
    touchs.push(point);
    if (touchs.length >= 2) {
      this.draw(touchs);
    }
  },
  // 画布的触摸移动结束手势响应
  end: function (e) {
    console.log("触摸结束", e);
    //清空轨迹数组
    for (let i = 0; i < touchs.length; i++) {
      touchs.pop();
    }
  },
  // 画布的触摸取消响应
  cancel: function (e) {
    console.log("触摸取消" + e);
  },
  // 画布的长按手势响应
  tap: function (e) {
    console.log("长按手势" + e);
  },
  error: function (e) {
    console.log("画布触摸错误" + e);
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    ctx = wx.createCanvasContext('sign'); //获得Canvas的上下文
    ctx.setStrokeStyle("#000"); //设置线的颜色
    ctx.setLineWidth(3); //设置线的宽度
    ctx.setLineCap('round'); //设置线两端端点样式更加圆润
    ctx.setLineJoin('round'); //设置两条线连接处更加圆润
  },
  //绘制
  draw: function (touchs) {
    let point1 = touchs[0];
    let point2 = touchs[1];
    touchs.shift();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.stroke();
    ctx.draw(true);
  },
  //清除操作
  clearClick: function () {
    //清除画布
    let w = wx.getSystemInfoSync().windowWidth
    ctx.clearRect(0, 0, w, w * 0.6);
    ctx.draw(true);
    // touchs = []
    // this.setData({
    //   signImage: ''
    // })
  },
  //保存图片
  saveClick: function () {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'sign',
      success: function (res) {
        //打印图片路径
        console.log(res.tempFilePath);
        //设置保存的图片
        that.setData({
          signImage: res.tempFilePath
        })
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