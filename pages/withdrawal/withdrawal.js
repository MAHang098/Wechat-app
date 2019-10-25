// pages/assetsBlock/assetsBlock.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 点击单选按钮
    // 支付宝
    radia:'0',
    // 银行卡号
    cardNumber:'',
    // 开户行
    openBank:'',
    // 开户人姓名
    openPerson:'',
    items: [
      { name: 'USA', value: '支付宝' },
    ],
    item: [
      { name: 'CHN', value: '银行卡' },
    ],

    // 点击提交
    maskBlock: true, //遮罩层显示
    limitBlock: true, //限制弹窗显示
    // 点击支付宝弹框
    Ptreasure: true,
    // 点击银行卡弹框
    Bankcard:true,
    // 点击请选择银行卡
    Bankk: true,
    Bank: true,
    domain: '',  // 域名
    cash_out: 0,
    // 1.0余额
    cost:'',
    // 2.0支付宝填充
    treasure:'',
    // 3.0填充银行卡号
    Addcard: [],
    index: 0,
    freeze:"0",

    // 4.0判断提交
    money: "",
    aliPayName:'',
    aliPayAccount:''

  },

  changeInput(e) {
    let changed = {};
    let prop = e.currentTarget.dataset.prop
    changed[prop] = e.detail.value;
    this.setData(changed)
  },

  //1.0 封装余额
  getSliderData() {
    var that = this;
    // console.log(this.data.domain);
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        console.log(res)
        var userId = res.data
        that.setData({
          userId: userId
        })

        wx.request({
          url: that.data.domain + '/applet/applet/getappletuserscore',
          method: 'POST',
          data: {
            userId: res.data,
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            // console.log(res);
            // const {
            //   a
            // } = res.data.data;
            // 通过 setData 方法设置页面数据更新
            that.setData({
              cost: res.data.data.cost,
              freeze: res.data.data.freeze
            });
          }
        })
      }
    })
  },

// 2.0封装支付宝账号
  treasure() {
    var that = this;
    // console.log(this.data.domain);
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        console.log(res)
        var userId = res.data
        that.setData({
          userId: userId
        })
        wx.request({
          url: that.data.domain + '/applet/applet//getbindbankcardalipaypd',
          method: 'POST',
          data: {
            userId: res.data,
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res);
            // const {
            //   a
            // } = res.data.data;
            // 通过 setData 方法设置页面数据更新
            that.setData({
              treasure: res.data.data,
              aliPayName: res.data.data.alipayName,
              aliPayAccount: res.data.data.alipayAccount
            });
            // console.log(that.data.treasure)
          }
        })
      }
    })
    
    
  },

// 3.0封装点击选择银行卡显示的卡号
  addCar() {
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        console.log(res)
        var userId = res.data
        that.setData({
          userId: userId
        })

        wx.request({
          url: that.data.domain + '/applet/applet//getbindbankcardalipaypd',
          method: 'POST',
          data: {
            userId: res.data,
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            // console.log(res);

            that.setData({
              Addcard: res.data.data.bankCardList
            });
            console.log(that.data.Addcard)
          }
        })
      }
    })
    // console.log(this.data.domain);
    
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


    // 2.0 填充支付宝信息
    this.treasure();
    // 3.0填充银行卡号
    this.addCar();
  },

  // 点击提现弹框菜单
  bun: function () {
    var that = this;
    // console.log(this.data.domain);
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        console.log(res)
        var userId = res.data
        that.setData({
          userId: userId
        })
        wx.request({
          url: that.data.domain + '/applet/applet/getbindbankcardalipaypd',
          method: 'POST',
          data: {
            userId: res.data,
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            // console.log(res);
            // 判读是否绑定银行卡
            if (res.data.data.bankCardPd === "0" && res.data.data.aLiPayPd === "0") {
              that.setData({
                maskBlock: false,
                limitBlock: false,
              })
            } else {
              console.log(that.data.money);
              if (that.data.money === "" || that.data.money === null) {
                wx.showToast({
                  title: '提现金额不能为空',
                  icon: 'none'
                });
              } else {
                if (parseInt(that.data.money) > parseInt(that.data.cost)) {
                  wx.showToast({
                    title: '余额不足',
                    icon: 'none'
                  });
                  // console.log(that.data.money)
                } else if (parseInt(that.data.money) < 100){
                  wx.showToast({
                    title: '必须大于100元',
                    icon: 'none'
                  });
                }else {
                  if (that.data.radia === "0") {
                    wx.showToast({
                      title: '请选择体现方式',
                      icon: 'none'
                    });
                    console.log(that.data.radio)
                  } else{
                    console.log(that.data.radia);
                    if (that.data.radia == '1') {
                      console.log("支付宝支付");
                      wx.getStorage({
                        key: 'userId',
                        success: function (res) {
                          console.log(res)
                          var userId = res.data
                          that.setData({
                            userId: userId
                          })
                          console.log(that.data.aliPayName);
                          wx.request({
                            url: 'https://www.zhongjubang.com/api/applet/applet/adduserwithdraws',
                            method: 'post',
                            data: {
                              userId: res.data,
                              aliPayName: that.data.aliPayName,
                              aliPayAccount: that.data.aliPayAccount,
                              type: 1,
                              money: that.data.money,
                            },
                            header: {
                              "Content-Type": "application/x-www-form-urlencoded"
                            },
                            success: function (res) {
                              console.log(res);
                              if (res.data.code === "200") {
                                wx.showToast({
                                  title: '提现成功',
                                  icon: 'none'
                                });
                                that.getSliderData();
                              }
                            }

                          })

                        }
                      })

                      
                      // console.log(that.data.radio)
                    }else if (that.data.radia == '2') {
                      console.log("银行卡支付");
                      wx.getStorage({
                        key: 'userId',
                        success: function (res) {
                          console.log(res)
                          var userId = res.data
                          that.setData({
                            userId: userId
                          })
                          wx.request({
                            url: 'https://www.zhongjubang.com/api/applet/applet/adduserwithdraws',
                            method: 'post',
                            data: {
                              userId: res.data,
                              type: 2,
                              money: that.data.money,
                              cardNumber: that.data.cardNumber,
                              openPerson: that.data.openPerson,
                              openBank: that.data.openBank
                            },
                            header: {
                              "Content-Type": "application/x-www-form-urlencoded"
                            },
                            success: function (res) {
                              console.log(res);
                              if (res.data.code==="200"){
                                wx.showToast({
                                  title: '提现成功',
                                  icon: 'none'
                                });
                                that.getSliderData();
                              }
                            }

                          })
                        }
                      })
                    }
                  }
                }
              }

            }
          }
        })
      }
    })
    

  },

  // 点击支付宝单选框
  treasur: function (e) {
    console.log(e);
    this.setData({
      Ptreasure: false,
      Bankcard:true,
      radia: 1,
    })
    console.log(this.data.radia)
  },
  // 点击银行卡单选框
  Bankcard: function () {
    this.setData({
      Bankcard: false,
      Ptreasure: true,
      radia: 2,
    })
    console.log(this.data.radia);
    this.data.Addcard[0];
    this.setData({
      // .cardNumber
      cardNumber: this.data.Addcard[0].cardNumber,
      openPerson: this.data.Addcard[0].openPerson,
      openBank: this.data.Addcard[0].openBank,
    })
  },
  bindPickerChange(e) {
    
    console.log(this.data.Addcard[e.detail.value])
    this.setData({
      // .cardNumber
      index: e.detail.value,
      cardNumber: this.data.Addcard[e.detail.value].cardNumber,
      openPerson: this.data.Addcard[e.detail.value].openPerson,
      openBank: this.data.Addcard[e.detail.value].openBank,
    })
    this.setData({
      domain: app.globalData.domain
    })
    var domain = this.data.domain;
    var that = this;
  },
  // 点击删除提交弹框菜单
  delete: function () {
    this.setData({
      maskBlock: true,
      limitBlock: true, 
    })
  },
  // 点击删除请选择银行卡弹框菜单
  del: function() {
    this.setData({
      Bank: true,
      Bankk: true,
    })
  },

  // 点击确定的时候把银行卡填充


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 1.0余额显示
    this.getSliderData();

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

  /**
   * 提现条件判断
   */
  cashCondition: function () {

  }
})