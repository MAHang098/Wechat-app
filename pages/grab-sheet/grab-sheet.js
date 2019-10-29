// pages/grab-sheet/grab-sheet.js
const util = require('../../utils/util.js');

const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		domain: '', // 域名
		isShowModal: false, // 是否显示模态窗
		currentData: 0, // 当前的索引
		isShowImg: false,
		grabList: [],
		userId: '', // 用户id
		grabSheetId: '', // 抢单表id
		visible: true, // true（立即抢单） false（抢单成功）
		sheerOrder: 0 // 已抢订单人数
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
		var time = util.formatDate(new Date());
		wx.getStorage({
			key: 'userId',
			success: function (res) {
				that.setData({
					userId: res.data
				});
			},
		})
		wx.request({
			url: app.globalData.domain + 'admin/applet/getgrabsheettop',
			method: 'POST',
			data: {
				pageIndex: 1,
				pageSize: 100,
				shelfTime: '2019-10-28 00:00:00'
			},
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			success: function (res) {
				if (res.data.code == 200) {
					var data = res.data.data;
					that.setData({
						grabList: data.dataList
					});

				}
			}
		});
		wx.request({
			url: app.globalData.domain + 'admin/applet/gethaslist',
			method: 'POST',
			data: {
			  pageIndex: 1,
			  pageSize: 100
			},
			header: {
			  "Content-Type": "application/x-www-form-urlencoded"
			},
			success: function (res) {
			  if (res.data.code == 200) {
				var data = res.data.data;
				that.setData({
					sheerOrder: data.dataList.length
				});
			  }
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

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},
	// 显示弹窗
	sheetGrab: function (e) {
		var that = this;
		that.setData({
			isShowModal: true,
			grabSheetId: e.currentTarget.dataset.id
		})
	},
	isOKOrder: function () {
		var that = this;
		// that.setData({
		//   visible: !that.data.visible
		// })
		// console.log(that.data.grabSheetId, that.data.userId);
		wx.request({
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			url: app.globalData.domain + 'admin/applet/addusergrabsheet',
			method: 'POST',
			data: {
				userId: that.data.userId,
				grabSheetId: that.data.grabSheetId
			},
			success: function (res) {
				console.log(res)
				if (res.data.code == 200) {
					that.setData({
						isShowModal: false,
						visible: !that.data.visible
					})
				}
			}
		})
	},
	clickExplain: function () {
		this.setData({
			isShowImg: true
		})
	},
	// 隐藏弹窗
	hideModal: function () {
		this.setData({
			isShowModal: false
		});
		this.setData({
			isShowImg: false
		})
	},
	// 切换选项卡
	checkCurrent: function (e) {
		const that = this;

		if (that.data.currentData === e.target.dataset.current) {
			return false;
		} else {

			that.setData({
				currentData: e.target.dataset.current
			})
		}
	},
	// 跳转到已抢订单
	goSheetOrder: function () {
		wx.navigateTo({
			url: '../grab-order/grab-order'
		})
	},
	// 跳转到历史订单
	goHistoryOrder: function () {
		wx.navigateTo({
			url: '../history-order/history-order'
		})
	}
})