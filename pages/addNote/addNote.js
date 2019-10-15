// pages/note/create.js
import Note from '../../models/Note'
import noteStore from '../../store/noteStore'
import util from '../../utils/util.js'
import targetStore from '../../store/targetStore.js'
import planStore from '../../store/planStore.js'
import PlanManager from '../../utils/planManager.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    edit: false,
    note: new Note(),
    plans: [],
    planIndex: 0,
    plansTitles: [],
    treeStatus: [
      {value: "sapling", name: "树苗", checked: false},
      {value: "tree", name: "大树", checked: false}
    ],
    premix: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    noteStore.read()

    this.data.targets = targetStore.getTargets()
    this.data.plans = planStore.getPlans()
    this.data.targetsTitles = this.data.targets.map(value => value.title)
    this.data.plansTitles = this.data.plans.map(value => value.title)

    // 是否编辑
    if (options.uuid) {
      this.data.edit = true
      let editNote = noteStore.getNote(options.uuid)
      this.data.note = new Note(editNote)
      wx.setNavigationBarTitle({
        title: '维护这棵树',
      })
    } else {
      this.data.note = new Note()
    }

    this.update()

    var treeStatus = this.data.treeStatus
    if (this.data.note.isComplete)
      treeStatus[1].checked = true
    else
    {
      treeStatus[0].checked = true
      this.setData({premix:'in'})
    }
    this.setData({treeStatus: treeStatus})
  },

  /**
   * 内容输入事件
   */
  handleTitleChange(e) {
    this.data.note.title = e.detail.value
    this.update()
  },

  /**
   * 内容输入事件
   */
  handleContentChange(e) {
    this.data.note.content = e.detail.value
    this.update()
  },

  /**
   * 取消按钮点击事件
   */
  handleCancelTap(e) {
    wx.navigateBack()
  },

  /**
   * 保存按钮点击事件
   */
  handleSaveTap(e) {
    if (this.data.note.content && this.data.note.title) {
      if (this.data.edit) {
        noteStore.editNote(this.data.note.uuid, this.data.note)
      } else {
        noteStore.addNote(this.data.note)
      }
      this.update()
      noteStore.save()
      wx.navigateBack()
      wx.showToast({ title: '保存成功' })
    } else {
      wx.showModal({
        title: '无法添加笔记',
        content: '请不要留下空格',
        showCancel: true,
        cancelText: 'ok',
        cancelColor: '',
        confirmText: '好的',
        confirmColor: '',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },

  /**
   * 更新数据
   */
  update(data) {
    data = data || this.data
    this.setData(data)
  },

  handleDeleteTap(e) {
    if (this.data.edit) {
      let that = this;
      wx.showModal({
        title: '砍伐确认',
        content: '您确定要砍掉这棵树吗？',
        showCancel: true,
        cancelText: '留下',
        cancelColor: '',
        confirmText: '砍伐',
        confirmColor: '',
        success: function (res) {
          if (res.confirm) {
            noteStore.removeNote(that.data.note.uuid)
            noteStore.save()
            wx.navigateBack({
              delta: 1,
            })
            wx.showToast({
              title: '树已砍伐',
              icon: '',
              image: '',
              duration: 1000,
              mask: true,
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          } else if (res.cancel) {
            wx.showToast({
              title: '树被留下',
              icon: '',
              image: '',
              duration: 1000,
              mask: true,
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      wx.navigateBack()
    }
  },

  radioChange(e){
    const treeStatus = this.data.treeStatus
    for (let i = 0, len = treeStatus.length; i < len; ++i) {
      treeStatus[i].checked = treeStatus[i].value === e.detail.value
    }
    if(treeStatus[1].checked){
      console.log("It's a tree")
      this.setData({ premix: ""})
      this.data.note.isComplete = true
    }
    else{
      console.log("It's a sapling")
      this.setData({ premix: "in"})
      this.data.note.isComplete = false
    }
    this.setData({treeStatus})
  }
})