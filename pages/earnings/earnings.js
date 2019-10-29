// pages/earnings/earnings.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navimage:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(1)
    

// 封装收益明细填充
    this.addCar()

  },
  // 封装收益明细填充
  addCar() {
    var that = this;
    // console.log(this.data.domain);
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        console.log(res)
        var userId = res.data
        that.setData({
          userId: userId
        })
        wx.request({
          url: app.globalData.domain + '/applet/applet/getuserbalancelogbyuserid',
          method: 'POST',
          data: {
            userId: res.data,
            pageIndex: "1",
            pageSize: "999"
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            // console.log(res);

            that.setData({
              navimage: res.data.data
            });
            // console.log(that.data.navimage)
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
console.log(2)
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