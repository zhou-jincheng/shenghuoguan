// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id: '0',
        name: '全部',
        isActive: true
      },
      {
        id: '1',
        name: '代付款',
        isActive: false
      },
      {
        id: '2',
        name: '待收货',
        isActive: false
      },
      {
        id: '3',
        name: '退款/退货',
        isActive: false
      }
    ]
  },
  onShow() {
    let currentPages =  getCurrentPages();
    const type = currentPages[currentPages.length-1].options.type || 1;
    this.changeTitleByIndex(type-1);
      
  },
  HandleTabClick(e){
    let index = e.detail;
    this.changeTitleByIndex(index);
  },
  changeTitleByIndex(index) {
    let {tabs} = this.data;
    tabs.forEach((v,i) => v.isActive = i == index ? true : false);
    this.setData({
      tabs
    })
  }
})