// pages/integralDetail/integralDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain : "",
    arrayLog:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      domain: app.globalData.domain
    })
    var domain = this.data.domain;
    this.getintegralDetail();
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

  },

  /**
   * 请求积分明细接口
   */
  getintegralDetail : function(){
    var that = this;

    wx.getStorage({
      key: 'userId',
      success: function (res) {
        wx.request({
          url: app.globalData.domain + '/applet/applet/getuserscriptlogbyuserid',
          method: "Post",
          data: {
            userId: res.data
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res.data)
            if (res.data.code === "200") {
              that.setData({
                arrayLog: res.data.data
              })
            }
          },
        })

      }
    })


    
  }
    
})