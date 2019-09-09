//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: ['https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'],
    itemNew: ['新的订单来自让托尼吗，1秒前', '新的订单来自梭黑东，8秒前', '新的订单来自坤前钊，12秒前'],
    flag: true,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //分享打开和关闭
  listenerActionSheet: function () {
    if (app.globalData.isLog === false)
      this.setData({ isAuto: true, iShidden: false });
    else
      this.setData({ actionSheetHidden: !this.data.actionSheetHidden })
  },
  //隐藏海报
  posterImageClose: function () {
    this.setData({ posterImageStatus: false, })
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  show: function(){
    this.setData({ flag: false });
  },
  hide: function () {
    this.setData({ flag: true });
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
