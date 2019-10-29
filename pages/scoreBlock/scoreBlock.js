
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,// 加载数据
    domain: '',// 域名
    openId: '',
    real_name_score: "1000",  //实名认证积分
    identity_score: "1000",  //身份认证积分
    recommend_customer_score: "1000",  //推荐客户积分
    recommend_friend_score: "",  //邀请好友积分
    business_check_status: "",  //身份认证状态
    first_invite: "",  //首次邀请状态
    first_recommend: "",  //首次推荐状态
    id_card_check_status: "",  //实名认证状态
    sign_num: "",  //签到天数
    sign_score: "",  //当天签到积分
    score: "",  //我的积分总和
    sign_status: '', //签到状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      domain: app.globalData.domain
    })
    this.signInPd();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var domain = this.data.domain;
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        var userId = res.data
        that.setData({
          userId: userId
        })
        wx.request({
          url: domain + '/applet/applet/getappletuservippdgradeidpd',
          method: "POST",
          data: {
            userId: userId
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res)
            var status = res.data.code;
            if (status == 200) {
              
              that.setData({
                business_check_status: res.data.data.businessCardCheckStatus,
                id_card_check_status: res.data.data.idCardCheckStatus
              })
            }
          }
        })
      }
    })
  },

  

  

  

  

  

  /**
   * 签到
   */
  signIn: function () {
    var openId = this.data.openId;
    var domain = this.data.domain;
    var that = this;
    if (openId != '') {
      that.setData({
        loading: false
      })
      wx.request({
        url: domain + '/Home/Index/userSign',
        data: {
          openid: openId
        },
        success: function (res) {
          var status = res.data.status;
          if (status == 7) {
            that.setData({
              score: res.data.data.score,
              sign_status: 1,
              loading: true
            })
            wx.showToast({
              title: '签到成功',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  },
  
  /**
   * 点击跳转
   */
  skipRecommend: function () {
    wx.navigateTo({
      url: '/pages/recommend/recommend',
    })
  },

  skipScoreExchange: function () {
    wx.navigateTo({
      url: '/pages/scoreExchange/scoreExchange',
    })
  },

  skipRuleDescription: function () {
    wx.navigateTo({
      url: '/pages/aboutUs/aboutUs?type=5',
    })
  },
  signIn: function () {
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
              that.setData({
                sign_status: 1
              })
              // that.onShow();
            } else {
              wx.showToast({
                title: '签到成功',
                icon: 'none'
              })
              that.setData({
                sign_status: 1
              })
              // that.onShow();
            }
          }
        })
      }
    })
  },
  tomessage:function(){
    wx.navigateTo({
      url: '/pages/invite/invite',
    })
  },
  signInPd: function () {
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
                sign_status : 1
              })
              // that.onShow();
            } else {
              that.setData({
                sign_status: 0
              })
            }
          }
        })
      }
    })
  }
})
