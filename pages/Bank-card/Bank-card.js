// pages/Bank-card/Bank-card.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openaccount: '',
    Bankcard: '',
    Where:''
  },
  changeInput(e) {
    let changed = {};
    let prop = e.currentTarget.dataset.prop
    changed[prop] = e.detail.value;
    this.setData(changed)
  },
  submitMessage: function (e) {
    console.log(this.data);
    if (this.data.openaccount === "" || this.data.openaccount === null) {
      wx.showToast({
        title: '请填写你的开户人姓名',
        icon: 'none'
      });
    } else if (this.data.Bankcard === "" || this.data.Bankcard === null) {
      wx.showToast({
        title: '请填写你的银行卡号',
        icon: 'none'
      });
    } else if (this.data.Where === "" || this.data.Where === null) {
      wx.showToast({
        title: '请填写你的开户行',
        icon: 'none'
      });
    }else {
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
            url: app.globalData.domain+'applet/applet/addappletuserbankcard',
            method: 'post',
            data: {
              userId: res.data,
              openPerson: that.data.openaccount,
              cardNumber: that.data.Bankcard,
              openBank: that.data.Where
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
              console.log(res);
              if (res.data.code === "200") {
                wx.showToast({
                  title: '绑定成功',
                  icon: 'none'
                });
                //页面跳转
                wx.navigateTo({
                  url: '/pages/Add-card/Add-card',
                })
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