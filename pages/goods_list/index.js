import {request} from '../../request/index.js'
// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id: '0',
        name: '综合',
        isActive: true
      },
      {
        id: '1',
        name: '销量',
        isActive: false
      },
      {
        id: '2',
        name: '价格',
        isActive: false
      }
    ],
    goodsList: []
  },
  params:{
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  totalPages:0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.params.cid = options.cid || "";
    this.params.query = options.query || "";
    this.getGoodsList();
  },
  /**
   * 生命周期函数--监听页面下拉刷新
   */
  onPullDownRefresh() {
    this.setData({
      goodsList: []
    });
    this.params.pagenum = 1;
    this.getGoodsList();
  },
  /**
   * 生命周期函数--监听页面触底事件
   */
  onReachBottom() {
    // 当还有下一页数据的时候才请求
    if(this.params.pagenum < this.totalPages){
      this.params.pagenum += 1;
      this.getGoodsList();
    }else {
      // 当没有下一页数据时
      wx.showToast({
        title: "已经到底啦",
        mask: true
      });
    }
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
  //根据cid请求商品列表数据
  async getGoodsList(){
    let res = await request({
      url: "/goods/search",
      data:this.params
    })
    // console.log(res)
    // 请求的总条数
    let total = res.total;
    // 计算总页数
    this.totalPages = Math.ceil(total / this.params.pagesize);
    let goodsList = [...this.data.goodsList,...res.goods];
    this.setData({
      goodsList
    });

    //停止当前页面的下拉刷新
    wx.stopPullDownRefresh();
  }
})