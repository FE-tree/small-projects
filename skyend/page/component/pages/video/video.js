//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        time: '00:00/00:00',
        progress: 0,
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    // 生命周期函数--监听页面初次渲染完成
    onReady: function() {
        //获得dialog组件
        this.dialog = this.selectComponent("#dialog");
    },
    onLoad: function() {
        this.videoCtx = wx.createVideoContext('myVideo');
    },
    play() {
        this.videoCtx.play()
    },
    pause() {
        this.videoCtx.pause()
    },
    timeUpdate(ev) {
        var timeStr = this.getTime(ev.detail.currentTime) + '/' + this.getTime(ev.detail.duration);
        var progressStr = (ev.detail.currentTime / ev.detail.duration * 100).toFixed(2) + '%';
        this.setData({
            time: timeStr,
            progress: progressStr
        })
    },
    getTime(time) {
        var old_time = time;
        var m = parseInt(old_time/60);
        if (m<10) m = '0' + m;
        var s = parseInt(old_time%60);
        if (s<10) s = '0' + s;
        return m + ':' + s;
    }
})