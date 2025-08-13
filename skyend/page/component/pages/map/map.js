Page({
    data: {
        latitude: 23.099994,
        longitude: 113.32452,
        markers: [{
            latitude: 23.099994,
            longitude: 113.32452,
            name: 'T.I.T 创意园'
        }],
        covers: [{
                latitude: 23.099994,
                longitude: 113.34452,
                iconPath: '/images/location.png'
            },
            {
                latitude: 23.099994,
                longitude: 113.30452,
                iconPath: '/images/location.png'
            }
        ]
    },
    onLoad: function() {
        var that = this;
        wx.getLocation({
            type: 'gcj02', //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标    
            success: function(res) {
                console.log(res)
                that.setData({
                    latitude: res.latitude,
                    longitude: res.longitude,
                    markers: [{
                        latitude: res.latitude,
                        longitude: res.longitude,
                        name: '科韵路？？？'
                    }]
                });
                
            }
        })
    }
})