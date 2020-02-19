// component/album-item/album-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    uuid: {
      type: Number,
      value: 0
    },
    total: {
      type: Number,
      value: 0
    },
    title: {
      type: String,
      value: ''
    },
    url: {
      type: String,
      value: ''
    },
    albumIsEdit: {
      type: Boolean,
      value: false
    }
  },
  options: {
    /**
     * 该配置项为样式隔离选项，因为除继承样式外， app.wxss 中的样式、组件
     * 所在页面的的样式对自定义组件无效，为了支持字体图标所以修改配置项
     */
    styleIsolation: 'apply-shared'
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    deleteItem () {
      this.triggerEvent('delete', {id: this.properties.uuid})
    }
  }
})
