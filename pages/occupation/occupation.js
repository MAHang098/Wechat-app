// pages/loding/loding.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 自定义
    accountNumber: 0,
    a: 1,
    b: 0,
    phone: '',
    codePd: '',
    occupation: '',
    tokens: '',
    isChecked1: true,
    isChecked2: true,
    userInfo: {},
    sendCodePd: false,
    btntext: "获取验证码",
    domain: "",
    openId: "",
    userId: "",
    head: "",
    nickName: "",
    sex: "",
    occupation: "",
    mask: true,
  },
  changeInput(e) {
    let changed = {};
    let prop = e.currentTarget.dataset.prop
    changed[prop] = e.detail.value;
    this.setData(changed)
  },
  // 点击登陆按钮跳转到其他页
  goToPay() {
    const {
      accountNumber
    } = this.data;
    if (accountNumber === 0) {
      // 2. 检查用户是否有选择商品
      wx.showToast({
        title: '请先选择您的职业',
        icon: 'none'
      });
    } else {
      wx.switchTab({
        url: '/pages/index/index',
      });
    }
  },


  //选中与或判断
  serviceSelection1: function () {
    this.data.occupation = "0"
    this.setData({
      isChecked1: false
    })
    this.setData({
      isChecked2: true
    })
  },

  //选中与或判断
  serviceSelection2: function () {
    this.data.occupation = "1"
    this.setData({
      isChecked2: false
    })
    this.setData({
      isChecked1: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

 
  //用户不存在的场合 注册账号用的方法
  loginUser: function (e) {
    if (e.detail.userInfo) {
      if (this.data.occupation === "") {
        wx.showToast({
          title: '职业不能为空',
          icon: 'none'
        })
      } else {
        var that = this;
        //用户按了允许授权按钮
        wx.getStorage({
          key: 'userId',
          success: function (res) {
            //修改用户资料职业
            app.zjbPost({
              url: "applet/applet/updateuserdetails",
              method: "POST",
              data: {
                userId: res.data,
                occupation: that.data.occupation
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }).then(function (data) {
              if(data===''){
                //请求成功重新加载请求函数
                app.appletUserLoding();
              }
            })
          },
        })
      }
    } else {
      //用户按了拒绝按钮
      wx.showToast({
        title: '如需继续操作，请允许授权',
        icon: 'none'
      });
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

})