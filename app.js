//app.js
App({
  onLaunch: function () {
    
    //用户登录
    this.appletUserLoding();
    //修改有问题的昵称
    this.updateNickName();
    //检查版本更新
    this.updateVersion();
    if (wx.cloud) {
      wx.cloud.init({
        traceUser: true
      })
    }
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  data:{
    nickName: ""
  },
  //修改微信昵称为正常明文
  updateNickName: function () {
    var that = this;
    var openid = '';
    this.appletUserOpenId().then(function (data) {
      openid = data;
      that.zjbPost({
        url: "applet/applet/getusermeansbyuserid",
        method: "POST",
        data: {
          openId: openid
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function (data) {
        //判断昵称是否存在问题有的话就修改
        if (data.nickname === '666') {
          //获取用户昵称等信息
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo;
              var nickName = userInfo.nickName;
              //修改错误的昵称
              wx.request({
                url: that.globalData.domain + 'applet/applet/updateuserdetails',
                method: "Post",
                data: {
                  userId: data.userId,
                  nickName: nickName
                },
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                success: function (res) {
                  //成功失败都不做处理
                }
              })

            }
          })
        }
      })
    })
  },


  globalData: {
    userInfo: null,
    openId: '',
    // 生产环境
    // domain: 'https://www.zhongjubang.com/api/',
    // 测试环境
    domain: 'https://www.zhongjubang.com/test/',
    // 本地环境
    // domain: 'http://localhost:8899/test/',
    loading: false,
    ColorList: [{
      title: '嫣红',
      name: 'red',
      color: '#e54d42'
    },
    {
      title: '桔橙',
      name: 'orange',
      color: '#f37b1d'
    },
    {
      title: '明黄',
      name: 'yellow',
      color: '#fbbd08'
    },
    {
      title: '橄榄',
      name: 'olive',
      color: '#8dc63f'
    },
    {
      title: '森绿',
      name: 'green',
      color: '#39b54a'
    },
    {
      title: '天青',
      name: 'cyan',
      color: '#1cbbb4'
    },
    {
      title: '海蓝',
      name: 'blue',
      color: '#0081ff'
    },
    {
      title: '姹紫',
      name: 'purple',
      color: '#6739b6'
    },
    {
      title: '木槿',
      name: 'mauve',
      color: '#9c26b0'
    },
    {
      title: '桃粉',
      name: 'pink',
      color: '#e03997'
    },
    {
      title: '棕褐',
      name: 'brown',
      color: '#a5673f'
    },
    {
      title: '玄灰',
      name: 'grey',
      color: '#8799a3'
    },
    {
      title: '草灰',
      name: 'gray',
      color: '#aaaaaa'
    },
    {
      title: '墨黑',
      name: 'black',
      color: '#333333'
    },
    {
      title: '雅白',
      name: 'white',
      color: '#ffffff'
    },
    ]
  },

  //众居邦协议中的POst请求1.0
  zjbPost: function (param) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.globalData.domain + param.url,
        data: param.data,
        header: param.header,
        method: param.method,
        success: function (res) {
          //第一层http协议请求判断
          if (res.statusCode === 200) {
            //自定义协议判断

            if (res.data.code==='200'){
              //请求数据类型
              if (typeof res.data.data === 'string') {
                if (res.data.data === '') {
                  wx.showToast({
                    title: '请求成功',
                    icon: 'none'
                  })
                } else {
                  wx.showToast({
                    title: res.data,
                    icon: 'none'
                  })
                }
                resolve(res.data.data);
              }

              //如果返回的是对象的话处理直接返回对象
              if (typeof res.data.data === 'object') {
                resolve(res.data.data);
              }

            }

            /**请求异常直接输出信息 */
            if (res.data.code === '400') {
              wx.showToast({
                title: res.data.message,
                icon: 'none'
              })
            }
            

            /**参数为空直接返回相关信息 */
            if (res.data.code === '401') {
              wx.showToast({
                title: res.data.message,
                icon: 'none'
              })
            }
            resolve(res.data);

          } else {
            
            wx.showToast({
              title: '请求失败，请稍后重试',
              icon: 'none'
            })
            //其它错误，提示用户错误信息
            if (this._errorHandler != null) {
              //如果有统一的异常处理，就先调用统一异常处理函数对异常进行处理
              this._errorHandler(res.data)
            }
            reject(res.data)
          }
        },
        fail: function (err) {
          wx.showToast({
            title: '网络异常，请稍后重试',
            icon: 'none'
          })
          if (this._errorHandler != null) {
            this._errorHandler(res.data)
          }
          reject(res.data)
        },
        complete: function () {
          //请求完成处理的事情
        }
      })
    })
  },
  
  //众居邦协议中的POst请求1.0
  zjbRequest: function (param) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.globalData.domain + param.url,
        data: param.data,
        header: param.header,
        method: param.method,
        success: function (res) {
          //第一层http协议请求判断
          if (res.statusCode === 200) {
            //自定义协议判断

            if (res.data.code === '200') {
              //请求数据类型
              if (typeof res.data.data === 'string') {
                if (res.data.data === '') {
                  wx.showToast({
                    title: '请求成功',
                    icon: 'none'
                  })
                } else {
                  wx.showToast({
                    title: res.data,
                    icon: 'none'
                  })
                }
                resolve(res.data.data);
              }

              //如果返回的是对象的话处理直接返回对象
              if (typeof res.data.data === 'object') {
                resolve(res.data.data);
              }

            }

            /**请求异常直接输出信息 */
            if (res.data.code === '400') {
              wx.showToast({
                title: res.data.message,
                icon: 'none'
              })
            }


            /**参数为空直接返回相关信息 */
            if (res.data.code === '401') {
              wx.showToast({
                title: res.data.message,
                icon: 'none'
              })
            }
            resolve(res.data)


          } else {
            wx.showToast({
              title: '请求失败，请稍后重试',
              icon: 'none'
            })
            //其它错误，提示用户错误信息
            if (this._errorHandler != null) {
              //如果有统一的异常处理，就先调用统一异常处理函数对异常进行处理
              this._errorHandler(res.data)
            }
            reject(res.data)
          }
        },
        fail: function (err) {
          wx.showToast({
            title: '网络异常，请稍后重试',
            icon: 'none'
          })
          if (this._errorHandler != null) {
            this._errorHandler(res.data)
          }
          reject(res.data)
        },
        complete: function () {
          //请求完成处理的事情
        }
      })
    })
  },

  /**
   * 登陆判断2.1
   */
  appletUserLoding() {
    wx.showLoading({
      title: '加载中',
    })
    

    this.appletUserPd();
  },

  onShow() {

  },

  //获取用户openid 并缓存
  appletUserOpenId() {
    var that = this;
    return new Promise((resolve, reject) => {
      wx.login({
        success: function (res) {
          if (res.code) {
            //调用封装请求获取
            that.zjbPost({
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
              that.globalData.openId = data.openId;
              resolve(data.openId);
            })
          }
        }
      })
    })

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
      that.zjbPost({
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
          that.zjbPost({
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
          wx.reLaunch({
            url: '/pages/login/login'
          })
          wx.hideLoading();
        }
      })
    });
  },
  

  phoneCheck(phone) {
    //这个方法用于校验手机号，当格式正确的时候返回false
    var myreg = /^1\d{10}$/;
    if (!myreg.test(phone)) {
      return false;
    } else {
      return true;
    }
  },

  //更新用户版本信息
  updateVersion(){
    if (wx.canIUse("getUpdateManager")) {
      let updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate((res) => {
        // 请求完新版本信息的回调
        console.log(res.hasUpdate);
      })
      updateManager.onUpdateReady(() => {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: (res) => {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            } else if (res.cancel) {
              return false;
            }
          }
        })
      })
      updateManager.onUpdateFailed(() => {
        // 新的版本下载失败
        wx.hideLoading();
        wx.showModal({
          title: '升级失败',
          content: '新版本下载失败，请检查网络！',
          showCancel: false
        });
      });
    }
  }

})