// pages/todoCard/todoCard.js

import todoStore from '../../store/todoStore.js'
import planStore from '../../store/planStore.js'
import targetStore from '../../store/targetStore.js'

let offset = 0
let touchStartX
let touchStartY
let touchEndX
let touchEndY

Page({

  /**
   * 页面的初始数据
   */
  data: {
    animation: {},
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    todos: [],
    todoBeginTimes:[],
    todoEndTimes: [],
    todoTargetTitles: [],
    todoPlanTitles: [],
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let todos = todoStore.getTodos()
    let todoBeginTimes = todos.map(todo => todo.beginTime.toLocaleString())
    let todoEndTimes = todos.map(todo => todo.endTime.toLocaleString())
    let todoTargetTitles = todos.map(function(todo){
      if (todo.targetId != null){
        return targetStore.getTarget(todo.targetId).title
      } else {
        return ""
      }
    })
    let todoPlanTitles = todos.map(function(todo){
      if (todo.planId != null) {
        return planStore.getPlan(todo.planId).title
      } else {
        return ""
      }
    })
    this.setData({
      todos: todos,
      todoBeginTimes: todoBeginTimes,
      todoEndTimes: todoEndTimes,
      todoTargetTitles: todoTargetTitles,
      todoPlanTitles: todoPlanTitles,
    })
    console.log(this.data.todos)
    console.log(this.data.todoBeginTimes)
    console.log(this.data.todoEndTimes)
    console.log(this.data.todoTargetTitles)
    console.log(this.data.todoPlanTitles)

  },
  handleLButTap: function (e) {
    let animation = wx.createAnimation(
      {
        duration: 400,
        timingFunction: 'ease'
      })
    if (offset > 1 - this.data.todos.length) offset--
    animation.translateX(wx.getSystemInfoSync().screenWidth * offset).step()
    this.setData({
      animation: animation.export()
    })
  },

  handleRButTap: function (e) {
    let animation = wx.createAnimation(
      {
        duration: 400,
        timingFunction: 'ease',
      })
    if (offset < 0) offset++
    animation.translateX(wx.getSystemInfoSync().screenWidth * offset).step()
    this.setData({
      animation: animation.export()
    })
  },

  handleTouchStart: function (e) {
    touchStartX = e.changedTouches[0].clientX
    touchStartY = e.changedTouches[0].clientY

  },

  handleTouchMove: function (e) {
  },

  handleTouchEnd: function (e) {
    touchEndX = e.changedTouches[0].clientX
    touchEndY = e.changedTouches[0].clientY

    if (touchEndX > touchStartX + 20) this.handleRButTap()
    else if (touchEndX < touchStartX - 20) this.handleLButTap()
  }
})