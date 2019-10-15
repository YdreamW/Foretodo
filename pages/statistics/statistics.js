// pages/statistics/statistics.js
import wxCharts from '../../utils/wxcharts'
import todoStore from '../../store/todoStore'
import noteStore from '../../store/noteStore'
import targetStore from '../../store/targetStore.js'
import PlanManager from '../../utils/planManager.js'
import util from '../../utils/util.js'

const app = getApp()

var ringChart = null//chartA
var lineChart = null//chartB
var startPos = null
var radarChart = null//chartC

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: app.globalData.userInfo,
    windowWidth: 320,

    todosCount: 0,
    todosUncompletedCount: 0,
    todosCompletedCount: 0,
    notesCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户信息
    this.data.userInfo = Object.assign({
      avatarUrl: '../../assets/img/logo.png',
      nickName: '未知用户'
    }, app.globalData.userInfo)

    // 获取系统消息
    try {
      var res = wx.getSystemInfoSync();
      this.data.windowWidth = res.windowWidth;
      console.log("windowWidth:", res.windowWidth, "windowHeight:", res.windowHeight);
    } catch (e) {
      console.error('err: getSystemInfoSync failed!');
    }

    // update
    this.update()
  },

  syncData() {
    // 获取清单笔记信息
    this.data.todosCount = todoStore.getTodos().length
    this.data.todosCompletedCount = todoStore.getCompletedTodos().length
    this.data.todosUncompletedCount = todoStore.getUncompletedTodos().length
    this.data.notesCount = noteStore.getNotes().length

    // update
    this.update()
  },

  update(data) {
    data = data || this.data
    this.setData(data)
  },

  onReady() {
    this.renderChartsC()
  },

  onShow() {
    this.syncData()
  },
  
  renderChartsC(){
    var chartsData = this.getChartsCData()
    if(chartsData.data.length > 0){
      lineChart = new wxCharts({
        canvasId: 'chartsC',
        type: 'radar',
        categories: chartsData.categories,
        animation: true,
        series: [{
          name: '目标达成率',
          data: chartsData.data,
        }],
        width: this.data.windowWidth,
        height: 200,
        dataLabel: true,
        dataPointShape: true,
        extra: {
          radar: {
            max: 100
          }
        }
      });
    } else {
      //do nothing!
    }
  },
  
  getChartsCData(){
    var categories = []
    var data = []
    var targets = targetStore.getTargets()
    targets.forEach((target)=>{
      var plans = (new PlanManager()).filterByTargetId(target.uuid)
      var plansNumber = plans.length ?  plans.length : 1
      var completedPlans = plans.filter(plan => plan.completed == true)
      categories.push(target.title)
      data.push(completedPlans.length / plansNumber*100) /*这里*100主要是上面的雷达图的最大值为100，为rendarChartC函数中的extra的radar的max属性。*/
    })
    return {
      categories: categories,
      data: data
    }
  }
})