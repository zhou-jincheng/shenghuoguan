// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id: '0',
        name: '商品收藏',
        isActive: true
      },
      {
        id: '1',
        name: '品牌收藏',
        isActive: false
      },
      {
        id: '2',
        name: '店铺收藏',
        isActive: false
      },
      {
        id: '3',
        name: '浏览足迹',
        isActive: false
      }
    ],
    goodsList: []
  },

  onShow() {
    // 从缓存中取收藏列表
    const goodsList = wx.getStorageSync("collect");
    this.setData({
      goodsList
    })
  },
  // 监听顶部导航栏点击事件
  HandleTabClick(e){
    let index = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i) => v.isActive = i == index ? true : false);
    this.setData({
      tabs
    })
  },
})