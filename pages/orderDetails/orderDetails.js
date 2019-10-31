// pages/orderDetails/orderDetails.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shelfTime: '',
    contacts: '',
    region: '',
    preOrderedProducts: '',
    remarks: '',
    decorationStyle: '',
    preorderTime: '',
    preOrderedProducts: '',
    apartment: '',
    budget: '',
    sex: '',
    phone: '',
    shelfTime: '',
    grabSheetId: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // console.log('cechi::::'+options.grabSheetId) 
    this.setData({
      grabSheetId:options.grabSheetId
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
    // console.log(this.data.grabSheetId) 
    var that = this;
    wx.request({
      url: app.globalData.domain + '/applet/applet//getgrabsheetbyid',
      method: 'POST',
      data: {
        grabSheetId: that.data.grabSheetId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // console.log(res)
        if (res.data.code == 200) {
          //正则上架时间
          var blueurl = res.data.data.shelfTime
          var reg = /([T][^/]+)$/;
          var blueurl = blueurl.replace(reg,"")
          // 正则预计购买时间
          var blueurl1 = res.data.data.preorderTime
          var reg1 = /([T][^/]+)$/;
          var blueurl1 = blueurl1.replace(reg1,"")
          that.setData({
            shelfTime: blueurl,
            region: res.data.data.region,
            contacts: res.data.data.contacts,
            phone: res.data.data.phone,
            budget: res.data.data.budget,
            apartment: res.data.data.apartment,
            preOrderedProducts: res.data.data.preOrderedProducts,
            preorderTime: blueurl1,
            intentionBrand: res.data.data.intentionBrand,
            decorationStyle: res.data.data.decorationStyle,
            remarks: res.data.data.remarks
          })
        }
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