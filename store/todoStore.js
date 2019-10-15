import util from '../utils/util'
import Store from './Store'
import Todo from '../models/Todo'

/**
 * NoteStore 类
 */
class TodoStore extends Store {
  constructor() {
    super()
    this.todos = []
    this.key = '__todos__'
    this.__init()
  }

  /**
   * 初始化
   */
  __init() {
    //wx.setStorageSync('__todos_inited__', false)
    let isInited = wx.getStorageSync('__todos_inited__')
    if (isInited) return
    this.todos = this.todos.concat([new Todo({
      title: 'c语言复习',
      completed: false,
      level: 1,
      category: 1,
      createdAt: new Date(),
      time: new Date()
    }), new Todo({
      title: '长按可删除任务',
      completed: false,
      level: 4,
      category: 1,
      createdAt: new Date(),
      time: new Date()
    }), new Todo({
      title: '测试工作结束',
      completed: true,
      level: 4,
      category: 1,
      date: new Date('2019/08/17'),
      createdAt: new Date(),
      completedAt: new Date('2019/08/17'),
      time: new Date()
    }), new Todo({
        title: '静态页面组建完成',
        completed: true,
        level: 4,
        category: 1,
        date: new Date('2019/08/05'),
        createdAt: new Date(),
        completedAt: new Date('2019/08/06'),
        time: new Date()
    }), new Todo({
        title: '基本框架完成',
        completed: true,
        level: 4,
        category: 1,
        date: new Date('2019/08/12'),
        createdAt: new Date(),
        completedAt: new Date('2017/08/12'),
        time: new Date()
    }), new Todo({
        title: '初步UI设计完成',
        completed: true,
        level: 4,
        category: 1,
        date: new Date('2019/07/29'),
        createdAt: new Date(),
        completedAt: new Date('2019/07/29'),
        time: new Date()
      })])
    this.save()
    wx.setStorageSync('__todos_inited__', true)
  }

  /**
   * 获取 todos
   */
  getTodos() {
    this.read()
    return this.todos
  }

  /**
   * 获取 Todo
   */
  getTodo(uuid) {
    this.read()
    return this.todos.find((item) => item.uuid === uuid)
  }

  /**
   * 获取索引
   */
  getIndex(todo) {
    return this.todos.indexOf(todo)
  }

  /**
   * 获取未完成的 todos
   */
  getUncompletedTodos () {
    return this.todos.filter(item => !item.completed)
  }

  /**
   * 获取已完成的 todos
   */
  getCompletedTodos() {
    return this.todos.filter(item => item.completed)
  }

  /**
   * 获取今天完成的 todos
   */
  getTodayCompletedTodos () {
    let todos = this.getCompletedTodos()
    let date = util.formatTime(new Date())
    return todos.filter(item => item.completedAt === date)
  }

  /**
   * 设置
   */
  setTodos(todos) {
    this.todos = todos
    this.save()
  }

  /**
   * 清空
   */
  clearTodos() {
    this.todos = []
  }

  /**
   * 添加
   */
  addTodo(todo) {
    this.todos.push(todo)
  }

  /**
   * 根据uuid删除
   */
  removeTodo(uuid) {
    let todo = this.getTodo(uuid)
    let index = this.getIndex(todo)
    if (index < 0) return false
    return this.removeTodoByIndex(index)
  }

  /**
   * 根据索引删除
   */
  removeTodoByIndex(index) {
    this.todos.splice(index, 1)
    return true
  }

  /**
   * 获取日期统计数据
   */
  getStatisticsByDate () {
    let result = []
    let todos = this.getCompletedTodos()
    let temp = {}
    todos.forEach((item) => {
      temp[item.completedAt] = temp[item.completedAt] ? temp[item.completedAt] + 1 : 1
    })
    for (let key in temp) {
      result.push({
        completedAt: key,
        count: temp[key]
      })
    }
    result = result.sort((a, b) => (a.completedAt > b.completedAt))
    return result
  }

  /**
   * 读取
   */
  read() {
    let todos = wx.getStorageSync(this.key) || []
    this.todos = todos
    this.todos.forEach(todo => todo.beginTime = new Date(todo.beginTime))
    this.todos.forEach(todo => todo.endTime = new Date(todo.endTime))
    this.todos.forEach(todo => console.log("type:",typeof(todo.beginTime)))
  }

  /**
   * 保存
   */
  save() {
    wx.setStorageSync(this.key, this.todos)
  }

  updateTodo(todo) {
    Object.assign(this.todos.find((item) => item.uuid === todo.uuid),todo);
  }

  editTodo(uuid, newTodo) {
    let todo = this.getTodo(uuid)
    if (todo) Object.assign(todo, newTodo)
  }

}

export default new TodoStore()