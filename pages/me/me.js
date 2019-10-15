// pages/me/me.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    login: "block",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list:[
      {
        zh:"时间轴",
        url:"timerShaft/timerShaft"
      },{
        zh: "统计",
        url: "statistics/statistics"
      },{
        zh:"关于",
        url: "about/about"
      },
    ]
  },

  onGotUserInfo: function (e) {
    console.log("nickname=" + e.detail.userInfo.nickName);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      login: "none"
    })
  },
  
  navigateToPage: function (e) {
    var page = e.currentTarget.dataset.page;
    console.log(page)
    wx.navigateTo({
      url: '../' + page + '/' + page,
    })
  },
})