// pages/invite/invite.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenBlock: true,
    userId: '',
    inviteList: [],
    inviteCount: '',
    inviteMoney: '',
    imageUrl: '',
    showView: true
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
    var that = this
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        
        that.setData({
          userId: res.data
        })
        // 获取邀请人数和累计奖励
        wx.request({
          url: app.globalData.domain +'/applet/applet/getuserinvitelistcost',
          data: {
            userId: res.data
          },
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success(res) {
            
            that.setData({
              inviteCount: res.data.data.inviteCount,
              inviteMoney: res.data.data.inviteMoney
            })
          }
          
        })
        // 获取奖励明细
        wx.request({
          url: app.globalData.domain + '/applet/applet/getuserinvitelist',
          data: {
            userId: res.data
          },
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success(res) {
            console.log(res)
            that.setData({
              inviteList: res.data.data.dataList
            })
          }

        })
        // 面对面邀请二维码
        // const scene = de
        
        wx.request({
          url: app.globalData.domain + '/wechat/applet/appltqrcode',
          data: {
            scene: res.data,
            page: 'pages/loding/loding',
            width: 430,
            userId: res.data
          },
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success(res) {
            that.setData({
              imageUrl: res.data.data
            })
          }

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
  onShareAppMessage: function (res) {
    // if (res.from === 'button') {
    //   // 来自页面内转发按钮
    // }
    console.log('cechi:::'+this.data.userId) 
    return {
      title: "众居邦微信小程序",
      path: 'pages/loding/loding?pid=' + this.data.userId
    }
    
  },
  onShareFacetoface(){
    let that = this;
    that.setData({
      showView: (!that.data.showView)
    })

  },
  close: function () {
    let that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  }

})