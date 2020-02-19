//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 是否显示遮罩层
    modelShow: false,
    // 动画对象
    animateData: {},
    // 背景图片是否展开标识
    bgiShow: true,
    // 我的相册是否处于编辑的状态
    albumIsEdit: false,
    // 模拟相册的假数据
    albumData: [
      {
        id: 1,
        total: 100,
        title: '说说和日志相册',
        url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3844344491,1924386846&fm=11&gp=0.jpg'
      },
      {
        id: 2,
        total: 33,
        title: '2333',
        url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1359363100,2906334829&fm=11&gp=0.jpg'
      },
      {
        id: 3,
        total: 12,
        title: 'kobe',
        url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1781008062,2853651286&fm=11&gp=0.jpg'
      }
    ]
  },
  openNavList () {
    this.setData({
      modelShow: !this.data.modelShow
    })
  },
  // 当点击遮罩层组件时，触发自定义事件，父组件去关闭遮罩层
  closeModel () {
    this.setData({
      modelShow: false
    })
  },
  // 切换动画
  toggleBgi () {
    // 创建一个动画
    let animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear'
    })
    if (this.data.bgiShow) {
      animation.height(0).step()
    } else {
      animation.height('480rpx').step()
    }
    this.setData({
      animateData: animation.export(),
      bgiShow: !this.data.bgiShow
    })
  },
  // 长按我的相册进入编辑状态
  editMyAlbum () {
    this.setData({
      albumIsEdit: !this.data.albumIsEdit
    })
  },
  closeEditAlbum () {
    this.setData({
      albumIsEdit: false
    })
  },
  delteAlbum (e) {
    let _this = this
    let arrCopy = JSON.parse(JSON.stringify(this.data.albumData))
    wx.showModal({
      title: '确认删除相册？',
      content: '相册删除后照片和视频将无法恢复',
      success (res) {
        if (res.confirm) {
          arrCopy.forEach((item, index, arr) => {
            if (item.id === e.detail.id) {
              arr.splice(index, 1)
            }
          })
          _this.setData({
            albumData: arrCopy
          })
        }
      }
    })
  },
  // 添加新的相册
  addNewAlbum () {
    console.log(123)
    wx.showActionSheet({
      itemList: [
        '上传照片',
        '上传视频',
        '导入微信照片',
        '导入微信视频'
      ],
      success: res => {
        // 点击之后的回调
        let tapIndex = res.tapIndex
        switch (tapIndex) {
          case 0:
            wx.chooseImage({
              // 上传成功后的回调
              success: function(res) {
                const tempFilePaths = res.tempFilePaths
                app.globalData.picList = tempFilePaths
                wx.navigateTo({
                  url: '/pages/uploadPic/uploadPic',
                })
              }
            })
            break
        }
      }
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
