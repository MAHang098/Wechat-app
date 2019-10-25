
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageBackgroundColor: '',
    // 1.0 初始化轮播图数据
    slider: [],
    domain:"",
    // 2.0导航栏
    navimage:[],
    navimages: [],

    // 3.0封装首推品牌
    shopImgs: [],
    
    // 4.0众咨询
    shimag:[],

    // 5.0 底部上拉
    shangla:[],
    // 上拉底部提示
    loadingMore: false,   //加载更多的显示与隐藏
    loadingOver: false,   //加载完的显示与隐藏

    // 通知公告
    //初始化数据
    hideNotice: false,
    notice: '恭喜李忠杰成为众居邦会员',

    // 自定义判断点击首推品牌箭头图片
    accountNumber: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // 全局接口
    this.setData({
      domain: app.globalData.domain
    })
    var domain = this.data.domain;
    
    // 1.1 调用轮播图请求
    this.getSliderData();

    // 2.0分类导航
    this.nav();
    this.nava();

    // 3.0封装首推品牌
    this.brand();

    // 4.0众咨询
    this.consulting();

  },

  // 1.0 封装轮播图请求
  getSliderData() {
    var that = this;
    // console.log(this.data.domain);
    wx.request({
      url: this.data.domain + 'public/public/getresourcesbyresourcestype',
      method:'POST',
      data:{
        resourcesTypeName:"applet_index_banner"
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // console.log(res);
        // 通过 setData 方法设置页面数据更新
        that.setData({
          slider: res.data.data
        });
      }
    })
  },

  // 2.0 封装分类导航
  nav() {
    var that = this;
    wx.request({
      url: this.data.domain + '/applet/applet/getbrandtypelistbysn',
      method: 'POST',
      data:{
        pageIndex: "1",
        pageSize: "4"
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // console.log(res);
        // 通过 setData 方法设置页面数据更新
        that.setData({
          navimage: res.data.data.dataList
        });
      }
    })
  },
  nava() {
    var that = this;
    wx.request({
      url: this.data.domain + '/applet/applet/getbrandtypelistbysn',
      method: 'POST',
      data: {
        pageIndex: "2",
        pageSize: "4"
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // console.log(res);
        // 通过 setData 方法设置页面数据更新
        that.setData({
          navimages: res.data.data.dataList
        });
      }
    })
  },

  // 3.0 封装首推品牌
  brand() {
    var that = this;
    // 1.0 向服务器发送请求，获取轮播图数据
    wx.request({
      url: this.data.domain + '/applet/applet/getbrandlistbysn',
      method: 'POST',
      data:{
        pageIndex:"1",
        pageSize:"3"
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // console.log(res);
        // 通过 setData 方法设置页面数据更新
        that.setData({
          shopImgs: res.data.data.dataList
        });
      }
    })
  },

  //  4.0 封装众咨询
  consulting() {
    var that = this;
    wx.request({
      url: this.data.domain + '/controller/offcialweb/getoffcialwebnews',
      method: 'POST',
      data: {
        pageIndex: "1",
        pageSize: "4",
        newsType: "applet_news"
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // console.log(res.data.data);
        // 通过 setData 方法设置页面数据更新
        // console.log(res);
        that.setData({
          shimag: res.data.data.dataList
        });
      }
    })
  },

  // 5.0 封装底部上拉
  shangla() {
    var that = this;
    wx.request({
      url: this.data.domain + '/applet/applet/getbrandlistbysn',
      method: 'POST',
      data: {
        pageIndex: "1",
        pageSize: "3"
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // console.log(res);
        // 通过 setData 方法设置页面数据更新
        that.setData({
          loadingMore: false,
          loadingOver: true,
          shopImgs: res.data.data.dataList
        });
      }
    })
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
   
    // 上拉底部提示
    this.setData({
      loadingMore: true,
      loadingOver: false,
    });
    this.shangla();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

// 点击导航栏跳转
  // bindTap: function (res) {
  //   var that = this;
  //   wx.request({
  //     url: this.data.domain + '/applet/applet/getbrandtypelistbysn',
  //     method: 'POST',
  //     data: {
  //       pageIndex: "1",
  //       pageSize: "8"
  //     },
  //     header: {
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     },
  //     success: function (res) {
  //       console.log(res);
  //       //请求成功调用函数
  //       // console.log(res.data.data.dataList[0].typeName)
  //       //在这里，可以将请求到的数据赋值给原始数据，我只是举一个栗子，具体如何赋值，跟后台返回参数的形式有关
  //       that.data.typeName = res.data.data.dataList.typeName;
  //       console.log(that.data.typeName)
  //       //ok,接下来进行页面跳转，要将这些值传递到B页面
  //       // wx.navigateTo({
  //       //   url: '/pages/all-category/all-category?used_name=' + that.data.brandName,
  //       // })
  //     }
  //   })
  // },

// 点击导航菜单获取id
  bindTap: function (e) {
    var that = this;
    // console.log(e)
  var a = e.currentTarget.id;
    // console.log(a)
    wx.navigateTo({
      url: '/pages/all-category/all-category?id=' + a,
    })

  },

  // 判断是否点击首推品牌箭头图片
  niming: function (e) {
    const {
      accountNumber
    } = this.data;
    if (accountNumber === 0) {
      wx.navigateTo({
        url: '/pages/all-category/all-category',
      });
    } else {
    }
  },

  // 点击众资讯进行跳转
  information: function (e) {
      wx.navigateTo({
        url: '/pages/consulting/consulting',
      });
  },

  // 点击众资讯进行跳转web-view
  informationtowebview: function (e) {
    // console.log(e.currentTarget.dataset.srcs);
    wx.navigateTo({
      url: '/pages/web-view/web-view?srcs=' + encodeURIComponent(e.currentTarget.dataset.srcs),
    });
  },

    // 点击关闭公告
  // switchNotice: function () {
  //   this.setData({
  //     hideNotice: true
  //   })
  // },
  //轮播跳转
  bannertoresource:function(e){
    //判断
    if (e.currentTarget.dataset.srcs.indexOf("https://") >= 0 || e.currentTarget.dataset.srcs.indexOf("http://") >= 0) {
      wx.navigateTo({
        url: '/pages/web-view/web-view?srcs=' + encodeURIComponent(e.currentTarget.dataset.srcs),
      });
    }else{
      // console.log(e.currentTarget.dataset.srcs);
      wx.switchTab({
        url: "/pages/manager/manager",
      });
    }
  },
  // 跳转推荐
  nimin: function (e) {
    // console.log(e.currentTarget.dataset.name);
    const {
      accountNumber
    } = this.data;
    if (accountNumber === 0) {
      wx.navigateTo({
        url: '/pages/recommend/recommend?used_name=' + e.currentTarget.dataset.name,
      });
    } else {
    }
  },
  // 点击关闭公告
  switchNotice: function () {
    this.setData({
      hideNotice: true
      // display: none
    })
    // console.log(1)
  },
})