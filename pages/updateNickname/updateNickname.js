// pages/updateNickname/updateNickname.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: '',  // 域名
    loading: false,  // 数据加载
    getNickname: "",
    userId: [],
    nickName: "",
    sex: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      domain: app.globalData.domain
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
    // 获取昵称
    var that = this;
    wx.getStorage({
      key: 'nickName',
      success: function (res) {
        console.log(res)
        var nickName = res.data
        console.log(nickName)
        that.setData({
          nickName: nickName,
          loading: true
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

  
  getNickname: function(e) {
    this.setData({
      nickName: e.detail.value
    });
  },

  updateNickname: function () {
    var nickName = this.data.nickName;
    // 获取性别
    var that = this;
   
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        console.log(res)
        var userId = res.data
        that.setData({
          userId: userId
        })
        wx.getStorage({
          key: 'sex',
          success: function (res) {
            console.log(res)
            var sex = res.data
            console.log(sex)
            that.setData({
              sex: sex
            })
            wx.request({
              url: app.globalData.domain + "/applet/applet/updateuserdetails",
              method: "POST",
              data: {
                userId: userId,
                sex: sex,
                nickName: nickName
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: function (res) {
                console.log(res.data);
                //1.存用户信息到本地存储
                wx.setStorageSync('nickName', that.data.nickName)
                var app = getApp();
                app.globalData.nickName = that.data.nickName
                wx.navigateBack({})
                // wx.navigateTo({
                //   url: '/pages/updateMessage/updateMessage',
                // })
              },
            })
          }
        })
        

      }
    })
    
    var domain = this.data.domain;
    
    var that = this;
    if (nickName == null) {
      wx.showToast({
        title: '昵称不能为空！',
        icon: 'none',
        duration: 2000
      })
    } else {
      that.setData({
        loading: false
      })
      // wx.getStorage({
      //   key: 'openId',
      //   success: function (res) {
      //     var openId = res.data
      //     wx.request({
      //       url: domain + '/Home/Index/personalInfoUpdate',
      //       data: {
      //         openid: openId,
      //         nickName: nickName
      //       },
      //       success: function (res) {
      //         var status = res.data.status;
      //         if (status == 2) {
      //           wx.showToast({
      //             title: '操作成功',
      //             icon: 'success!',
      //             duration: 2000,
      //             success: function (res) {
      //               that.setData({
      //                 loading: true
      //               })
      //               setTimeout(function () {
      //                 wx.navigateBack({})
      //               }, 1000)
      //             }
      //           })
      //         }
      //       }
      //     })
      //   }
      // })
    }
    
  }
})