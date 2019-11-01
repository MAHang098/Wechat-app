// pages/integral/integral.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: '',  // 域名
    score: '',
    userId: []
  },
  // 点击积分退换
  scoreExchange() {
    wx.navigateTo({
      url: '/pages/scoreExchange/scoreExchange',
    })
  },
  // 点击明细
  integralDetail(){
    wx.navigateTo({
      url: '/pages/integralDetail/integralDetail',
    })  
  },
  // 点击积分任务
  scoreBlock() {
    wx.navigateTo({
      url: '/pages/scoreBlock/scoreBlock',
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
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
    // this.onLoad()
    this.setData({
      domain: app.globalData.domain
    })
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
          url: domain + '/applet/applet/getappletuserscore',
          method: "POST",
          data: {
            userId: userId
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            that.setData({
              score: res.data.data.score
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})