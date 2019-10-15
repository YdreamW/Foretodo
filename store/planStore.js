import Store from './Store'
import Plan from '../models/Plan'

/**
 * PlanStore 类
 */
class PlanStore extends Store {
  constructor() {
    super()
    this.plans = []
    this.key = '__plans__'
    this.__init()
  }

  /**
   * 初始化
   */
  __init() {
    // wx.setStorageSync('__plans_inited__', false)
    // let isInited = wx.getStorageSync('__plans_inited__')
    // if (isInited) return
    this.plans = this.plans.concat([
      new Plan({
        title: "多学一点算法",
        desc: "多刷cf和pta这些网站",
        weight: 3,
      }),
      new Plan({
        title: "多拿一点绩点",
        desc: "上课保证考勤，作业认真完成",
        weight: 3,
      }),
      new Plan({
        title: "多陪一下npy",
        desc: "毕竟比较忙2333333",
        weight: 3,
      })
    ])

    this.save()
    wx.setStorageSync('__plans_inited__', true)
  }

  /**
   * 读取
   */
  read() {
    let plans = wx.getStorageSync(this.key) || []
    this.plans = plans
    this.plans.forEach(plan => plan.beginTime = new Date(plan.beginTime))
    this.plans.forEach(plan => plan.endTime = new Date(plan.endTime))
  }
  /**
   * 保存
   */
  save() {
    wx.setStorageSync(this.key, this.plans)
  }  
  /**
   * 获取计划列表
   */
  getPlans() {
    this.read()
    return this.plans
  }

  /**
   * 根据UUID获取计划
   */
  getPlan(uuid) {
    this.read()
    return this.plans.find((item) => item.uuid === uuid)
  }

  /**
   * 根据索引获取计划
   */
  getPlanByIndex(index) {
    return this.plans[index]
  }

  /**
   * 获取计划索引
   */
  getIndex(plan) {
    return this.plans.indexOf(plan)
  }

  /**
   * 设置计划列表
   */
  setPlans(plans) {
    this.plans = plans
    this.save()
  }

  /**
   * 添加计划
   */
  addPlan(plan) {
    this.plans.push(plan)
  }

  /**
   * 编辑计划
   */
  editPlan(uuid, newPlan) {
    let plan = this.getPlan(uuid)
    if (plan) Object.assign(plan, newPlan)
  }

  /**
   * 删除计划
   */
  removePlan(uuid) {
    let plan = this.getPlan(uuid)
    let index = this.getIndex(plan)
    if (index < 0) return false
    return this.removePlanByIndex(index)
  }

  /**
   * 根据索引删除计划
   */
  removePlanByIndex(index) {
    this.plans.splice(index, 1)
    return true
  }

  
}

export default new PlanStore()