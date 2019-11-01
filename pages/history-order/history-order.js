// pages/history-order/history-order.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList: [],
    userId: '', // 用户id
    isShowModal1: false,
    grabSheetId: '' // 抢单id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        that.setData({
          userId: res.data
        });
        that.init();
      },
    });
    
  },
  // 获取历史订单数据
  init: function() {
    var that = this;
    wx.request({
      url: app.globalData.domain + 'admin/applet/getgrabsheettop',
      method: 'POST',
      data: {
        pageIndex: 1,
        pageSize: 100,
        userId: that.data.userId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data.code == 200) {
          var data = res.data.data;
          that.setData({
            historyList: data.dataList
          });
        }
      }
    })
  },
  // 抢单
  sheetOrder: function(e) {
    var that = this;
    console.log(e.currentTarget.dataset)
    if (e.currentTarget.dataset.state == 0) {
      that.setData({
        isShowModal1: true,
        grabSheetId: e.currentTarget.dataset.sheetid
      })
     
    }
    
  },
  isOKOrder: function (e) {
    var that = this;
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: app.globalData.domain + 'admin/applet/addusergrabsheet',
      method: 'POST',
      data: {
        userId: that.data.userId,
        grabSheetId: that.data.grabSheetId
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          var data = res.data.data;
          if (data.state == 0) {
            wx.showToast({
              title: '抢单失败',
              icon: 'success',
              duration: 2000//持续的时间
            })
          } else if (data.state == 1) {
            wx.showToast({
              title: '已保护',
              icon: 'success',
              duration: 2000//持续的时间
            })
          } else if (data.state == 2) {
            wx.showToast({
              title: '该用户已抢订单',
              icon: 'success',
              duration: 2000//持续的时间
            })
          } else {
            wx.showToast({
              title: '抢单成功',
              icon: 'success',
              duration: 2000//持续的时间
            });
          }
          that.setData({
            isShowModal1: false
          });
          that.init();
        }
      }
    })
  },
  // 隐藏弹窗
  hideModal: function () {
    this.setData({
      isShowModal1: false
    });
  },
})