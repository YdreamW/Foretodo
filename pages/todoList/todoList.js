// pages/todo/todo.js

// pages/home/home.js
import Todo from '../../models/Todo'
import todoStore from '../../store/todoStore'
import TodoManager from '../../utils/todoManager'

//获取应用实例
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // todos
    todos: [],

    // todo 计数
    uncompletedCount: 0,
    completedCount: 0,

    // 是否动画延迟
    delay: true,

    orders: ["时间", "类别", "优先级","默认"]
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 为了新建后列表能更新，此逻辑必须写在 onShow 事件
    this.syncData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.syncData()
  },

  //自定义方法


  /**
   * 同步数据
   */
  syncData() {
    // 获取列表
    this.data.todos = todoStore.getTodos()
    this.update()
    // 更新置顶标题
    let uncompletedCount = todoStore.getUncompletedTodos().length
    let todayCompletedCount = todoStore.getTodayCompletedTodos().length
    let title = ['TodoList（进行中: ', uncompletedCount, ', 今日已完成: ', todayCompletedCount, '）'].join('')
    wx.setTopBarText({ text: title })
    // 动画结束后取消动画队列延迟
    setTimeout(() => {
      this.update({ delay: false })
    }, 2000)
  },

  /**
   * Todo 数据改变事件
   */
  handleTodoItemChange(e) {
    let index = e.currentTarget.dataset.index
    let todo = e.detail.data.todo
    let item = this.data.todos[index]
    Object.assign(item, todo)
    this.update()
  },

  /**
   * Todo 长按事件
   */
  handleTodoLongTap(e) {
    // 获取 index
    let index = e.currentTarget.dataset.index
    wx.showModal({
      title: '删除提示',
      content: '确定要删除这项任务吗？',
      success: (e) => {
        if (e.confirm) {
          this.data.todos.splice(index, 1)
          this.update()
        }
      }
    })
  },

  /**
   * 更新数据
   */
  update(data) {
    data = data || this.data
    data.completedCount = todoStore.getCompletedTodos().length
    data.uncompletedCount = todoStore.getUncompletedTodos().length
    this.setData(data)
  },

  /**
   * 新建事件
   *  */
  handleAddTodo(e) {
    wx.navigateTo({
      url: '../addTodo/addTodo'
    })
  },
  

  handleTap(e) {
    let uuid = e.currentTarget.dataset.uuid
    console.log(todoStore.getTodo(uuid))
    console.log(uuid)
    wx.navigateTo({
      url: '../planmanager/planmanager?uuid=' + uuid,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  handOrderTap(e) {
    this.fuck = this.selectComponent("#fuck")
    console.log(this.fuck)
    console.log(this.fuck.properties == this.fuck.fata)
  },

  handleOrderBy(e) {
    let todoManager = new TodoManager(this.data.todos)
    console.log(e.detail)
    switch (e.detail.index) {
      case 0:
        this.setData({
          todos: todoManager.todoOrder(todoManager.orderTags[2], e.detail.direction)//按日期和时间排序
        })
        break
      case 1:
        this.setData({
          todos: todoManager.todoOrder(todoManager.orderTags[3], e.detail.direction)//按类别排序
        })
        break
      case 2:
        this.setData({
          todos: todoManager.todoOrder(todoManager.orderTags[4], e.detail.direction)//按优先级排序
        })
        break
      case 3:
        this.setData({
          todos: todoManager.todoOrder(todoManager.orderTags[5], e.detail.direction)//按优先级排序
        })
        break
    }
  }
})