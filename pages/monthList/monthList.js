// pages/flex/index.js
var generateArray =  function (n) {
  return Array.from({length:n}).map((value,index)=>index+1);
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: generateArray(35)
  },

  handleAddTodo(e) {
    wx.navigateTo({
      url: '../addTodo/addTodo'
    })
  },

})