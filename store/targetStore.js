import Store from './Store'
import Target from '../models/Target'

/**
 * TargetStore 类
 */
class TargetStore extends Store {
  constructor() {
    super()
    this.targets = []
    this.key = '__targets__'
    this.__init()
  }

  /**
   * 初始化
   */
  __init() {
    // wx.setStorageSync('__targets_inited__', false)
    let isInited = wx.getStorageSync('__targets_inited__')
    if (isInited) return
    this.targets = this.targets.concat([
        new Target({
        title: "找一个实习",
        desc: "大二不知道能不能找到实习呢。。。",
        weight: 5,
        endTime: new Date(2018,6,10)
    }), new Target({
        title: "拿到奖学金",
        desc: "新年新气象，先拿到一万块再说",
        weight: 5,
        endTime: new Date(2038, 3, 15)
    }), new Target({
        title: "找到npy",
        desc: "结束单身狗的debuff",
        weight: 5,
        endTime: new Date(2020, 2, 12)
    }), 
    ])
    this.save()
    wx.setStorageSync('__targets_inited__', true)
  }

  /**
   * 获取目标列表
   */
  getTargets() {
    this.read()
    return this.targets
  }

  /**
   * 根据UUID获取目标
   */
  getTarget(uuid) {
    this.read()
    return this.targets.find((item) => item.uuid === uuid)
  }

  /**
   * 根据索引获取目标
   */
  getTargetByIndex(index) {
    return this.targets[index]
  }

  /**
   * 获取目标索引
   */
  getIndex(target) {
    return this.targets.indexOf(target)
  }

  /**
   * 设置目标列表
   */
  setTargets(targets) {
    this.targets = targets
    this.save()
  }

  /**
   * 添加目标
   */
  addTarget(target) {
    this.targets.push(target)
  }

  /**
   * 编辑目标
   */
  editTarget(uuid, newTarget) {
    let target = this.getTarget(uuid)
    if (target) Object.assign(target, newTarget)
  }

  /**
   * 删除目标
   */
  removeTarget(uuid) {
    let target = this.getTarget(uuid)
    let index = this.getIndex(target)
    if (index < 0) return false
    return this.removeTargetByIndex(index)
  }

  /**
   * 根据索引删除目标
   */
  removeTargetByIndex(index) {
    this.targets.splice(index, 1)
    return true
  }

  /**
   * 读取
   */
  read() {
    let targets = wx.getStorageSync(this.key) || []
    this.targets = targets
    this.targets.forEach(target => target.beginTime = new Date(target.beginTime))
    this.targets.forEach(target => target.endTime = new Date(target.endTime))
  }

  /**
   * 保存
   */
  save() {
    wx.setStorageSync(this.key, this.targets)
  }
}

export default new TargetStore()