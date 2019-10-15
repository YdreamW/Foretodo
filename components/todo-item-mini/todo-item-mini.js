import Todo from '../../models/Todo'
import util from '../../utils/util'

// components/todo-item/todo-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    todo: {
      type: Todo,
      default: new Todo()
    },

    autoFocus: {
      type: Boolean,
      default: false
    },
    disAbled: {
      type: Boolean,
      default: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    categories: Todo.categories,
    categories_images:["read","exercise","study","social","programming","other"],
    plan_name: "数学复习",
    plan_hours: 13,
    todos: [],
    multiIndex: [0, 0, 0, 0],
    multiArray: [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      ["小时"],
      [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
      ["分钟"]
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCompletedChange(e) {
      let index = e.detail.dataset.index
      let checked = e.detail.data.checked
      this.data.todo.completed = checked
      this.data.todo.completedAt = util.formatTime(new Date())
      this.update()
    },

    handleTitleChange (e) {
      this.data.todo.title = e.detail.value
      this.update()
    },

    handleDateClick (e) {
      console.info(e)
    },
    
    handleTimeClick (e) {
      console.info(e)
    },

    handleDateChange (e) {
      this.data.todo.date = e.detail.value.replace(/\-/g, '/')
      this.update()
    },

    handleTimeChange(e) {
      this.data.todo.time = e.detail.value
      this.update()
    },

    update(data) {
      data = data || this.data
      this.setData(data)
      this.triggerEvent('change', this)
    },
    
    handleTap(e){
      wx.navigateTo({
        url: '../../pages/planmanager/planmanager',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    },

    bindMultiPickerChange(e) {
      let value = e.detail.value,
        hour = this.data.multiArray[0][value[0]] + (this.data.multiArray[2][value[2]]) / 60
      //console.log(hour.toFixed(1))
      try {
        wx.setStorageSync('hours_1', hour.toFixed(1))
      } catch (e) { }

    },
    
  }
})
