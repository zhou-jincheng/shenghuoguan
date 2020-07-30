import { getSetting, chooseAddress, openSetting, showModal, showToast } from '../../utils/asyncWX.js'
// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    checkall: false,
    totalPrice: 0,
    totalNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    // 从缓冲中取地址数据
    let address = wx.getStorageSync("address");
    this.setData({address})  
    //从缓存中取购物车数据
    let cart = wx.getStorageSync("cart") || [];
    // 过滤掉没有被选中的商品
    cart = cart.filter(v => v.checked);
    //设置购物车商品状态
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
        totalNum += v.num;
        totalPrice += v.num * v.goods_price;
    });
    this.setData({
      cart,
      totalNum,
      totalPrice
    })
  },

  // 点击支付
  handleOrderPay() {
    // 获取缓存中是否有token
    const token = wx.getStorageSync("token");
    if(!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return ;
    }
      
  },

})