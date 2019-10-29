const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  // 点击下拉框弹框箭头
    arrow:true,
    arrowto: false,
   // 导航栏id
    brandTypeId:'',
    brandTypeI:"0",
    one: "1",
    tow:"2",
    there:"3",
    fowr:"4",
    fing:"5",
    sis:"6",
    seven:"7",
    ati:"8",
    // limitBlock: true, //限制弹窗显示

    isChecked1: true,
    brandName: "",
    // 1.0点击下拉菜单
    lists: [
      { typeName: "全部", brandTypeId: "0" }
    ],

    // 2.0封装首推品牌
    shopImgs: [],

    // 3.0 底部上拉
    // data:[],
    pageNum: 1,

    // 4.0我要推荐进行传值
    brandName: '',

    // 上拉底部提示
    loadingMore: false,   //加载更多的显示与隐藏
    loadingOver: false,   //加载完的显示与隐藏

    // 下拉
    select: false,
    // 初始化滑动条数据
    menuIndex: 0,
    // 每个菜单的宽度
    onlyWidth: 70,
    // 右侧的margin
    marginWidth: 10,
    // 菜单总长
    menuWidth: 0,
    aid: [],
    lists: [
      {typeName: "全部",brandTypeId: "0"} 
    ],
  },

  // bindShowMsg


// 点击下拉
  bindShowMsg() {
    this.setData({
      select: !this.data.select,
      arrow:false,
      arrowto:true,
    })
  },
  // 点击上拉
  bindarrow() {
    this.setData({
      select: !this.data.select,
      arrowto: false,
    })
  },
//  已选下拉框
  mySelect(e) {
    // console.log(e)
    var name = e.currentTarget.dataset.name
    this.setData({
      grade_name: name,
      select: false,
    })
  },

// 我要推荐
  torecommends: function (e) {
    // console.log(e.currentTarget.dataset.used_name);
    var that = this;
    
    wx.navigateTo({
      url: '/pages/recommend/recommend?used_name=' + e.currentTarget.dataset.used_name,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        aid: options.id,
      })
    // console.log(this.data.aid)
    // console.log(options.id)

    // 全局请求
    this.setData({
      domain: app.globalData.domain
    })
    var domain = this.data.domain;

    // 1.1导航和下拉导航
    this.navv();

    // 2.0封装首推品牌
    this.brand();


    // 导航滑动
    let that = this;
    let lists = this.data.lists;
    let onlyWidth = this.data.onlyWidth;
    let marginWidth = this.data.marginWidth;
    let menuWidth = lists.length * (onlyWidth + marginWidth) - marginWidth;
    that.setData({
      menuWidth: menuWidth
    })

  },

  // 1.1 封装导航菜单
  navv() {
    var that = this;

    wx.request({
      url: this.data.domain + '/applet/applet/getbrandtypelistbysn',
      method: 'POST',
      data: {
        pageIndex: "1",
        pageSize: "8"
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // console.log(res);
        // 通过 setData 方法设置页面数据更新
        that.setData({
          lists: that.data.lists.concat(res.data.data.dataList),
        });
        // console.log(that.data.lists)
      }
    })
  },

  // 2.0封装品牌图文
  brand() {
    var that = this;
    // console.log(that.data.aid);
    if (that.data.aid === "" || that.data.aid === undefined){
      wx.request({
        url: this.data.domain + '/applet/applet/getbrandlistbysn',
        method: 'POST',
        data: {
          pageIndex: "1",
          pageSize: "99"
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
    }
    else{
      wx.request({
        url: this.data.domain + '/applet/applet/getbrandlistbysn',
        method: 'POST',
        data: {
          brandTypeId: that.data.aid,
          pageIndex: "1",
          pageSize: "99"
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          // console.log(res)
          that.setData({
            shopImgs: res.data.data.dataList
          });
        }
      })
    }
    
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
    // this.setData({
    //   loadingMore: true,
    //   loadingOver: false,
    // })
    // this.shang();
    
  },

  // 点击导航菜单获取id和数据渲染
  jumpIndex: function (e) {
      var ii = e.currentTarget.dataset.menuindex
      this.setData({
        aid: ii
      })
      // console.log(this.data.aid)
      
    var that = this;
    if (e.currentTarget.dataset.id==='0'){
      // 获取全部内容
      wx.request({
        url: this.data.domain + '/applet/applet/getbrandlistbysn',
        method: 'POST',
        data: {
          pageIndex: "1",
          pageSize: "99"
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
    }

    wx.request({
      url: this.data.domain + '/applet/applet/getbrandlistbysn',
      method: 'POST',
      data: {
        brandTypeId: e.currentTarget.dataset.id,
        pageIndex: "1",
        pageSize: "999"
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // console.log(res);
        that.setData({
          shopImgs: res.data.data.dataList
        })
        
      }
    })

  },

// 点击隐藏下拉按钮
  hidearrow(){
    this.setData({
      arrowto: false,
      arrow: true,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})