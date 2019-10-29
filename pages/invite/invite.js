// pages/invite/invite.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenBlock: true,
    userId: '',
    inviteList: [
      {name: '张三', state: '未认证', reward: '+20'},
      {name: '李四', state: '已认证', reward: '+80'},
      {name: '王五', state: '未认证', reward: '+60'},
      {name: '大壮', state: '已认证', reward: '+30'},
      {name: '小明', state: '未认证', reward: '+50'},
      {name: '小红', state: '已认证', reward: '+40'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.domain) 
    var that = this
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        console.log(res.data)
        that.setData({
          userId: res.data
        })
      }
    })
    console.log(that.data.userId)

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
  onShareAppMessage: function (res) {
    // if (res.from === 'button') {
    //   // 来自页面内转发按钮
    // }
    console.log(this.data.userId)
    return {
      title: "这个小程序真好",
      path: 'pages/loding/loding?pid=' + this.data.userId
    }
    
  },
  onShareFacetoface(){
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token',
      method: "GET",
      data: {
        grant_type: 'client_credential',
        appid: 'wx904dc600917e75fb',
        secret: 'f69ac6dceb5c6e0ee7ac5a7e8b9005ea'
      },
      success: function (res) {
        console.log(res)
      }
    })
  }
})