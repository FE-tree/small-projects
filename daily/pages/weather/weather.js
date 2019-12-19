// pm2.5 浓度对应的指数等级
// 0-50 优
// 50-100 良
// 100-150 轻度污染：对敏感人群不健康
// 150-200 中度污染：不健康
// 200-300 重度污染：非常不健康
// 300-500 严重污染：有毒物
// 500以上 爆表：有毒物

let bmap = require('../../libs/bmap-wx.min.js')
let globalData = getApp().globalData
let utils = require('../../utils/util')
Page({
    data: {
        curWeather: '',
        listWeather: '',
        icons: ['/images/clothing.png', '/images/carwashing.png', '/images/pill.png', '/images/running.png', '/images/sun.png'],
    },
    onLoad: function() {
        wx.getLocation({
            type: 'gcj02', //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标    
            success: function (res) {
                console.log(res)
            }
        })

        this.init()
    },
    init(params) {
        let BMap = new bmap.BMapWX({
            ak: globalData.ak,
        })
        BMap.weather({
            location: params ? params.location : '',
            fail: this.fail,
            success: this.success,
        })
    },
    fail(data) {
        console.log('fail:', data)
    },
    success(data) {
        console.log('success:', data)
        var curWeather = data.currentWeather[0]
        // 当天实时温度
        curWeather.temperature = curWeather.date.match(/\d+/g)[2]
        curWeather.pm25 = this.calcPM(curWeather.pm25)
        let now = new Date()
        // 存下来源数据
        curWeather.updateTime = now.getTime()
        curWeather.updateTimeFormat = utils.formatDate(now, "MM-dd hh:mm")
        this.setData({
            curWeather: data.currentWeather[0],
            listWeather: data.originalData
        })
    },
    calcPM(value) {
        if (value > 0 && value <= 35) {
            return {
                val: value,
                desc: '优',
                detail: '',
                color: '#40c057'
            }
        } else if (value > 35 && value <= 75) {
            return {
                val: value,
                desc: '良',
                detail: '',
                color: '#82c91e'
            }
        } else if (value > 75 && value <= 115) {
            return {
                val: value,
                desc: '轻度污染',
                detail: '对敏感人群不健康',
                color: '#FFD700'
            }
        } else if (value > 115 && value <= 150) {
            return {
                val: value,
                desc: '中度污染',
                detail: '不健康',
                color: '#f76707'
            }
        } else if (value > 150 && value <= 250) {
            return {
                val: value,
                desc: '重度污染',
                detail: '非常不健康',
                color: '#FF7256'
            }
        } else if (value > 250 && value <= 500) {
            return {
                val: value,
                desc: '严重污染',
                detail: '有毒物',
                color: '#FF0000'
            }
        } else if (value > 500) {
            return {
                val: value,
                desc: '爆表',
                detail: '能出来的都是条汉子',
                color: '#000'
            }
        }
    },
})