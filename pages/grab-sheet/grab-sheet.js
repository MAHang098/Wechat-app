// pages/grab-sheet/grab-sheet.js
const util = require('../../utils/util.js');

const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		domain: '', // 域名
		isShowModal1: false, // 是否显示模态窗
    isShowModal2: false,
		currentData: 0, // 当前的索引
		isShowImg: false,
		grabList: [],
		userId: '', // 用户id
		grabSheetId: '', // 抢单表id
		visible: true, // true（立即抢单） false（抢单成功）
		sheerOrder: 0, // 已抢订单人数
    memberTime: ''  // 会员有效期
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
	
		wx.getStorage({
			key: 'userId',
			success: function (res) {
				that.setData({
					userId: res.data
				});
        that.init();
			},
		})
	},
  // 请求今日抢单数据
  init: function() {
    var that = this;
    var time = util.formatDate(new Date());
    wx.request({
      url: app.globalData.domain + 'admin/applet/getgrabsheettop',
      method: 'POST',
      data: {
        pageIndex: 1,
        pageSize: 100,
        shelfTime: time,
      
        userId: that.data.userId
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
    // 获取当前用户是否时会员   2(会员)   1（不是会员）
    wx.request({
      url: app.globalData.domain + 'applet/applet/getappletuservippdgradeidpd',
      method: 'POST',
      data: { userId: that.data.userId },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data.code == 200) {
          // wx.navigateTo({
          //   url: '../grab-sheet/grab-sheet'
          // })
          var data = res.data.data;
          // 如果时会员进入抢单页面否则进入充值页面
          if (data.memberStatus == 2) {
            
            that.setData({
              isShowModal1: true,
              grabSheetId: e.currentTarget.dataset.id
            })
          } else {
            // wx.navigateTo({
            //   url: '../interests/interests'
            // })
            that.setData({
              isShowModal2: true
            })
          }
        }
      }
    })
		
	},
  // 加入会员
  joinMember: function() {
    wx.navigateTo({
      url: '../interests/interests'
    })
  },
	isOKOrder: function (e) {
    console.log(e)
		var that = this;
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
          var data = res.data.data;
          if (data.state == 0) {
            wx.showToast({
              title: '抢单失败',
              icon: 'success',
              duration: 2000//持续的时间
            })
          } else if (data.state == 1) {
            wx.showToast({
              title: '已保护',
              icon: 'success',
              duration: 2000//持续的时间
            })
          } else if (data.state == 2) {
            wx.showToast({
              title: '该用户已抢订单',
              icon: 'success',
              duration: 2000//持续的时间
            })
          } else {
            wx.showToast({
              title: '抢单成功',
              icon: 'success',
              duration: 2000//持续的时间
            });
          }
          that.setData({
            isShowModal1: false
          });
          that.init();
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
			isShowModal1: false,
      isShowModal2: false
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

    if (that.data.currentData == 1) {
      // 个人中心-已抢订单列表
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
      });

      // 获取会员截止日期
      wx.request({
        url: app.globalData.domain + 'applet/applet/getappletuservippdgradeidpd',
        method: 'POST',
        data: {
          pageIndex: 1,
          pageSize: 100,
          userId: that.data.userId
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          if (res.data.code == 200) {
            var data = res.data.data;
            that.setData({
              memberTime: data.memberTime
            });
          }
        }
      });
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