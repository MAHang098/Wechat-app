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
    pid: ''
  },
  changeInput(e) {
    let changed = {};
    let prop = e.currentTarget.dataset.prop
    changed[prop] = e.detail.value;
    this.setData(changed)
  },
  // 点击登陆按钮跳转到首页
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

  sendCode: function (e) {
    var myreg = /^1\d{10}$/;
    if (this.data.phone === "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      })
    } else {
      var that = this;
      //发送短信的时候直接校验手机号码是否注册，没办法家里没条件
      wx.request({
        url: app.globalData.domain + '/applet/applet/getuserphonepdbind',
        method: "Post",
        data: {
          phone: that.data.phone
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          if (res.data.code === "200") {

            if (that.data.btntext === "获取验证码") {
              wx.request({
                url:  app.globalData.domain + "/public/public/sendverificationcode",
                method: "Post",
                data: {
                  type: "1",
                  phone: that.data.phone
                },
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                success: function (res) {
                  if (res.data.code === "200") {
                    wx.showToast({
                      title: '验证码发送成功',
                      icon: 'none'
                    })
                    //这里开始倒计时验证码
                    that.data.sendCodePd = true;
                    var coden = 60    // 定义60秒的倒计时
                    var codeV = setInterval(function () {
                      that.setData({    // _this这里的作用域不同了
                        btntext: '重新获取' + (--coden) + 's'
                      })
                      if (coden == -1) {  // 清除setInterval倒计时，这里可以做很多操作，按钮变回原样等
                        clearInterval(codeV)
                        that.setData({
                          btntext: '获取验证码'
                        })
                      }
                    }, 1000)
                  }
                },
              })
            }
          } else {
            wx.showToast({
              title: '手机号已绑定微信',
              icon: 'none'
            })
          }
        },
      })

    }

  },

  //发送成功验证码60倒计时

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

  // 重新加载用户信息，解决再次进入时无法进行用户认证
  onShow: function () {
    //用户登录
    this.appletUserLoding();
    //修改有问题的昵称
    app.updateNickName();
    // if (wx.cloud) {
    //   wx.cloud.init({
    //     traceUser: true
    //   })
    // }
    // wx.getSystemInfo({
    //   success: e => {
    //     this.globalData.StatusBar = e.statusBarHeight;
    //     let custom = wx.getMenuButtonBoundingClientRect();
    //     this.globalData.Custom = custom;
    //     this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
    //   }
    // })
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  appletUserLoding() {
    wx.showLoading({
      title: '加载中',
    })


    this.appletUserPd();
  },
  //获取用户是否存在
  appletUserPd() {
    var that = this;
    var th = this;
    //第一个方法传过来的openid
    var openid = '';
    this.appletUserOpenId().then(function (data) {
      openid = data;
      //校验用户是否存在
      app.zjbPost({
        url: 'applet/applet/getopenidpdisuser',
        method: "Post",
        data: {
          openId: data
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function (data) {
        // 1为用户存在
        if (data.userPd === '1') {
          //优先跳转到主页
          // wx.switchTab({
          //   url: '/pages/index/index'
          // })
          //回调用户资料函数
          //更新本地缓存
          app.zjbPost({
            url: "applet/applet/getusermeansbyuserid",
            method: "POST",
            data: {
              openId: openid
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }).then(function (data) {


            wx.setStorage({ key: 'nickName', data: data.nickname, });
            wx.setStorage({ key: 'occupation', data: data.occupation, });
            wx.setStorage({ key: 'sex', data: data.sex, });
            wx.setStorage({ key: 'userId', data: data.userId, });
            wx.setStorage({ key: 'head', data: data.head, });

            //判断职业跳转想对页面
            if (data.occupation === '0') {
              //优先跳转到主页
              wx.switchTab({
                url: '/pages/index/index'
              })
            } else if (data.occupation === '1') {
              //优先跳转到主页
              wx.switchTab({
                url: '/pages/manager/manager'
              })
            } else {
              //这里是没有选择职业的年轻人
              wx.redirectTo({
                url: '/pages/occupation/occupation'
              })
            }
          })
          wx.hideLoading();
        } else {
          //用户不存在的话
          // wx.reLaunch({
          //   url: '/pages/login/login'
          // })
          // wx.showToast({
          //   title: '您还没有注册，请注册登陆!',
          //   icon: 'none'
          // })
          wx.hideLoading();
        }
      })
    });
  },
  //获取用户openid 并缓存
  appletUserOpenId() {
    var that = this;
    return new Promise((resolve, reject) => {
      wx.login({
        success: function (res) {
          if (res.code) {
            //调用封装请求获取
            app.zjbPost({
              url: 'wechat/applt/getappletopenid',
              method: 'GET',
              data: {
                code: res.code
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }).then(function (data) {
              wx.setStorage({
                key: 'openId',
                data: data.openId,
              })
              app.globalData.openId = data.openId;
              resolve(data.openId);
            })
          }
        }
      })
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // console.log(options)
    if (options.pid){
      wx.setStorageSync('pid', options.pid);
    }
    if (options.scene) {
      const scene = decodeURIComponent(options.scene);
      if (scene) {
        wx.setStorageSync('pid', options.scene);
      }
    }
  },

  //用户不存在的场合 注册账号用的方法
  loginUser: function (e) {
    // console.log(e.detail.userInfo);
    var that = this;
    if (e.detail.userInfo) {
      that.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      // console.log(that.data.userInfo.avatarUrl)
      if (this.data.phone === "") {
        wx.showToast({
          title: '手机号不能为空',
          icon: 'none'
        })
      } else if (!app.phoneCheck(this.data.phone)) {
        wx.showToast({
          title: '手机号格式错误',
          icon: 'none'
        })
      } else if (this.data.codePd === "") {
        wx.showToast({
          title: '验证码不能为空',
          icon: 'none'
        })
      } else if (this.data.occupation === "") {
        wx.showToast({
          title: '职业不能为空',
          icon: 'none'
        })
      } else {
        /**需要修改的代码 */

        //判断验证码是否正确
        wx.request({
          url: app.globalData.domain + "public/public/checkverificationcode",
          method: "POST",
          data: {
            code: this.data.codePd,
            phone: this.data.phone,
            type: "1"
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            if (res.data.code === "200") {
              app.zjbPost({
                url: '/applet/applet/getuserphonepdbind',
                method: 'POST',
                data: {
                  phone: that.data.phone
                },
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                }
              }).then(function (data) {
                //除了200外其他都会返回全部数据
                if (data===''){
                  //验证码正确请求注册接口
                  
                  console.log(that.data.pid)
                  wx.request({
                    url: app.globalData.domain + "/applet/applet/addappletuserbind",
                    method: "Post",
                    data: {
                      openId: app.globalData.openId,
                      phone: that.data.phone,
                      occupation: that.data.occupation,
                      sex: that.data.userInfo.gender,
                      nickName: that.data.userInfo.nickName,
                      head: that.data.userInfo.avatarUrl,
                      pid: wx.getStorageSync("pid")
                    },
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: function (res) {
                      if (res.data.code === '200') {
                        //注册成功后获取用户资料
                        app.appletUserLoding();
                      } else {
                        wx.showToast({
                          title: res.data.message,
                          icon: 'none'
                        })
                      }

                    },
                  })
                }
              })
            } else {
              wx.showToast({
                title: '验证码错误',
                icon: 'none'
              })
            }
          },
        })
      }

    } else {
      //用户按了拒绝按钮
      wx.showToast({
        title: '注册需要您授权用户信息',
        icon: 'none'
      });
    }
  }

})