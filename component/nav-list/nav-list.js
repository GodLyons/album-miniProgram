// component/nav-list/nav-list.js
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    modelHeight: app.globalData['screenHeight'],
    modelWidth: app.globalData['screenWidth']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    closeModel () {
      this.triggerEvent('closeModel')
    }
  }
})
