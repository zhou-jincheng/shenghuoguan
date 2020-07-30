import {request} from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    navList: [],
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取轮播图数据
    request({
      url:"/home/swiperdata"
    }).then(res => {
      // console.log(res)
      this.setData({
        swiperList: res
      })
    });
    //获取导航栏数据
    request({
      url:"/home/catitems"
    }).then(res => {
      // console.log(res)
      this.setData({
        navList: res
      })
    });
    //获取楼层数据
    request({
      url:"/home/floordata"
    }).then(res => {
      // console.log(res)
      res.forEach(v1 => {
        v1.product_list.forEach(v2 => {
          v2.navigator_url ="/pages/goods_list/index?"+ v2.navigator_url.split("?")[1];
        })
      })
      this.setData({
        floorList: res
      })
    });
  },
})