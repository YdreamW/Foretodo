// pages/planList/planList.js
import planStore from '../../store/planStore.js'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    plans: planStore.getPlans(),
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.plans = planStore.getPlans()
    this.update()
  },

  update(data) {
    data = data || this.data
    this.setData(data)
  },

  handleItemTap: function (e) {
    let uuid = e.currentTarget.dataset.uuid
    console.log(uuid)
    wx.navigateTo({
      url: '../addPlan/addPlan?uuid=' + uuid
    })
  }
})