// pages/Add-card/Add-card.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Addcard:'',
    // 开户人
    openaccount: '',
    // 银行卡
    Bankcard: '',
    // 还户行
    Where: ''
  },

// 填充银行卡信息
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
          url: 'https://www.zhongjubang.com/api/applet/applet//getbindbankcardalipaypd',
          method: 'POST',
          data: {
            userId: res.data,
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res);
            // const {
            //   a
            // } = res.data.data;
            // 通过 setData 方法设置页面数据更新
            that.setData({
              Addcard: res.data.data.bankCardList
            });
            // console.log(that.data.Addcard)
          }
        })
      }
      
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 全局接口
    this.setData({
      domain: app.globalData.domain
    })
    var domain = this.data.domain;

    // 填充银行卡信息
    this.addCar();
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