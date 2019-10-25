//index.js
//获取应用实例
const app = getApp()

Page({
  
  onShareAppMessage() {
    return {
      title: 'picker',
      path: 'pages/updateMessage/updateMessage'
    }
  },
  getData(){
   
  },
  data: {
    array: ['未知','男', '女'],
    array2: ['泛家居', '置业'],
    index: 0,
    index2: 0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    domain: '',  // 域名
    loading: false,  // 数据加载
    openId: "",
    business_card_check_status: "",
    head: "",
    id_card_check_status: "",
    nickname: "",
    filePath: "",
    sex: [],
    head: [],
    nickName: [],
    userId: [],
    occupation: [],
    fileName: ""
    
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
        console.log(res)
        var nickName = res.data
        console.log(nickName)
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
        console.log(res)
        var head = res.data
        console.log(head)
        that.setData({
          head: head
        })

      }
    })
    
    // 获取性别
    wx.getStorage({
      key: 'sex',
      success: function (res) {
        console.log(res)
        var sex = res.data
        console.log(sex)
        that.setData({
          index: sex
        })

      }
    })


    // 获取职业
    wx.getStorage({
      key: 'occupation',
      success: function (res) {
        console.log(res)
        var occupation = res.data
        console.log(occupation)
        that.setData({
          index2: occupation
        })

      }
    })


  },
  onLoad: function () {
    this.setData({
      domain: app.globalData.domain
    })
    var domain = this.data.domain;
    var that = this;
    
    //渲染数据
    

  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
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
          url: domain + '/applet/applet/updateuserdetails',
          method: "POST",
          data: {
            userId: userId,
            sex: e.detail.value
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res)
            console.log("修改成功");
            that.setData({
              sex: e.detail.value
            })
            console.log(that.data.sex)
            that.setData({
              index: that.data.sex
            })
            // console.log(sex)
            wx.setStorageSync('sex', that.data.sex)
            var app = getApp();
            app.globalData.sex = that.data.sex
          }
        })
      }
    })
    
  },
  bindPickerChange2(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
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
          url: domain + '/applet/applet/updateuserdetails',
          method: "POST",
          data: {
            userId: userId,
            occupation: e.detail.value
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res)
            console.log("修改成功");
            that.setData({
              occupation: e.detail.value
            })
            console.log(that.data.occupation)
            that.setData({
              index2: that.data.occupation
            })
            // console.log(sex)
            that.data.occupation = that.data.occupation;
            wx.setStorageSync('occupation', that.data.occupation)
            var app = getApp();
            app.globalData.occupation = that.data.occupation
          }
        })
      }
    })
    // wx.request({
    //   url: "http://www.zhongjubang.com/api/applet/applet/updateuserdetails",
    //   method: "POST",
    //   data: {
    //     userId: 394,
    //     occupation: e.detail.value

    //   },
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   success: function (res) {
    //     console.log("修改成功");
    //     console.log(res.data);
    //   },
    // })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../updateMessage/updateMessage'
    })
  },
  
  
  
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  chooseImg: function () {
    this.setData({
      domain: app.globalData.domain,
      image: this.data.image
    })
    var domain = this.data.domain;
    var image = this.data.image;
    console.log(image)
    var that = this;
    //从本地挑选文件
    wx.chooseImage({
      count: 1,
      type: 'file',
      success(res) {
        var path = res.tempFiles[0].path; //文件资源地址
        wx.showModal({
          title: '提示',
          content: '是否上传头像图片?',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              //将文件传给开发者服务器
              wx.uploadFile({
                url: domain + '/upload', //后台接口
                header: {
                  "Content-Type": "multipart/form-data"
                }, //类型
                filePath: path, //文件路径
                name: 'file', //文件名
                success: function (res) {

                  console.log(res)
                  var json = JSON.parse(res.data)
                  console.log(json.data.fileUrl);
                  that.setData({
                    head: json.data.fileUrl,
                    fileName: json.data.fileName
                  })
                  that.setData({
                    head: json.data.fileUrl
                  })
                  console.log(that.data.head)
                  console.log('传输成功')
                  wx.setStorageSync('head', that.data.head)
                  var app = getApp();
                  app.globalData.head = that.data.head
                  wx.showToast({
                    title: '操作成功',
                    icon: 'success!',
                    duration: 2000,
                    success: function (res) {
                      that.setData({
                        loading: true
                      })
                      // setTimeout(function () {
                      //   wx.navigateBack({})
                      // }, 1000)
                    }
                  })
                  // wx.navigateTo({
                  //   url: '/pages/updateMessage/updateMessage',
                  // })
                  // wx.request({
                  //   url: domain + '/applet/applet/updateuserdetails',
                  //   method: "POST",
                  //   data: {
                  //     userId: userId,
                  //     head: fileName
                  //   },
                  //   header: {
                  //     "Content-Type": "application/x-www-form-urlencoded"
                  //   },
                  //   success: function (res) {
                  //     console.log(res)
                  //     console.log("修改成功");
                  //     that.setData({
                  //       head: fileName
                  //     })
                  //     // console.log(that.data.occupation)
                      
                  
                  //   }
                  // })
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
    })
  },
  // chooseImg: function () {
  //   var domain = this.data.domain;
  //   var openId = this.data.openId;
  //   var that = this;
  //   wx.chooseImage({
  //     count: 1,
  //     success: function (res) {
  //       var filePath = res.tempFilePaths;
  //       if (filePath) {
  //         that.setData({
  //           loading: false,
  //           filePath: filePath
  //         })
  //         wx.uploadFile({
  //           url: domain + '/Home/Index/headUpload',
  //           filePath: filePath[0],
  //           name: 'file',
  //           formData: {
  //             'openid': openId
  //           },
  //           success(res) {
  //             wx.showToast({
  //               title: '操作成功',
  //               icon: 'success!',
  //               duration: 2000,
  //               success: function (res) {
  //                 that.setData({
  //                   loading: true
  //                 })
  //                 setTimeout(function () {
  //                   wx.navigateBack({})
  //                 }, 1000)
  //               }
  //             })
  //           },
  //           complete: function (complete) {

  //           }
  //         })
  //       }
  //     },
  //     fail: function (error) {

  //     },
  //     complete: function () {
  //     }
  //   });
  // },
})
