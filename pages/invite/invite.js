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
    // app.globalData.domain
    // var that = this
    // wx.getStorage({
    //   key: 'userId',
    //   success: function (res) {
    //     console.log(res.data)
    //     that.setData({
    //       userId: res.data
    //     })
    //   }
    // })

    // wx.request({
    //   url: app.globalData.domain + '/wechat/applet/appltqrcode',
    //   method: "GET",
    //   success: function (res) {
    //     console.log(res.data.data.access_token)
    //     var scene = decodeURIComponent(options.scene)

    //     // 生成页面的二维码
    //     wx.request({
    //       //注意：下面的access_token值可以不可以直接复制使用，需要自己请求获取
    //       url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + res.data.data.access_token,
    //       data: {
    //         scene: '000',
    //         page: "pages/invite/invite"  //这里按照需求设置值和参数   
    //       },
    //       method: "POST",
    //       responseType: 'arraybuffer',  //设置响应类型
    //       success(res) {
    //         console.log(res)
    //         var src2 = wx.arrayBufferToBase64(res.data);  //对数据进行转换操作
    //         that.setData({
    //           src2
    //         })
    //       },
    //       fail(e) {
    //         console.log(e)
    //       }
    //     })
    //   }
    // })

    

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
    
  }
})