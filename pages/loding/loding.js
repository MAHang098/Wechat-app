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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    if (options.pid){
      that.setData({
        pid: options.pid
      })
    }
    if (options.scene) {
      const scene = decodeURIComponent(options.scene);
      if (scene) {
        that.setData({
          pid: scene
        })
      }
    }
    console.log('kaixin:::' + that.data.pid)
    
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
                      pid: that.data.pid
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