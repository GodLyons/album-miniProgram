// component/nav-bar2.js
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    }
  },
  options: {
    /**
     * 该配置项为样式隔离选项，因为除继承样式外， app.wxss 中的样式、组件
     * 所在页面的的样式对自定义组件无效，为了支持字体图标所以修改配置项
     */
    // styleIsolation: 'apply-shared'
  },

  /**
   * 组件的初始数据
   */
  data: {
    navBarHeight: 0,
    statusBarHeight: app.globalData.statusBarHeight
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getNavHeight () {
      // 获取状态栏的高度
      let statusBarHeight = app.globalData.statusBarHeight
      // 获取胶囊的位置信息
      let rect = wx.getMenuButtonBoundingClientRect
                 ? wx.getMenuButtonBoundingClientRect()
                 : null
      if (rect) {
        let navBarHeight = (function () {
          // gap为胶囊按钮上下间距
          let gap = rect.top - statusBarHeight
          // console.log(rect.top)
          // console.log(statusBarHeight)
          return 2 * gap + rect.height
        })()
        // console.log(navBarHeight)
        this.setData({
          navBarHeight
        })
      } else {
        // 如果获取失败，我们抛出异常。另一种解决方法就是模拟胶囊信息再进行处理
        throw new Error('获取胶囊信息失败')
      }
    }
  },

  attached () {
    this.getNavHeight()
  }
})
