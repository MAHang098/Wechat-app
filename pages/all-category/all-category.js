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
    items: '',
    currentItem: 0,
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
    console.log(options.id)
      this.setData({
        aid: options.id,
      })
    // console.log(options.id)

    

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
      url: app.globalData.domain + '/applet/applet/getbrandtypelistbysn',
      method: 'POST',
      data: {
        pageIndex: "1",
        pageSize: "8"
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // 通过 setData 方法设置页面数据更新
        console.log(res)
        that.setData({
          lists: that.data.lists.concat(res.data.data.dataList),
          items: 'items' + that.data.aid,
          currentItem: that.data.aid
        });
      }
    })
  },

  // 2.0封装品牌图文
  brand() {
    let that = this;
    let params = {
      pageIndex: "1",
      pageSize: "999",
      brandTypeId: that.data.aid
    }
    if (that.data.aid === "" || that.data.aid === undefined) {
      params.brandTypeId = '';
    }
    console.log(that.data.aid != "" || that.data.aid != undefined)
    wx.request({
      url: app.globalData.domain + '/applet/applet/getbrandlistbysn',
      method: 'POST',
      data:params,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // 通过 setData 方法设置页面数据更新
        that.setData({
          shopImgs: res.data.data.dataList
        });
      }
    })
  },

  // 点击导航菜单获取id和数据渲染
  jumpIndex: function (e) {
    let id = e.currentTarget.dataset.id;
    let that = this;
    that.setData({
      currentItem: id,
      items: 'items' + id,
    })
    let params = {
      pageIndex: "1",
      pageSize: "999"
    }
    if (e.currentTarget.dataset.id != '0') {
      params.brandTypeId = e.currentTarget.dataset.id
    }
    wx.request({
      url: app.globalData.domain + '/applet/applet/getbrandlistbysn',
      method: 'POST',
      data: params,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        that.setData({
          shopImgs: res.data.data.dataList
        })

      }
    })
  },
  // 选择下拉框下的品牌
  selectBrand: function(e) {
    let id = e.currentTarget.dataset.id;
    let that = this;
    let params = {
      pageIndex: "1",
      pageSize: "999"
    }
    if (e.currentTarget.dataset.id != '0') {
      params.brandTypeId = e.currentTarget.dataset.id
    }
    wx.request({
      url: app.globalData.domain + '/applet/applet/getbrandlistbysn',
      method: 'POST',
      data: params,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        that.setData({
          shopImgs: res.data.data.dataList
        })
        that.setData({
          currentItem: id,
          items: 'items' + id,
          select: !that.data.select,
          arrowto: false,
        });
      }
    })
  }
})