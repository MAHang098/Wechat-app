// pages/IDCard/IDCard.js 
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,  // 数据加载
    idCardImgPathFront: "https://www.zhongjubang.com/api/upload/applet_resource/idCardFront.png",  //身份证图片正面
    idCardImgPathBack: "https://www.zhongjubang.com/api/upload/applet_resource/idCardBack.png",  //身份证图片反面
    getIdCardNumber: "",  //获取输入框的身份证号码
    maskBlock: true, //遮罩层显示
    limitBlock: true, //限制弹窗显示
    idCardStatus: "",  //实名认证状态
    uploadIdCardImgPathFront: "",
    uploadIdCardImgPathBack: "",
    idCardPic1: "",//身份证正面
    idCardPic2: "",
    userId: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      loading: true
    })
    var that = this;
    // 数据加载,判断是否已经名片认证
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        console.log(res)
        var userId = res.data
        that.setData({
          userId: userId
        })
        wx.request({
          url: app.globalData.domain + + '/applet/applet/getappletuserbusiness',
          method: "POST",
          data: {
            userId: userId
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            
            console.log(res)
            console.log(res.data.data.businessCardCheckStatus)
            // res.data.data.businessCardRewardStatus = 2
            if (res.data.data.businessCardCheckStatus != 2) {
              console.log(11111)
              that.setData({
                maskBlock: false,
                limitBlock: false
              })
            } else {
              console.log(2222222)
              that.setData({
                idCardImgPathFront: "https://www.zhongjubang.com/api/upload/applet_resource/idCardFront.png",
                idCardImgPathBack: "https://www.zhongjubang.com/api/upload/applet_resource/idCardBack.png",
                idCardStatus: "",
                loading: true
              })
            }
            // var json = JSON.parse(res.data)
            // console.log(json.data);
          }
        })
      }
    })
    // 获取状态数据，判断是否已经传输
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        console.log(res)
        var userId = res.data
        that.setData({
          userId: userId
        })
        wx.request({
          url: app.globalData.domain + '/applet/applet/getappletuseridentity',
          method: "POST",
          data: {
            userId: userId,
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res)
            console.log(res.data.data.idCardCheckStatus)
            that.setData({
              idCardStatus: res.data.data.idCardCheckStatus
            })
            var Pic1 = res.data.data.idCardPic1
            var Pic2 = res.data.data.idCardPic2
              that.setData({
                idCardImgPathFront: Pic1,
                idCardImgPathBack: Pic2,
                getIdCardNumber: res.data.data.idCardNum
              })
            
            
          }
        })
      }
    })


    
  },



  /**
   * 监听input输入的信息（身份证号）
   */
  getIdCardNumber: function (e) {
    this.setData({
      getIdCardNumber: e.detail.value
    });
  },

  /**
   * 选择图片（身份证正面）
   */
  chooseImgFront: function () {
    var that = this;
    //从本地挑选文件
    wx.chooseImage({
      count: 1,
      type: 'file',
      success(res) {
        var path = res.tempFiles[0].path; //文件资源地址
        wx.showModal({
          title: '提示',
          content: '是否确认上传人物页照片?',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              //将文件传给开发者服务器
              wx.uploadFile({
                url: 'https://www.zhongjubang.com/api/upload', //后台接口
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
                    idCardImgPathFront: json.data.fileUrl,
                    idCardPic1: json.data.fileName
                  })
                  console.log('传输成功')
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
  
  // 身份证反面
  chooseImgBack: function () {
    var that = this;
    //从本地挑选文件
    wx.chooseImage({
      count: 1,
      type: 'file',
      success(res) {
        var path = res.tempFiles[0].path; //文件资源地址
        wx.showModal({
          title: '提示',
          content: '是否确认上传国徽页照片?',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              //将文件传给开发者服务器
              wx.uploadFile({
                url: 'https://www.zhongjubang.com/api/upload', //后台接口
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
                    idCardImgPathBack: json.data.fileUrl,
                    idCardPic2: json.data.fileName
                  })
                  console.log('传输成功')
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
  

  /**
   * 提交文字内容，且请求上传图片方法
   */
  submitMessage: function () {
    var domain = this.data.domain;
    var idCardPic1 = this.data.idCardPic1;
    var idCardPic2 = this.data.idCardPic2;
    // var uploadIdCardImgPathFront = this.data.uploadIdCardImgPathFront;
    // var uploadIdCardImgPathBack = this.data.uploadIdCardImgPathBack;
    var idCardNumber = this.data.getIdCardNumber;
    var that = this;
    if (idCardNumber == '') {
      wx.showToast({
        title: '身份证号码不能为空！',
        icon: 'none',
        duration: 2000
      })
    } else if (idCardPic1 == "") {
      wx.showToast({
        title: '请上传身份证正面图片！',
        icon: 'none',
        duration: 2000
      })
    } else if (idCardPic2 == "") {
      wx.showToast({
        title: '请上传身份证反面图片！',
        icon: 'none',
        duration: 2000
      })
    } else {
      this.setData({
        loading: false
      });
      // 提交数据
      wx.getStorage({
        key: 'userId',
        success: function (res) {
          console.log(res)
          var userId = res.data
          that.setData({
            userId: userId
          })
          wx.request({
            url: app.globalData.domain + '/applet/applet/updateuserdetails',
            method: "POST",
            data: {
              userId: userId,
              idCardPic1: idCardPic1,
              idCardPic2: idCardPic2,
              idCardNum: idCardNumber
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
              console.log(res)
              that.setData({
                idCardStatus:1
              })
              
            }
          })
        }
      })
      
    }
  },

  /**
   * 图片上传（正面）
   */
  uploadImgFront: function (uploadIdCardImgPathFront, uploadIdCardImgPathBack, openId) {
    var that = this;
    wx.uploadFile({
      url: app.globalData.domain + '/Home/Index/idCardUpload',
      filePath: uploadIdCardImgPathFront,
      name: 'file',
      formData: {
        'openid': openId,
        'type': 1
      },
      success(res) {
      },
      complete: function (complete) {
        that.uploadImgBack(uploadIdCardImgPathBack, openId);
      }
    })
  },

  /**
   * 图片上传（反面）
   */
  uploadImgBack: function (uploadIdCardImgPathBack, openId) {
    var domain = this.data.domain;
    var that = this;
    wx.uploadFile({
      url: app.globalData.domain + '/Home/Index/idCardUpload',
      filePath: uploadIdCardImgPathBack,
      name: 'file',
      formData: {
        'openid': openId,
        'type': 2
      },
      success(res) {
      },
      complete: function (complete) {
        wx.showToast({
          title: '操作成功',
          icon: 'success!',
          duration: 2000,
          success: function (res) {
            that.setData({
              loading: true
            })
            setTimeout(function () {
              wx.navigateBack({})
            }, 1000)
          }
        })
      }
    })
  }
})