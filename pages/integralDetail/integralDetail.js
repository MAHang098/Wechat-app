// pages/integralDetail/integralDetail.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain : "",
    arrayLog:[],
    isShowMessage: false // 暂无抢单信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getintegralDetail();
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
            if (res.data.code === "200") {
              if (res.data.data.length == 0) {
                that.setData({
                  isShowMessage: true
                })
              } else {
                that.setData({
                  arrayLog: res.data.data
                })
              }
              
              
              
            }
          },
        })

      }
    })


    
  }
    
})