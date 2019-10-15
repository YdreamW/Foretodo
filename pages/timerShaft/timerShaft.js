// pages/timerShaft/timerShaft.js

import todoStore from '../../store/todoStore.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    completedTodos:[],
  
  },
  onShow: function () { 
    this.setData({
      completedTodos: todoStore.getTodos()
    })
  },
})