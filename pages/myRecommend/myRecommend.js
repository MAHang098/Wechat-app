// pages/myRecommend/myRecommend.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: '',  // 域名
    loading: false,  // 数据加载
    myRecommendArr: [],
    items: [
      { name: '1', value: '待处理' },
      { name: '2', value: '已处理' },
      { name: '3', value: '有需求' },
      { name: '4', value: '无需求' },
      { name: '5', value: '签约成功' },
      { name: '6', value: '签约失败' },
    ],
    screenBlock: true,
    maskBlock: true,
    getMessage: "",
    checkboxArr: [],
    last_recommend_id: ""
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
    // 拿取数据
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        var userId = res.data
        that.setData({
          userId: userId
        })
        wx.request({
          url: domain + '/applet/applet/gettprecommendclient',
          method: "POST",
          data: {
            userId: userId,
            pageSize: 99
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            
            that.setData({
              myRecommendArr: res.data.data
            })
          }
        })
      }
    })
    // wx.getStorage({
    //   key: 'openId',
    //   success: function (res) {
    //     var openId = res.data
    //     wx.request({
    //       url: domain + '/Home/Index/myRecommend',
    //       data: {
    //         openid: openId
    //       },
    //       success: function (res) {
    //         var status = res.data.status;
    //         if (status == 5) {
    //           that.setData({
    //             myRecommendArr: res.data.data,
    //             last_recommend_id: res.data.last_recommend_id,
    //             loading: true
    //           })
    //         }
    //       }
    //     })
    //   }
    // })
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
    var domain = this.data.domain;
    var last_recommend_id = this.data.last_recommend_id;
    var myRecommendArr = this.data.myRecommendArr;
    var checkboxArr = this.data.checkboxArr;
    var getMessage = this.data.getMessage;
    var that = this;
    wx.getStorage({
      key: 'openId',
      success: function (res) {
        var openId = res.data
        wx.request({
          url: domain + '/Home/Index/myRecommend',
          data: {
            openid: openId,
            last_id: last_recommend_id,
            status: checkboxArr,
            phone: getMessage
          },
          success: function (res) {
            var status = res.data.status;
            var moreArr = myRecommendArr.concat(res.data.data)
            if (status == 5) {
              that.setData({
                myRecommendArr: moreArr,
                last_recommend_id: res.data.last_recommend_id,
                loading: true
              })
            }
          }
        })
      }
    })
  },

  

  /**
   * 显示筛选区域
   */
  screenBlock: function() {
    this.setData({
      screenBlock: false,
      maskBlock: false,
    })
  },

  /**
   * 隐藏筛选区域
   */
  screenHidden: function () {
    this.setData({
      screenBlock: true,
      maskBlock: true,
    })
  },

  /**
   * 获取input信息
   */
  getMessage: function(e) {
    this.setData({
      getMessage: e.detail.value
    });
  },

  /**
   * 获取checkbox信息
   */
  checkboxChange: function (e) {
    this.setData({
      checkboxArr: e.detail.value
    });
  },

  /**
   * 筛选请求
   */
  submitMessage: function() {
    var checkboxArr = this.data.checkboxArr;
    var getMessage = this.data.getMessage;
    var domain = this.data.domain;
    var that = this;
    // 拿取数据
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        var userId = res.data
        that.setData({
          userId: userId
        })
        wx.request({
          url: domain + '/applet/applet/gettprecommendclient',
          method: "POST",
          data: {
            userId: userId,
            state: checkboxArr,
            search: getMessage,
            pageSize: 999
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            // console.log(res.data.data[0].intention)
            that.setData({
              myRecommendArr: res.data.data,
              maskBlock: true,
              screenBlock: true,
              loading: true
            })
            // var json = JSON.parse(res.data.data)
            // console.log(json.intention);
            
          }
        })
      }
    })

    // wx.getStorage({
    //   key: 'openId',
    //   success: function (res) {
    //     var openId = res.data
    //     that.setData({
    //       loading: false
    //     })
    //     wx.request({
    //       url: domain + '/Home/Index/myRecommend',
    //       data: {
    //         openid: openId,
    //         status: checkboxArr,
    //         phone: getMessage
    //       },
    //       success: function (res) {
    //         console.log(res);
    //         var status = res.data.status;
    //         if (status == 5) {
    //           that.setData({
    //             myRecommendArr: res.data.data,
    //             maskBlock: true,
    //             screenBlock: true,
    //             loading: true
    //           })
    //         }
    //       }
    //     })
    //   }
    // })
  },

  resetButton: function () {
    this.setData({
      items: [
        { name: '1', value: '待处理' },
        { name: '2', value: '已处理' },
        { name: '3', value: '有需求' },
        { name: '4', value: '无需求' },
        { name: '5', value: '签约成功' },
        { name: '6', value: '签约失败' },
      ],
      getMessage: '',
    })
  }
})