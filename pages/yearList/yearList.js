// pages/yearList/yearList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    monthes:Array.from({length:12}).map((value,index)=>index+1),
    days: Array.from({ length: 31 }).map((value, index) => index + 1)
  },

})