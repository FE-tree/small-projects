//index.js

import api from '../../utils/api.js'
import {
    formatTime
} from '../../utils/util.js'

//获取应用实例
const app = getApp()

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        zhishu: [],
        tabs: [
            { label: '涨幅榜', sort: 'changepercent', asc: 0 },
            { label: '跌幅榜', sort: 'changepercent', asc: 1 },
            { label: '成交额', sort: 'amount', asc: 0 },
            // { label: '涨速榜', sort: 'amount', asc: 0 }
        ],
        tabCur: 0,
        list: []
    },
    onLoad: function () {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }

        this.getTime()
        this.getDpzs()
        this.getRank({
            sort: 'changepercent', 
            asc: 0
        })
    },
    getTime() {
        let weeks = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            date = new Date()
        this.setData({
            time: formatTime(date),
            week: weeks[date.getDay()]
        })
    },
    getDpzs() {
        api.GetStockDpzs({ page: 1, num: 25, node: 'dpzs' }).then(res => {
            // let showlist = ['上证指数', '深证成指', '创业板指', '中小板指', '基金指数', '国债指数'],
            let showlist = ['上证指数', '深证成指', '创业板指', '中小板指'],
                newList = []
            showlist.forEach(key => {
                // console.log(res.filter(item => key.includes(item.name)))
                newList.push(res.filter(item => key.includes(item.name))[0])
            })
            this.setData({
                zhishu: newList
            })
        })
    },
    getRank(data) {
        api.GetRank(data).then(res => {
            this.setData({
                list: res
            })
        })
    },
    changeTab(ev) {
        let data = ev.currentTarget.dataset
        this.setData({
            tabCur: data.index
        })
        this.getRank({
            sort: data.sort, 
            asc: data.asc
        })
    },
    goDetail(e) {
        let data = e.currentTarget.dataset
        wx.setStorageSync('detail', data.item)
        wx.navigateTo({
            url: `/pages/stock/detail/detail`
        })
    },
    searchInput(ev) {

    },
    onReady() {

    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})