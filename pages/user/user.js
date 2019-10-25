//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    domain: '',  // 域名
    score: '',
    cost: '',
    userId: [],
    nickName: [],
    head: [],
    signin: "已签到"
  },
  // 点击跳转关于我们
  Aboutus() {
    wx.navigateTo({
      url: '/pages/About-us/About-us',
    })
  },
  // 点击跳转派单服务
  interests() {
    wx.navigateTo({
      url: '/pages/interests/interests',
    })
  },
  // 点击跳转我的推荐
  myRecommend() {
    wx.navigateTo({
      url: '/pages/myRecommend/myRecommend',
    })
  },
  // 点击跳转名片认证
  identity() {
    wx.navigateTo({
      url: '/pages/identity/identity',
    })
  },
  // 点击跳转积分
  integral() {
    wx.navigateTo({
      url: '/pages/integral/integral',
    })
  },
  // 点击余额部分跳转
  asset() {
    wx.navigateTo({
      url: '/pages/assets/assets',
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function () {
    // 获取昵称
    var that = this;
    wx.getStorage({
      key: 'nickName',
      success: function (res) {
        var nickName = res.data
        that.setData({
          nickName: nickName,
          loading: true
        })

      }
    })
    // 获取头像
    wx.getStorage({
      key: 'head',
      success: function (res) {
        console.log(res)
        var head = res.data
        console.log(head)
        that.setData({
          head: head
        })

      }
    })

    this.setData({
      domain: app.globalData.domain
    })
    var domain = this.data.domain;
    var that = this;


    //获取积分和余额

    wx.getStorage({
      key: 'userId',
      success: function (res) {
        console.log(res)
        var userId = res.data
        that.setData({
          userId: userId
        })
        wx.request({
          url: domain + '/applet/applet/getappletuserscore',
          method: "POST",
          data: {
            userId: userId
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res)
            that.setData({
              cost: res.data.data.cost,
              score: res.data.data.score
            })
          }
        })
      }
    })
    this.signInPd();

  },
  onLoad: function () {
    this.signInPd();
    
  },
  //vip触发事件
  vipPays: function () {
    wx.showToast({
      title: '请充值VIP',
      icon: 'success!',
      duration: 2000,
    })
    wx.navigateTo({
      url: '/pages/interests/interests'
    })
  },
  usersignin: function () {
    this.setData({
      domain: app.globalData.domain
    })
    var domain = this.data.domain;
    var that = this
    console.log("签到事件");
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        console.log(res)
        var userId = res.data
        that.setData({
          userId: userId
        })
        wx.request({
          url: domain + '/applet/applet/adduserscriptlogbysignin',
          method: "POST",
          data: {
            userId: userId
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res.data.data.state)
            if (res.data.data.state === "2") {
              wx.showToast({
                title: '你已签到',
                icon: 'none'
              })
              this.data.signin = "已签到";
              that.onShow();
            } else {
              wx.showToast({
                title: '签到成功',
                icon: 'none'
              })
              that.onShow();
              this.data.signin = "已签到";
            }
          }
        })
      }
    })
  },
  signInPd: function () {
    this.setData({
      domain: app.globalData.domain
    })
    var domain = this.data.domain;
    var that = this
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        console.log(res)
        var userId = res.data
        that.setData({
          userId: userId
        })
        wx.request({
          url: domain + '/applet/applet/getuserscriptlogbysigninpd',
          method: "POST",
          data: {
            userId: userId
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res.data.data.state)
            if (res.data.data.state === "2") {
              console.log("okk");
              that.setData({
                signin: '已签到'
              })
              // that.onShow();
            } else {
              console.log("s");
              that.setData({
                signin: '签到'
              })
            }
          }
        })
      }
    })
  }
})
