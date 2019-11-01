// pages/assetsBlock/assetsBlock.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 点击提交
    maskBlock: true, //遮罩层显示
    limitBlock: true, //限制弹窗显示

    domain: '',  // 域名
    loading: false,  // 数据加载

    // 1.0余额
    cost: '',
    freeze: "0",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 全局
    this.setData({
      domain: app.globalData.domain
    })

  },

  //1.0 封装余额
  getSliderData() {
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        var userId = res.data
        that.setData({
          userId: userId
        })

        wx.request({
          url: that.data.domain + '/applet/applet/getappletuserscore',
          method: 'POST',
          data: {
            userId: res.data,
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            // const {
            //   a
            // } = res.data.data;
            // 通过 setData 方法设置页面数据更新
            that.setData({
              cost: res.data.data.cost,
              freeze: res.data.data.freeze
            });
          }
        })
      }
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
    this.onLoad() 
    // 余额显示
    this.getSliderData()
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

  /**
   * 提现条件判断
   */
  bun: function () {
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        var userId = res.data
        that.setData({
          userId: userId
        })
        wx.request({
          url: that.data.domain + '/applet/applet/getbindbankcardalipaypd',
          method: 'POST',
          data: {
            userId: res.data,
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            // 判读是否绑定银行卡
            if (res.data.data.bankCardPd === "0" && res.data.data.aLiPayPd === "0") {
              that.setData({
                maskBlock: false,
                limitBlock: false,
              })
            } else {
              wx.navigateTo({
                url: '/pages/withdrawal/withdrawal',
              })
            }
          }
        })
      }
    })
  },
  // 点击支付宝绑定
  Paytreasure() {
    wx.navigateTo({
      url: '/pages/Pay-treasure/Pay-treasure',
    })
  },
  // 点击收益明细
  earnings() {
    wx.navigateTo({
      url: '/pages/earnings/earnings',
    })
  },
  // 点击删除提交弹框菜单
  delete: function () {
    this.setData({
      maskBlock: true,
      limitBlock: true,
    })
  },
  // 点击银行卡
  toAddCard:function(){
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        var userId = res.data
        that.setData({
          userId: userId
        })

        wx.request({
          url: 'https://www.zhongjubang.com/api/applet/applet//getbindbankcardalipaypd',
          method: 'POST',
          data: {
            userId: res.data,
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            // console.log(res.data.data.bankCardList.length);
            if (res.data.data.bankCardList.length !== 0) {

              wx.navigateTo({
                url: '/pages/Add-card/Add-card',
              })
            } else {
              wx.navigateTo({
                url: '/pages/Bank-card/Bank-card',
              })
            }
          }
        })
      }
    })
    
  }
})