//获取应用实例
var app = getApp()
Page({
    data: {
        // 页面配置
        winWidth: 0,
        winHeight: 0,
        // tab切换
        currentTab: 0,
        tabNav: ['哈哈', '呵呵', '嘿嘿'],
        tabContent: [{
            text: '我是哈哈',
            color: '#FF6347'
        }, {
            text: '我是呵呵',
            color: '#C1FFC1'
        }, {
            text: '我是嘿嘿嘿嘿嘿',
            color: '#98F5FF'
        }],
    },
    onLoad: function() {
        var that = this;
        // 获取系统信息
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight
                });
            }
        });
    },
    // 滑动切换tab
    bindChange: function(e) {
        // console.log(e, e.detail, e.detail.current)
        var that = this;
        that.setData({ currentTab: e.detail.current });
    },
    // 点击tab切换
    swichNav: function(e) {
        // console.log(e, e.detail, e.detail.current, e.target.dataset.current)
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    }
})