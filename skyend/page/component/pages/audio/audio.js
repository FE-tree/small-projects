Page({
    data: {
        current: {
            poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
            name: '此时此刻',
            author: '许巍',
            src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46'
        },
        audioAction: {
            method: 'pause'
        },
        poster: 'http://p1.music.126.net/_LNk7rEEBSdAcnyHL8zi6Q==/109951163093399018.jpg?param=90y90',
        name: '123我爱你',
        author: '新乐尘符',
        src: 'http://isure.stream.qqmusic.qq.com/C400002WqezQ4dmIeT.m4a?vkey=7B2FC95210F448AD9189FD94FAD12A553EEDAE3B29A3CD3BF174E3CBD7A70A79F73606E96897C6D743F0B667D9DF38362195202F9A977F8B&guid=3407114240&uin=463210773&fromtag=66',
        time: '00:00/00:00',
        progress: 0,
        action: false
    },
    onReady: function (e) {
        this.audioCtx = wx.createAudioContext('myAudio')
    },
    audioPlay: function() {
        this.audioCtx.play()
        this.setData({
            action: true
        })
    },
    audioPause: function() {
        this.audioCtx.pause()
        this.setData({
            action: false
        })
    },
    audio30: function() {
        this.audioCtx.seek(30)
    },
    audioStart: function() {
        this.audioCtx.seek(0)
    },
    isPlay: function() {
        !this.data.action==true ? this.audioCtx.play() : this.audioCtx.pause();
        this.setData({
            action: !this.data.action
        })
    },
    timeUpdate: function(ev) {
        var timeStr = this.getTime(ev.detail.currentTime) + '/' + this.getTime(ev.detail.duration);
        var progressStr = (ev.detail.currentTime / ev.detail.duration * 100).toFixed(2);
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