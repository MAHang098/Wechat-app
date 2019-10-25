
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,// 加载数据
    domain: '',// 域名
    openId: '',
    real_name_score: "1000",  //实名认证积分
    identity_score: "1000",  //身份认证积分
    recommend_customer_score: "1000",  //推荐客户积分
    recommend_friend_score: "",  //邀请好友积分
    business_check_status: "",  //身份认证状态
    first_invite: "",  //首次邀请状态
    first_recommend: "",  //首次推荐状态
    id_card_check_status: "",  //实名认证状态
    sign_num: "",  //签到天数
    sign_score: "",  //当天签到积分
    score: "",  //我的积分总和
    sign_status: '', //签到状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      domain: app.globalData.domain
    })
    this.signInPd();
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
    var domain = this.data.domain;
    var that = this;
    wx.getStorage({
      key: 'openId',
      success: function (res) {
        var openId = res.data
        that.setData({
          loading: false,
          openId: openId
        })
        wx.request({
          url: domain + '/Home/Index/userSignContent',
          data: {
            openid: openId
          },
          success: function (res) {
            console.log(res)
            var status = res.data.status;
            if (status == 5) {
              that.setData({
                real_name_score: res.data.data.real_name_score,
                identity_score: res.data.data.identity_score,
                recommend_customer_score: res.data.data.recommend_customer_score,
                recommend_friend_score: res.data.data.recommend_friend_score,
                business_check_status: res.data.data.business_check_status,
                first_invite: res.data.data.first_invite,
                first_recommend: res.data.data.first_recommend,
                id_card_check_status: res.data.data.id_card_check_status,
                sign_num: res.data.data.sign_num,
                sign_score: res.data.data.sign_score,
                score: res.data.data.score,
                sign_status: res.data.data.sign_status,
                loading: true
              })
            }
          }
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
    var shareObj = {
      title: "众居邦APP，邀请您一起赚钱",
      path: '/pages/loading/loading', // 默认是当前页面，必须是以‘/’开头的完整路径
      imgUrl: '../../images/inviteShare.png', //转发时显示的图片路径，支持网络和本地，不传则使用当前页默认截图。
      success: function (res) {　 // 转发成功之后的回调　　　　　
        if (res.errMsg == 'shareAppMessage:ok') {

        }
      },
      fail: function () {　 // 转发失败之后的回调
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          // 用户取消转发
        } else if (res.errMsg == 'shareAppMessage:fail') {
          // 转发失败，其中 detail message 为详细失败信息　　
        }
      },
      complete: function () {
        // 转发结束之后的回调（转发成不成功都会执行）
      }
    };　　 // 来自页面内的按钮的转发
    // 　　if (options.from == 'button') {
    //   　　　　var dataid = options.target.dataset; //上方data-id=shareBtn设置的值
    //   　　　　// 此处可以修改 shareObj 中的内容
    //   　　　　shareObj.path = '/pages/btnname/btnname?id=' + dataid.id;
    // 　　}
    // 返回shareObj

    return shareObj;
  },

  /**
   * 签到
   */
  signIn: function () {
    var openId = this.data.openId;
    var domain = this.data.domain;
    var that = this;
    if (openId != '') {
      that.setData({
        loading: false
      })
      wx.request({
        url: domain + '/Home/Index/userSign',
        data: {
          openid: openId
        },
        success: function (res) {
          var status = res.data.status;
          if (status == 7) {
            that.setData({
              score: res.data.data.score,
              sign_status: 1,
              loading: true
            })
            wx.showToast({
              title: '签到成功',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  },
  
  /**
   * 点击跳转
   */
  skipRecommend: function () {
    wx.navigateTo({
      url: '/pages/recommend/recommend',
    })
  },

  skipScoreExchange: function () {
    wx.navigateTo({
      url: '/pages/scoreExchange/scoreExchange',
    })
  },

  skipRuleDescription: function () {
    wx.navigateTo({
      url: '/pages/aboutUs/aboutUs?type=5',
    })
  },
  signIn: function () {
    this.setData({
      domain: app.globalData.domain
    })
    var domain = this.data.domain;
    var that = this
    console.log("签到事件");
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        console.log(res)
        var userId = res.data
        that.setData({
          userId: userId
        })
        wx.request({
          url: domain + '/applet/applet/adduserscriptlogbysignin',
          method: "POST",
          data: {
            userId: userId
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res.data.data.state)
            if (res.data.data.state === "2") {
              wx.showToast({
                title: '你已签到',
                icon: 'none'
              })
              that.setData({
                sign_status: 1
              })
              // that.onShow();
            } else {
              wx.showToast({
                title: '签到成功',
                icon: 'none'
              })
              that.setData({
                sign_status: 1
              })
              // that.onShow();
            }
          }
        })
      }
    })
  },
  tomessage:function(){
    wx.showToast({
      title: '开发中',
      icon: 'none'
    })
  },
  signInPd: function () {
    this.setData({
      domain: app.globalData.domain
    })
    var domain = this.data.domain;
    var that = this
    console.log("签到事件");
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        console.log(res)
        var userId = res.data
        that.setData({
          userId: userId
        })
        wx.request({
          url: domain + '/applet/applet/getuserscriptlogbysigninpd',
          method: "POST",
          data: {
            userId: userId
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res.data.data.state)
            if (res.data.data.state === "2") {
              console.log("okk");
              that.setData({
                sign_status : 1
              })
              // that.onShow();
            } else {
              that.setData({
                sign_status: 0
              })
            }
          }
        })
      }
    })
  }
})
