const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: "",
    image: "",
    image1: "",
    image2: "",
    memberStatus: "",
    userId: [],
    openId: [],
    nickName: [],
    head: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      domain: app.globalData.domain
    })
    var domain = this.data.domain;
    var that = this;
    // 判断会员是否开通
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        var userId = res.data
        that.setData({
          userId: userId
        })
        wx.request({
          url: domain + '/applet/applet/getappletuservippdgradeidpd',
          method: "POST",

          data: {
            userId: userId
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            // 判断是否是vip
            if (res.data.data.memberStatus == 1) {
              that.setData({
                image: "https://www.zhongjubang.com/api/upload/applet_resource/interests/no-get.png"
              })
            } else if (res.data.data.memberStatus == 2) {
              that.setData({
                image: "https://www.zhongjubang.com/api/upload/applet_resource/interests/get.png"
              })
            }
            // 身份认证是否通过
            if (res.data.data.businessCardCheckStatus == 1 || res.data.data.businessCardCheckStatus == 3) {
              that.setData({
                image1: "/images/interests/go-certify.png"
              })
            } else if (res.data.data.businessCardCheckStatus == 2) {
              that.setData({
                image1: "/images/interests/certify.png"
              })
            }
            // 实名认证是否通过
            if (res.data.data.idCardCheckStatus == 1 || res.data.data.idCardCheckStatus == 3) {
              that.setData({
                image2: "/images/interests/go-certify.png"
              })
            } else if (res.data.data.idCardCheckStatus == 2) {
              that.setData({
                image2: "/images/interests/certify.png"
              })
            }


          }
        })
      }
    })
    
  },
  vipPays: function () {
    //请求后端支付订单参数    需改openid
    this.setData({
      domain: app.globalData.domain
    })
    var domain = this.data.domain;
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        var userId = res.data
        that.setData({
          userId: userId
        })

        wx.request({
          url: domain + '/applet/applet/getappletuservippdgradeidpd',
          method: "POST",

          data: {
            userId: userId
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            // 判断是否是vip
            if (res.data.data.memberStatus == 1) {
              that.setData({
                image: "https://www.zhongjubang.com/api/upload/applet_resource/interests/no-get.png"
              })
            } else if (res.data.data.memberStatus == 2) {
              that.setData({
                image: "https://www.zhongjubang.com/api/upload/applet_resource/interests/get.png"
              })
            }
            // 身份认证是否通过
            if (res.data.data.businessCardCheckStatus == 1 || res.data.data.businessCardCheckStatus == 3) {
              //没有通过身份审核
              wx.showToast({
                title: '还未通过名片认证',
                icon: 'none'
              });


            } else if (res.data.data.businessCardCheckStatus == 2) {
              // 实名认证是否通过
              if (res.data.data.idCardCheckStatus == 1 || res.data.data.idCardCheckStatus == 3) {
                //没有通过实名审核
                wx.showToast({
                  title: '还未通过实名认证',
                  icon: 'none'
                });

              } else if (res.data.data.idCardCheckStatus == 2) {
                //请求支付
                wx.getStorage({
                  key: 'openId',
                  success: function (res) {
                    var openId = res.data
                    that.setData({
                      openId: openId
                    })
                    wx.request({
                      url: 'https://www.zhongjubang.com/api/wechat/wxpay/wxpay',
                      method: "POST",
                      data: {
                        openId: openId
                      },
                      header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                      success: function (res) {
                        if (res.data.data.state != "1") {

                          var oderId = res.data.data.package;
                          if (res.data.code === "200") {
                            wx.requestPayment({
                              timeStamp: res.data.data.timeStamp, // 时间戳，必填（后台传回）
                              nonceStr: res.data.data.nonceStr, // 随机字符串，必填（后台传回）
                              package: res.data.data.package, // 统一下单接口返回的 prepay_id 参数值，必填（后台传回）
                              signType: 'MD5', // 签名算法，非必填，（预先约定或者后台传回）
                              paySign: res.data.data.paySign, // 签名 ，必填 （后台传回）
                              success: function (res) { // 成功后的回调函数
                                // do something
                                //支付成功添加订单    需改用户id
                                wx.getStorage({
                                  key: 'userId',
                                  success: function (res) {
                                    var userId = res.data
                                    that.setData({
                                      userId: userId
                                    })
                                    wx.request({
                                      url: 'https://www.zhongjubang.com/api/applet/applet/addviporder',
                                      method: "POST",
                                      data: {
                                        vipOrderId: oderId,
                                        userId: userId
                                      },
                                      header: {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                      },
                                      success: function (res) {
                                        wx.showToast({
                                          title: '操作成功',
                                          icon: 'none'
                                        });
                                        that.setData({
                                          image: "https://www.zhongjubang.com/api/upload/applet_resource/interests/get.png"
                                        })
                                      }
                                    })
                                  }
                                })

                              }
                            })
                          }
                        } else {
                          wx.showToast({
                            title: '你已经是会员了',
                            icon: 'none'
                          });
                        }
                      }
                    })
                  }
                })

              }
            }

          }
        })



      }
    })

  },
  /**
   * 实名认证判断
   */
  submitMessage: function () {
    this.setData({
      domain: app.globalData.domain
    })
    var domain = this.data.domain;
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        var userId = res.data
        that.setData({
          userId: userId
        })
        wx.request({
          url: domain + '/applet/applet/getappletuserbusiness',
          method: "POST",
          data: {
            userId: userId
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            // res.data.data.businessCardRewardStatus=2
            if (res.data.data.businessCardCheckStatus == 3 || res.data.data.businessCardCheckStatus == ""){
              wx.showToast({
                title: '请先完成名片认证',
                icon: 'none',
                duration: 2000
              })
            }else{
              wx.navigateTo({
                url: '/pages/IDCard/IDCard',
              })
            }
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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
        var nickName = res.data
        that.setData({
          nickName: nickName,
          loading: true
        })

      }
    })
    // 获取头像
    wx.getStorage({
      key: 'head',
      success: function (res) {
        var head = res.data
        that.setData({
          head: head
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
  onShareAppMessage: function () {

  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
