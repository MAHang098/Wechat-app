// pages/followMessage/followMessage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true, // 数据加载
    fid: "",
    product: "",
    phone: "",
    name: "",
    create_time: "",
    budget: "",
    remark: "",
    TabCur: 0,
    scrollLeft: 0,
    useId: [],
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    tabNav: ['基本信息', '我要留言'],
    tpRecommendId: "",
    leavingMessage: "",
    feedback: "",
    feedBackArr: []

  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var fid = options.id;
    this.setData({
      fid: fid
    })
    var that = this;
    // 数据加载,判断是否已经名片认证
    // wx.getStorage({
    //   key: 'userId',
    //   success: function (res) {
    //     var userId = res.data
    //     that.setData({
    //       userId: userId
    //     })
    //     wx.request({
    //       url: domain + '/applet/applet/gettprecommendclient',
    //       method: "POST",
    //       data: {
    //         userId: userId,
    //         state: 1,
    //         pageSize: 999
    //       },
    //       header: {
    //         "Content-Type": "application/x-www-form-urlencoded"
    //       },
    //       success: function (res) {
    //         console.log(res)
    //         console.log(res.data.data)
    //         console.log(res.data.data[0].intention)

    //         // var json = JSON.parse(res.data.data)
    //         // console.log(json.intention);
    //       }
    //     })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var fid = this.data.fid;
    var that = this;
    // 拿取数据
    wx.getStorage({
      key: 'userId',
      success: function(res) {
        var userId = res.data
        that.setData({
          userId: userId
        })
        // 渲染客户基本信息
        wx.request({
          url: app.globalData.domain + '/applet/applet/gettprecommendclient',
          method: "POST",
          data: {
            userId: userId,
            search: fid,
            pageSize: 999
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function(res) {
            that.setData({
              budget: res.data.data[0].budget,
              create_time: res.data.data[0].createTime,
              name: res.data.data[0].name,
              phone: res.data.data[0].phone,
              product: res.data.data[0].intention,
              tpRecommendId: res.data.data[0].tpRecommendId,
              // remark: res.data.data.remark,
              loading: true
            })
            // 渲染平台反馈
            wx.request({
              url: app.globalData.domain + '/applet/applet/getrecommendstatebyrecommendid',
              method: "POST",
              data: {
                recommendId: res.data.data[0].tpRecommendId
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: function(res) {
                that.setData({
                  feedBackArr:res.data.data
                })
                // var json = JSON.parse(res.data.data)
                // console.log(json.intention);

              }
            })


            // var json = JSON.parse(res.data.data)

          }
        })

      }
    })
    //1.0
    // wx.getStorage({
    //   key: 'openId',
    //   success: function (res) {
    //     var openId = res.data
    //     wx.request({
    //       url: domain + '/Home/Index/followInfo',
    //       data: {
    //         openid: openId,
    //         fid: fid
    //       },
    //       success: function (res) {
    //         var status = res.data.status;
    //         if (status == 5) {
    //           that.setData({
    //             budget: res.data.data.budget,
    //             create_time: res.data.data.create_time,
    //             name: res.data.data.name,
    //             phone: res.data.data.phone,
    //             product: res.data.data.product,
    //             remark: res.data.data.remark,
    //             loading: true
    //           })
    //         }
    //       }
    //     })
    //   }
    // })
  },
  // 获取留言信息
  llbInput: function(e) {
    this.setData({
      leavingMessage: e.detail.value
    })

  },
  sendMessage: function(res) {
    var fid = this.data.fid;
    var leavingMessage = this.data.leavingMessage;
    var tpRecommendId = this.data.tpRecommendId;
    var that = this;
    // 拿取数据
    wx.getStorage({
      key: 'userId',
      success: function(res) {
        var userId = res.data
        wx.request({
          url: app.globalData.domain + '/applet/applet/addleavingmessagebyrecommendid',
          method: "POST",
          data: {
            userId: userId,
            tpRecommendId: tpRecommendId,
            leavingMessage: leavingMessage
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function(res) {
            wx.showToast({
              title: '留言提交成功',
              icon: 'success!',
              duration: 2000
            })
            // that.setData({
            //   loading: true
            // })
            // var json = JSON.parse(res.data.data)
            // console.log(json.intention);

          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  
})