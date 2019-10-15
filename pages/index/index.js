const app = getApp()

// views/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  onLoad: function (options) {
    this.openPage()
  },

  /**
   * 导航到主页面
   */
  openPage (replace) {
    let options = { url: '../calendar/calendar' }// 导航
    wx.switchTab(options)
  }
})