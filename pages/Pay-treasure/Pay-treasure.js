// pages/Pay-treasure/Pay-treasure.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aliPayAccount: '',
    aliPayName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAliPayMessage();
  },
  changeInput(e) {
    let changed = {};
    let prop = e.currentTarget.dataset.prop
    changed[prop] = e.detail.value;
    this.setData(changed)
  },
  submitMessage: function (e) {
    if (this.data.aliPayAccount===""||this.data.aliPayAccount===null){
      wx.showToast({
        title: '请填写你的支付宝账号',
        icon: 'none'
      });
    } else if (this.data.aliPayName === "" || this.data.aliPayName === null){
      wx.showToast({
        title: '请填写你的支付用户名',
        icon: 'none'
      });
    }else{
      var that = this;
      wx.getStorage({
        key: 'userId',
        success: function (res) {
          var userId = res.data
          that.setData({
            userId: userId
          })
          wx.request({
            url: 'https://www.zhongjubang.com/api/applet/applet/addappletuseralipay',
            method: 'post',
            data: {
              userId: res.data,
              alipayName: that.data.aliPayName,
              alipayAccount: that.data.aliPayAccount
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
              if (res.data.code === "200") {
                wx.showToast({
                  title: '绑定成功',
                  icon: 'none'
                });
                //页面跳转
                wx.navigateBack({

                });
              } else {
                wx.showToast({
                  title: '绑定失败',
                  icon: 'none'
                });
              }

            }

          })
        }
      })

      
    }
    
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
   * 获取支付宝信息
   */
  getAliPayMessage:function(){
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        var userId = res.data
        that.setData({
          userId: userId
        })
        wx.request({
          url: 'https://www.zhongjubang.com/api/applet/applet/getbindbankcardalipaypd',
          method: "POST",
          data: {
            userId: userId
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            that.setData({
              aliPayAccount: res.data.data.alipayAccount,
              aliPayName:res.data.data.alipayName
            })
            
            // var json = JSON.parse(res.data)
          }
        })
      }
    })
  }
})