const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 1.0轮播图
    imgUrls: [
    ],
    interval: 5000,
    duration: 1000,
    circular: true,
    leftMargin: '80rpx',
    rightMargin: '80rpx',
    currentIndex: 0,
    // 交互的滑动图片
    shopImgs: [],

    // 2.0众咨询
    shimag: [],
    bannerNewList: []
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

    

  },
  // 2.0众咨询图文部分
  consulting() {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/controller/offcialweb/getoffcialwebnews',
      method: 'POST',
      data: {
        newsType: "applet_news"
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // 通过 setData 方法设置页面数据更新
        console.log(res)
        that.setData({
          shimag: res.data.data.dataList
        });
      }
    })
  },
  

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    // 2.0众咨询
    // 获取新闻内容
    this.consulting();
    this.getBannerNews();
  },

  

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  //新增访问量
  addTraffic(){

  },
  // 点击众资讯进行跳转web-view
  informationtowebview: function (e) {
    // wx.navigateTo({
    //   url: '/pages/web-view/web-view?srcs=' + encodeURIComponent(e.currentTarget.dataset.srcs),
    // });
    wx.navigateTo({
      url: '/pages/web-view/web-view?srcs=' + encodeURIComponent(e.currentTarget.dataset.srcs.url),
    });
    //新增访问量
    wx.request({
      url: app.globalData.domain + '/controller/offcialweb//addnewspageview',
      method: 'POST',
      data: {
        newsId: e.currentTarget.dataset.srcs.newsId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res)
      }
    })
  },

  // 获取新闻轮播图
  getBannerNews: function (e) {

    var that = this;
    wx.request({
      url: app.globalData.domain + 'public/public/getresourcesbyresourcestype',
      method: 'POST',
      data: {
        resourcesTypeName: "applet_news_banner"
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // const {
        //   a
        // } = res.data.data;
        // 通过 setData 方法设置页面数据更新
        that.setData({
          bannerNewList: res.data.data
        });
      }
    })
  },
})