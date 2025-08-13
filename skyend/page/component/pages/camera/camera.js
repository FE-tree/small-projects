Page({
    data: {
        src: ''
    },
    onLoad: function() {
        
    },
    takePhoto: function() {
        const ctx = wx.createCameraContext()
        ctx.takePhoto({
            quality: 'high',
            success: (res) => {
                this.setData({
                    src: res.tempImagePath
                })
            }
        })
    },
    error: function(e) {
        console.log(e.detail)
    },
    getLocalImage:function(){
        var that=this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed '],
            sourceType: ['camera'],
            success:function(res){
                var filePath = res.tempFilePaths[0];
                wx.showModal({
                    title: '提示',
                    content: filePath,
                    success: function(res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            },
            fail:function(error){
                console.error("调用本地相册文件时出错")
                console.warn(error)
            },
            complete:function(){

            }
        })
    },
})