getApp();

var t, e, a, o, s, r = 0, i = [ "rgb(255,255,255)", "rgb(255,255,0)", "rgb(255,0,255)", "rgb(0,255,255)", "rgb(0,255,0)", "rgb(255,0,0)", "rgb(0,0,255)" ], d = [ 25, 20, 10, 5 ], n = [ 80, 100, 180, 150 ], h = [ 1, 2, 3, 4 ], S = [ 30, 40, 50, 60, 70 ];

Page({
    data: {
        tool: 0,
        show: !1,
        mode: 1,
        showMode: !1
    },
    Star: {
        text: "嫁给我吧！",
        colorMode: 1,
        R: 255,
        G: 255,
        B: 255,
        fontSizeMode: 2,
        opt: 1,
        speedMode: 2,
        blink: 25,
        blinkColorMode: 1
    },
    Text: {
        text: "520如果有哪个250在我面前秀恩爱，我就用502把丫嘴黏上，扔205国道去",
        speedMode: 2,
        blink: !0,
        fontSizeMode: 2,
        colorMode: 4,
        blinkColorMode: 4,
        blinkOffset: 30
    },
    onLoad: function() {
        var t = this;
        a = wx.getSystemInfoSync().screenWidth, e = wx.getSystemInfoSync().screenHeight, 
        o = e, t.setData({
            W: a,
            H: e,
            CH: o
        });
    },
    onShow: function() {
        var t = this;
        wx.getStorageSync("mode") && t.setData({
            mode: wx.getStorageSync("mode")
        }), wx.getStorageSync("Text") && (t.Text = JSON.parse(wx.getStorageSync("Text"))), 
        wx.getStorageSync("Star") && (t.Star = JSON.parse(wx.getStorageSync("Star"))), wx.setKeepScreenOn({
            keepScreenOn: !0
        }), t.setModeFunc(), t.update();
    },
    onHide: function() {
        wx.setStorageSync("mode", this.data.mode), wx.setStorage({
            key: "Star",
            data: JSON.stringify(that.Star)
        }), wx.setStorage({
            key: "Text",
            data: JSON.stringify(that.Text)
        });
    },
    setModeFunc: function() {
        var e = this;
        console.log("update mode=", e.data.mode), 1 == e.data.mode && (e.setData({
            Text: e.Text
        }), t = e.updateText), 2 == e.data.mode && (e.setData({
            Star: e.Star
        }), t = e.updateStar);
    },
    update: function() {
        var e = this;
        if (clearInterval(s), e.data.show || e.data.showMode) console.log("canvas update pasued"); else {
            r = 0;
            var a = 0, o = 0;
            if (1 == e.data.mode) o = e.Text.speedMode, a = d[o - 1]; else {
                if (2 != e.data.mode) return void e.data.mode;
                o = e.Star.speedMode, a = d[o - 1];
            }
            console.log("speedMode", o, d[o - 1]), s = setInterval(function() {
                t(), r++;
            }, a);
        }
    },
    blinkColorSelect: function(t) {
        var e = this;
        console.log("blinkColorSelect mode - >", e.data.mode), 1 == e.data.mode && (e.Text.blinkColorMode = t.currentTarget.dataset.blinkcolormode), 
        2 == e.data.mode && (e.Star.blinkColorMode = t.currentTarget.dataset.blinkcolormode), 
        e.setModeFunc();
    },
    colorSelect: function(t) {
        var e = this, a = t.currentTarget.dataset.colormode;
        1 == e.data.mode && (e.Text.colorMode = a), 2 == e.data.mode && (e.Star.colorMode = a), 
        e.setModeFunc();
    },
    fontSizeSelect: function(t) {
        var e = this, a = t.currentTarget.dataset.fontsizemode;
        1 == e.data.mode && (e.Text.fontSizeMode = a), 2 == e.data.mode && (e.Star.fontSizeMode = a), 
        e.setModeFunc();
    },
    speedSelect: function(t) {
        var e = this, a = t.currentTarget.dataset.speedmode;
        1 == e.data.mode && (e.Text.speedMode = a), 2 == e.data.mode && (e.Star.speedMode = a), 
        e.setModeFunc();
    },
    modeSelect: function(t) {
        var a = this, o = t.currentTarget.dataset.mode;
        1 != o && 2 != o && 3 != o || (o != a.data.mode && a.setData({
            mode: o
        }), a.setData({
            showMode: !1,
            CH: e
        }), a.setModeFunc(), a.update());
    },
    inputText: function(t) {
        var e = this, a = t.detail.value;
        e.Text.text = a, e.setModeFunc();
    },
    clearText: function() {
        var t = this;
        t.Text.text = "", t.setData({
            Text: t.Text
        }), t.setModeFunc();
    },
    inputTextForStar: function(t) {
        var e = this, a = t.detail.value;
        e.Star.text = a, e.setModeFunc();
    },
    showMode: function() {
        var t = this;
        t.data.show ? wx.showToast({
            title: "请完成设置"
        }) : (t.setData({
            showMode: !t.data.showMode
        }), t.data.showMode ? this.setData({
            CH: e - 120 - 30
        }) : this.setData({
            CH: e
        }), t.setModeFunc(), t.update());
    },
    show: function() {
        var t = this;
        console.log("show click", this.data.show), t.data.showMode ? wx.showToast({
            title: "请选择模式"
        }) : (this.setData({
            show: !this.data.show
        }), this.data.show || this.setData({
            tool: 0,
            CH: e
        }), 1 == t.data.mode && this.data.show && this.setData({
            CH: e - 250 - 30
        }), 2 == t.data.mode && this.data.show && this.setData({
            CH: e - 250 - 30
        }), 3 == t.data.mode && this.data.show && this.setData({
            CH: e - 250 - 30
        }), t.update());
    },
    updateStar: function() {
        var t = wx.createCanvasContext("myCanvas");
        t.clearRect(0, 0, a, o), t.translate(a / 2, o / 2), t.rotate(90 * Math.PI / 180), 
        t.setTextBaseline("middle"), t.setTextAlign("center");
        if (1 == this.Star.opt) {
            e = S[this.Star.speedMode - 1];
            1 == this.Star.blinkColorMode && (this.Star.R = 255, this.Star.G = 255, this.Star.B -= e), 
            2 == this.Star.blinkColorMode && (this.Star.G -= e, this.Star.R = 255, this.Star.B = 255), 
            3 == this.Star.blinkColorMode && (this.Star.R -= e, this.Star.B = 255, this.Star.G = 255), 
            4 == this.Star.blinkColorMode && (this.Star.R -= e, this.Star.B -= e, this.Star.G = 255), 
            5 == this.Star.blinkColorMode && (this.Star.G -= e, this.Star.B -= e, this.Star.R = 255), 
            6 == this.Star.blinkColorMode && (this.Star.G -= e, this.Star.R -= e, this.Star.B = 255);
        }
        if (-1 == this.Star.opt) {
            var e = S[S.length - this.Star.speedMode];
            1 == this.Star.blinkColorMode && (this.Star.B += e, this.Star.R = 255, this.Star.G = 255), 
            2 == this.Star.blinkColorMode && (this.Star.G += e, this.Star.R = 255, this.Star.B = 255), 
            3 == this.Star.blinkColorMode && (this.Star.R += e, this.Star.G = 255, this.Star.B = 255), 
            4 == this.Star.blinkColorMode && (this.Star.R += e, this.Star.B += e, this.Star.G = 255), 
            5 == this.Star.blinkColorMode && (this.Star.G += e, this.Star.B += e, this.Star.R = 255), 
            6 == this.Star.blinkColorMode && (this.Star.G += e, this.Star.R += e, this.Star.B = 255);
        }
        (this.Star.R < 0 || this.Star.G < 0 || this.Star.B < 0) && (this.Star.opt = -1), 
        (this.Star.R > 255 || this.Star.G > 255 || this.Star.B > 255) && (this.Star.opt = 1);
        var s = "rgb(" + this.Star.R + "," + this.Star.G + "," + this.Star.B + ")";
        t.setFontSize(n[this.Star.fontSizeMode - 1]), t.setShadow(0, 0, this.Star.blink, s), 
        t.setFillStyle(i[this.Star.colorMode]), t.fillText(this.Star.text, 0, 0), t.draw();
    },
    updateText: function() {
        var t = wx.createCanvasContext("myCanvas"), s = this, d = r * h[this.Text.speedMode - 1];
        t.clearRect(0, 0, a, o), t.translate(a / 2, o / 2), t.rotate(90 * Math.PI / 180), 
        t.setFillStyle(i[this.Text.colorMode]), t.setTextBaseline("middle"), t.setTextAlign("left"), 
        t.setFontSize(n[this.Text.fontSizeMode - 1]), -1 != s.Text.blinkColorMode && t.setShadow(0, 0, this.Text.blinkOffset, i[s.Text.blinkColorMode]);
        var d = e / 2 - d, S = t.measureText(this.Text.text);
        d < -1 * (e / 2 + S.width) && (r = 0), t.fillText(this.Text.text, d, 0), t.fill(), 
        t.draw();
    }
});