// pages/allRanked/allRanked.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    allRankArr: []
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
    

    this.setData({
      domain: app.globalData.domain
    })
    var domain = this.data.domain;
    var that = this;


    //获取积分和余额
    
    wx.request({
      url: domain + '/applet/applet/getuserbycost',
      method: "POST",
      data: {
        pageIndex: 1,
        pageSize: 5
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res)
        that.setData({
          allRankArr: res.data.data.dataList
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