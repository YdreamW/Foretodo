// pages/planmanager/planmanager.js
import todoStore from '../../store/todoStore'
import TodoManager from '../../utils/todoManager.js'
import F2 from '../../f2-canvas/lib/f2';

let chart = null;
let flag = 0;
let flag_mates = 2;

function initChart(canvas, width, height) { // 使用 F2 绘制图表

  let data = [
    { week: 'Mon', hour: 8.1 },
    { week: 'Tue', hour: 9.8 },
    { week: 'Wed', hour: 7.6 },
    { week: 'Thu', hour: 6.5 },
    { week: 'Fri', hour: 5.5 },
    { week: 'Sat', hour: flag },
    { week: 'Sun', hour: 0 },
  ];


  chart = new F2.Chart({
    el: canvas,
    width,
    height,
  });

  chart.source(data, {
    sales: {
      tickCount: 5
    }
  });
  chart.tooltip({
    showItemMarker: false,
    onShow(ev) {
      const { items } = ev;
      items[0].name = null;
      items[0].name = items[0].title;
      items[0].value = items[0].value + 'h ';
    }
  });
  chart.interval().position('week*hour').color('#2abe3d');
  chart.render();
  //console.log(data[1]["hour"]);
  return chart;

}

function initChart_mates(canvas, width, height) { // 使用 F2 绘制图表
  let data = [
    { week: 'Mon', hour: 3.1 },
    { week: 'Tue', hour: 2.8 },
    { week: 'Wed', hour: 1.6 },
    { week: 'Thu', hour: 5.5 },
    { week: 'Fri', hour: 5 },
    { week: 'Sat', hour: flag_mates },
    { week: 'Sun', hour: 0 },
  ];


  chart = new F2.Chart({
    el: canvas,
    width,
    height,
  });

  chart.source(data, {
    sales: {
      tickCount: 5
    }
  });
  chart.tooltip({
    showItemMarker: false,
    onShow(ev) {
      const { items } = ev;
      items[0].name = null;
      items[0].name = items[0].title;
      items[0].value = items[0].value + 'h ';
    }
  });
  chart.interval().position('week*hour').color('#ffb90f');
  chart.render();
  //console.log(data[1]["hour"]);
  return chart;

}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    opts: {
      onInit: initChart
    },
    opts_mates: {
      onInit: initChart_mates
    },
    plan_name: "此任务",
    plan_hours: 41,
    todos: [],
    multiIndex: [0,0,0,0],
    multiArray: [
      [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
      ["小时"],
      [0,5,10,15,20,25,30,35,40,45,50,55],
      ["分钟"]
    ],
    no_mates: "block",
    get_mates: "none",
    mates_name: ""
  },

  add_time: function(){

  },

  bindMultiPickerChange: function(e){
    let value = e.detail.value,
      hour = this.data.multiArray[0][value[0]] + (this.data.multiArray[2][value[2]])/60
    //console.log(hour.toFixed(1))
    try {
      wx.setStorageSync('hours_1', hour.toFixed(1))
    } catch (e) { }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      let value = wx.getStorageSync('hours_1')
      if (value) {
        flag += Number(value);
      }
    } catch (e) {
      // Do something when catch error
    }
    let pre_hours = this.data.plan_hours
    this.setData({
      plan_hours: pre_hours + Number(flag)
    })
    try {
      let value = wx.getStorageSync('hours_1_mates')
      if (value) {
         this.setData({
           get_mates: "block",
           no_mates: "none",
           mates_name: value,
         })
      }
    } catch (e) {
      // Do something when catch error
    }
  },

})