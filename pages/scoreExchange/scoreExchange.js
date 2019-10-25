
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,// 加载数据
    domain: '',// 域名
    score: "",  //我的积分
    score_exchange: 100, //兑换比例
    userId: []
  },

  onShow: function () {
    this.setData({
      domain: app.globalData.domain
    })
    var domain = this.data.domain;
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        console.log(res)
        var userId = res.data
        that.setData({
          userId: userId
        })
        wx.request({
          url: domain + '/applet/applet/getappletuserscore',
          method: "POST",
          data: {
            userId: userId
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res)
            that.setData({
              score: res.data.data.score
            })
          }
        })
      }
    })
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
  getMoney: function (e) {
    this.setData({
      getMoney: e.detail.value
    });
  },

  /**
   * 兑换积分
   */
  exchangeSubmit: function() {
    var domain = this.data.domain;
    var getMoney = this.data.getMoney;
    var score = this.data.score; 
    console.log(score)
    var score_exchange = this.data.score_exchange;
    console.log(score_exchange)
    var canExchange = score / score_exchange;
    
    console.log(canExchange)
    var that = this;
    console.log(getMoney)
    var intMoney = getMoney / 100;
    var jj = Number.isInteger(intMoney)
    console.log(jj)
    if (getMoney == '' ) {
      wx.showToast({
        title: '兑换金额不能为空！',
        icon: 'none',
        duration: 2000
      })
      return false;
    } else if (intMoney > canExchange ) {
      wx.showToast({
        title: '积分不足！',
        icon: 'none',
        duration: 2000
      })
      return false;
    } else if (jj == false) {
      wx.showToast({
        title: '输入不正确',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    // 判断积分是否兑换成功
    
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        
        console.log(res)
        var userId = res.data
        console.log(userId)
        that.setData({
          userId: userId
        })
        if (userId != '') {
          that.setData({
            loading: false
          })
          wx.request({
            url: domain + '/applet/applet/updateappletscripttocost',
            method: "POST",
            data: {
              userId: userId,
              script: getMoney
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
              console.log(11111)
              console.log(res)
              console.log(res.data.data.prompt)
              var status = res.data.data.prompt;
              if (status == 1) {
                that.setData({
                  score: res.data.data.score,
                  loading: true
                })
                wx.showToast({
                  title: '兑换成功',
                  icon: 'none',
                  duration: 2000
                })
                wx.getStorage({
                  key: 'userId',
                  success: function (res) {
                    console.log(res)
                    var userId = res.data
                    that.setData({
                      userId: userId
                    })
                    wx.request({
                      url: domain + '/applet/applet/getappletuserscore',
                      method: "POST",
                      data: {
                        userId: userId
                      },
                      header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                      success: function (res) {
                        console.log(res)
                        that.setData({
                          score: res.data.data.score
                        })
                      }
                    })
                  }
                })
              } else if (status == 0) {
                that.setData({
                  loading: true
                })
                wx.showToast({
                  title: '兑换失败',
                  icon: 'none',
                  duration: 2000
                })
              } else if (status == 2) {
                that.setData({
                  loading: true
                })
                wx.showToast({
                  title: '积分不足',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        }
        
      }
    })

    
  }
  
})

