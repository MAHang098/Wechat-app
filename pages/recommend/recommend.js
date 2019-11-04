// pages/recommend/recommend.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,// 加载数据
    userId: '',
    recommendStatusArr: ['未装修', '已装修'], //装修状态
    objectArray: [
      {
        id: 0,
        name: '未装修'
      },
      {
        id: 1,
        name: '已装修'
      }
    ],
    recommendMessageArr: [{
      name: "",
      phone: "",
      intention: "",
      homeStatus: ""
    }],
    pic: "",
    // 接收传来的值
    used_name:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      intention: options.used_name,
      recommendMessageArr: [{
        name: "",
        phone: "",
        // intention: "",
        homeStatus: ""
      }]
    })
    console.log(options.used_name)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  // onShow: function () {
  //   this.setData({
  //     recommendMessageArr: [{
  //       name: "",
  //       phone: "",
  //       intention: "",
  //       homeStatus: ""
  //     }]
  //   })
  //   var domain = this.data.domain;
  //   var that = this;
  //   wx.getStorage({
  //     key: 'userId',
  //     success: function (res) {
  //       var userId = res.data
  //       that.setData({
  //         loading: false
  //       });
  //       that.setData({
  //         userId: userId
  //       })
  //       wx.request({
  //         url: domain + '/Home/Index/recommendCustomerPic',
  //         success: function (res) {
  //           console.log(res);
  //           var status = res.data.status;
  //           if (status == 5) {
  //             that.setData({
  //               pic: res.data.data.recommend_pic.path,
  //               loading: true
  //             })
  //           }
  //         }
  //       })
  //     }
  //   })
  // },

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
   * 选择装修状态
   */
  bindPickerChange: function (e) {
    let index = e.target.dataset.index
    let tag = e.target.dataset.tag  //字段名称
    let array = this.data.recommendMessageArr;
    array[index][tag] = e.detail.value //赋值
    this.setData({
      recommendMessageArr: array,
    })
    console.log(array)
  },

  /**
   * 新增输入框
   */
  addRecommendMessage: function () {
    let newArray = {
      name: "",
      phone: "",
      intention: "",
      homeStatus: ""
    }
    this.setData({
      recommendMessageArr: this.data.recommendMessageArr.concat(newArray)
    })
  },

  /**
   * 删除输入框
   */
  delRecommendMessage: function (e) {
    
    let that = this
    let index = e.target.dataset.index //数组下标
    let arrayLength = that.data.recommendMessageArr.length //数组长度
    let newArray = []
    if (arrayLength > 1) {
      //数组长度>1 才能删除
      for (let i = 0; i < arrayLength; i++) {
        if (i !== index) {
          newArray.push(that.data.recommendMessageArr[i])
        }
      }
      that.setData({
        recommendMessageArr: newArray
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '必须设置一个推荐项目',
      })
    }
  },

  /**
   * 获取信息
   */
  setInputValue: function (e) {
    let index = e.target.dataset.index //数组下标
    let tag = e.target.dataset.tag  //字段名称
    let array = this.data.recommendMessageArr;
    array[index][tag] = e.detail.value  //赋值
    this.setData({
      recommendMessageArr: array
    })
  },
  /**
   * 检查上传数据
   */
  submitMessageCheck: function() {
    var submitArr =  this.data.recommendMessageArr;
    var arrLength = submitArr.length;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(19[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var that = this;
    for(var i = 0; i < arrLength; i++) {
      var checkName = submitArr[i]['name'];
      if (checkName == '') {
        wx.showToast({
          title: '客户姓名不能为空！',
          icon: 'none',
        })
        return false;
      }
      var checkPhone = submitArr[i]['phone'];
      if (checkPhone == '') {
        wx.showToast({
          title: '客户手机号不能为空！',
          icon: 'none',
        })
        return false;
      } else if (checkPhone.length < 11) {
        wx.showToast({
          title: '手机号码不正确！',
          icon: 'none',
        })
        return false;
      } else if (!myreg.test(checkPhone)) {
        wx.showToast({
          title: '手机号码不正确！',
          icon: 'none',
        })
        return false;
      }
      var checkProduct = submitArr[i]['intention'];
      if (checkProduct == '') {
        wx.showToast({
          title: '欲购产品不能为空！',
          icon: 'none',
        })
        return false;
      }
      var checkStatus = submitArr[i]['homeStatus'];
      if (checkStatus == '') {
        wx.showToast({
          title: '请选择状态值！',
          icon: 'none',
        })
        return false;
      }
    }
    that.submitMessage();
  },

  /**
   * 请求上传数据
   */
  submitMessage: function() {
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        that.setData({
          loading: false
        });
        var userId = res.data;
        that.setData({
          userId: userId
        })
        var recommendArr = that.data.recommendMessageArr;
        for (var i = 0; i<recommendArr.length;i++){
          console.log(recommendArr[i].name)
          wx.request({
            url: app.globalData.domain + '/applet/applet/addtprecommendclient',
            method: "POST",
            data: {
              userId: userId,
              name: recommendArr[i].name,
              phone: recommendArr[i].phone,
              intention: recommendArr[i].intention,
              homeStatus: recommendArr[i].homeStatus
              // recommendArr: recommendArr
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
              console.log(res)
              console.log(res.data.data.prompt)
              if (res.data.data.prompt==2){
                wx.showToast({
                  title: '手机号已存在',
                  icon: 'none',
                  duration: 2000
                })
              }else{
                wx.showToast({
                  title: '提交成功',
                  icon: 'none',
                  duration: 2000
                })
              }
              
            }
          })
        }
          // console.log(recommendArr.length)
        // wx.request({
        //   url: domain + '/applet/applet/addtprecommendclient',
        //   method: "POST",
        //   data: {
        //     userId: userId,
        //     name: "sds",
        //     phone: "13728375175",
        //     intention: "ssddsd",
        //     homeStatus: 0
        //     // recommendArr: recommendArr
        //   },
        //   header: {
        //     "Content-Type": "application/x-www-form-urlencoded"
        //   },
        //   success: function (res) {
        //     console.log(res)
            
        //   }
        // })
        // wx.request({
        //   url: domain + '/applet/applet/addtprecommendclient',
        //   data: {
        //     userId: userId,
        //     recommendArr: recommendArr
        //   },
        //   success: function (res) {
        //     console.log(11111)
        //     console.log(res)
            // var status = res.data.status;
            // var mes = res.data.mes;
            // if (status == 2) {
            //   wx.showToast({
            //     title: '操作成功',
            //     icon: 'success!',
            //     duration: 2000,
            //     success: function (res) {
            //       that.setData({
            //         loading: true
            //       })
            //       setTimeout(function () {
            //         wx.switchTab({
            //           url: '/pages/main/main',
            //         })
            //       }, 1000)
            //     }
            //   })

            // } else {
            //   that.setData({
            //     loading: true
            //   })
            //   wx.showToast({
            //     title: mes,
            //     icon: 'none',
            //     duration: 2000,
            //   })
            // }
          // }
        // })
      }
    })
  }
})