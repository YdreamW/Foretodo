// pages/dayList/dayList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hour_titles: Array.from({ length: 24 }).map(function (value, index) {
      var hour = (index + 1) % 24;
      return ((hour < 10) ? "0" : "") + hour + ":00";
    }),
    day_hour_items: Array.from({length:24}).map((value,index)=>index+1),
    // todo_item_sizes: Array.from({length:24}).map(()=>{width:1,height:1}), 
    // bar_item_sizes: Array.from({length:24}).map(()=>{width:1,height:1})
    todo_item_sizes: Array.from({ length: 24 }).map(function(){
      return {
        width:1,
        height :1
      }
    }),
    bar_item_sizes: Array.from({ length: 24 }).map(function () {
      return {
        width: 1,
        height: 1
      }
    })
  },

  handleTap: function (e) {
    let orderby = this.selectComponent("#orderby")
    let bar1 = this.selectComponent("#hour-bar-0")
    let todo1 = this.selectComponent("#hour-todo-0")
    this.fuck = this.selectComponent("#fuck")
    // let orr = wx.createSelectorQuery().select("#hour-bar-0").exec()
    // console.log(orr)
    // wx.createSelectorQuery().select("#hour-bar-0").exec()
    console.log(bar1)
    console.log(todo1)
    console.log(orderby)
    console.log(e)
  }
})