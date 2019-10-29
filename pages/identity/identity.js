// pages/identity/identity.js 
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: '', // 域名
    loading: false, // 数据加载
    identityImgPath: "http://www.zhongjubang.com/api/upload/applet_resource/businessCard.png", //上传图片路径
    getRealName: "", //获取真实姓名
    getCompanyName: "", //获取公司名称
    business_card_check_status: "", //认证状态：1（审核中）2（已通过）3（重新审核）
    uploadIdentityImgPath: "",
    businessCardPic: "",
    userId: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },
  onLoad: function (options) {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
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
          url: domain + '/applet/applet/getappletuserbusiness',
          method: "POST",
          data: {
            userId: userId,
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res)
            console.log(res.data.data.businessCardCheckStatus)
            that.setData({
              business_card_check_status: res.data.data.businessCardCheckStatus
            })
            var Pic = res.data.data.businessCardPic
            // var Pic2 = res.data.data.idCardPic2


            console.log(1111)
            that.setData({
              identityImgPath: Pic,
              getCompanyName: res.data.data.companyName,
              getRealName: res.data.data.realName
            })


          }
        })
      }
    })
  },


  /**
   * 监听input输入的信息（真实姓名）
   */
  getRealName: function(e) {
    this.setData({
      getRealName: e.detail.value
    });
  },

  /**
   * 监听input输入的信息（公司名称）
   */
  getCompanyName: function(e) {
    this.setData({
      getCompanyName: e.detail.value
    });
  },

  /**
   * 选择图片
   */
  chooseImg: function() {
    this.setData({
      domain: app.globalData.domain
    })
    var domain = this.data.domain;
    var that = this;
    //从本地挑选文件
    wx.chooseImage({
      count: 1,
      type: 'file',
      success(res) {
        var path = res.tempFiles[0].path; //文件资源地址
        wx.showModal({
          title: '提示',
          content: '是否确认上传名片?',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              //将文件传给开发者服务器
              wx.uploadFile({
                url: domain+'/upload', //后台接口
                header: {
                  "Content-Type": "multipart/form-data"
                }, //类型
                filePath: path, //文件路径
                name: 'file', //文件名
                success: function(res) {
                  
                  console.log(res)
                  var json = JSON.parse(res.data)
                  console.log(json.data.fileUrl);
                  that.setData({
                    identityImgPath: json.data.fileUrl,
                    businessCardPic: json.data.fileName
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
  submitMessage: function() {

    var domain = this.data.domain;
    var realName = this.data.getRealName;
    var companyName = this.data.getCompanyName;
    var businessCardPic = this.data.businessCardPic;
    
    console.log(realName, companyName, businessCardPic)
    var that = this;
    if (realName == '') {
      wx.showToast({
        title: '真实姓名不能为空！',
        icon: 'none',
        duration: 2000
      })
    } else if (companyName == '') {
      wx.showToast({
        title: '公司名称不能为空！',
        icon: 'none',
        duration: 2000
      })
    } else if (businessCardPic == '') {
      wx.showToast({
        title: '请上传个人名片照片！',
        icon: 'none',
        duration: 2000
      })
    } else {
      this.setData({
        loading: false
      });
      wx.getStorage({
        key: 'userId',
        success: function(res) {
          wx.showModal({
            title: '提示',
            content: '上传名片认证成功'
          })
          that.setData({
            business_card_check_status: 1
          })
          console.log(res)
          var userId = res.data
          console.log(userId)
          that.setData({
            userId: userId
          })
          wx.request({
            url: domain + 'applet/applet/updateuserdetails',
            method: "POST",
            data: {
              userId: userId,
              realName: realName,
              companyName: companyName,
              businessCardPic: businessCardPic
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(res) {
              
              console.log(11111)
              console.log(res);
            }
          })
        }
      })
    }
  }
})