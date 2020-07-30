import {request} from '../../request/index.js'
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧分类列表
    leftMenuList: [],
    // 右边内容
    rightContent: [],
    // 当前选中分类下标
    currentIndex: 0,
    // 设置每次切换分类从头开始浏览
    backTop: 0
  },
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断内存中是否有数据
    let cates = wx.getStorageSync('cates');
    if(!cates){
      this.getCategory();
    }else{
      // 判断数据是否过期
      if(Date.now() - cates.time > 1000*10){
        // console.log("数据已过期,重新发送请求");
        this.getCategory();
      }else {
        // console.log("数据还可以使用，请从缓存中取");
        this.Cates = cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  //请求商品分类数据
  async getCategory() {
    /* request({
      url: "/categories"
    }).then(res => {
      this.Cates = res.data.message;
      // 将数据存入缓存
      wx.setStorageSync('cates', {
        time: Date.now(),
        data: this.Cates
      })
      let leftMenuList = this.Cates.map(v => v.cat_name);
      let rightContent = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
    }) */
    let res = await request({url:"/categories"});
    this.Cates = res;
      // 将数据存入缓存
      wx.setStorageSync('cates', {
        time: Date.now(),
        data: this.Cates
      })
      let leftMenuList = this.Cates.map(v => v.cat_name);
      let rightContent = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
  },
  toggleCategory(e) {
    let {index} = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    let backTop = this.data.backTop === 0 ? -1 : 0;
    this.setData({
      currentIndex: index,
      rightContent,
      backTop
    })
  }

})