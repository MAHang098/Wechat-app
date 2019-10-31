// pages/grab-order/grab-order.js
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		search: '',
		orerList: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
		that.setData({
			search: that.search.bind(that)
		});

		wx.request({
			url: app.globalData.domain + 'admin/applet/gethaslist',
			method: 'POST',
			data: {
				pageIndex: 1,
				pageSize: 100,
        search: ''
			},
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			success: function (res) {
				if (res.data.code == 200) {
					var data = res.data.data;
					that.setData({
						orerList: data.dataList
					});
				}
			}
		})
	},
  // 实时搜索
	search: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.domain + 'admin/applet/gethaslist',
      method: 'POST',
      data: {
        pageIndex: 1,
        pageSize: 100,
        search: e.detail.value
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data.code == 200) {
          var data = res.data.data;
          that.setData({
            orerList: data.dataList
          });
        }
      }
    })
	},
  // input失去焦点
  searchBlur: function() {

  },
  // 跳转到订单详情
  goOrderDetail: function(e) {
    var grabSheetId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../orderDetails/orderDetails?grabSheetId=' + grabSheetId
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

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})