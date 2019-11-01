// pages/myRanked/myRanked.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: '', // 域名
    level: "",
    userId: [],
    image: "http://www.zhongjubang.com/api/upload/applet_resource/myRanked/icon_2.png",
    image2: "http://www.zhongjubang.com/api/upload/applet_resource/myRanked/icon_2.png",
    image3: "http://www.zhongjubang.com/api/upload/applet_resource/myRanked/icon_2.png",
    image4: "http://www.zhongjubang.com/api/upload/applet_resource/myRanked/icon_2.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
          url: domain + '/applet/applet/getappletuservippdgrade',
          method: "POST",

          data: {
            userId: userId
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            if (res.data.data.level == 1) {
              
              that.setData({
                image: "http://www.zhongjubang.com/api/upload/applet_resource/myRanked/icon_1.png",
                level: "青铜"
              })
            } else if (res.data.data.level == 2) {
              that.setData({
                image2: "http://www.zhongjubang.com/api/upload/applet_resource/myRanked/icon_1.png",
                level: "铂金"
              })
            } else if (res.data.data.level == 3) {
              that.setData({
                image3: "http://www.zhongjubang.com/api/upload/applet_resource/myRanked/icon_1.png",
                level: "黄金"
              })
            } else if (res.data.data.level == 4) {
              that.setData({
                image4: "http://www.zhongjubang.com/api/upload/applet_resource/myRanked/icon_1.png",
                level: "白金"
              })
            }
          }
        })
      }
    })
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