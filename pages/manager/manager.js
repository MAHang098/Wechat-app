//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    domain: '', // 域名
    level: "青铜",
    userId: [],
    nickName: [],
    head: [],
    grabList : [
      {name: '张三', phone: '184****7941', type: '沙发'},
      { name: '小明', phone: '184****2519', type: '橱柜' },
      { name: '李四', phone: '184****7546', type: '桌椅' }
    ],
    autoplay: true
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.setData({
      domain: app.globalData.domain
    })
    var domain = this.data.domain;
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        // console.log(res)
        var userId = res.data
        that.setData({
          userId: userId
        })
        wx.request({
          url: domain + '/applet/applet/getappletuservippdgrade',
          method: "POST",

          data: {
            userId: userId
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            if(res.data.data!=null){
              if (res.data.data.level == 1) {
                that.setData({
                  level: "青铜"
                })
              } else if (res.data.data.level == 2) {
                that.setData({
                  level: "铂金"
                })
              } else if (res.data.data.level == 3) {
                that.setData({
                  level: "黄金"
                })
              } else if (res.data.data.level == 4) {
                that.setData({
                  level: "白金"
                })
              }
            }

            
          }
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setData({
          
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    
    
  },
  onShow: function () {
    // 获取昵称
    var that = this;
    wx.getStorage({
      key: 'nickName',
      success: function (res) {
        // console.log(res)
        var nickName = res.data
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
        // console.log(res)
        var head = res.data
        // console.log(head)
        that.setData({
          head: head
        })

      }
    })
  },
  /**
   * 点击跳转
   */
  skipRecommend: function () {
    wx.navigateTo({
      url: '/pages/recommend/recommend',
    })
  },
  getUserInfo: function (e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toranking:function(){
    wx.showToast({
      title: '开发中',
      icon: 'none'
    })
  },
  toInvitefriends:function(){
    wx.navigateTo({
      url: '/pages/invite/invite'
    })
    
  },
  // 点击经纪人页面进行跳转web-view
  managertowebview: function (e) {
    // console.log(e.currentTarget.dataset.srcs);
    wx.navigateTo({
      url: '/pages/web-view/web-view?srcs=' + encodeURIComponent(e.currentTarget.dataset.srcs),
    });
  },
  toassets:function(){
    wx.navigateTo({
      url: '/pages/assets/assets',
    });
  },
  toscoreBlock: function () {
    wx.navigateTo({
      url: '/pages/scoreBlock/scoreBlock',
    });
  },
})
