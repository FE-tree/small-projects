Page({
    data: {
        
    },
    onLoad: function() {
    	// version 1.7.0+才有
       	// var livePusher = wx.createLivePusherContext()
       	// console.log(livePusher)
        wx.getSetting({
          success: (res) => {
            console.log(res)
            /*
             * res.authSetting = {
             *   "scope.userInfo": true,
             *   "scope.userLocation": true
             * }
             */
          }
        })
    },
    statechange: function(e) {
	    console.log('live-player code:', e.detail.code)
        this.setData({
            txt: JSON.stringify(e.detail)
        })
	},
	error: function(e) {
	    console.error('live-player error:', e.detail.errMsg)
	},
	statechange2: function(e) {
    	console.log('live-pusher code:', e.detail.code)
        this.setData({
            txt2: JSON.stringify(e.detail)
        })
  	}
})