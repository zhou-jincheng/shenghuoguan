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
    const cart = wx.getStorageSync("cart") || [];
    //设置购物车商品状态，包括全选按钮状态
    this.setCart(cart);
  },

  // 获取接受地址
  async handerChooseAddress() {  
    try {
      // 获取用户授权情况
      let res = await getSetting();
      let scopeAddress = res.authSetting["scope.address"];
      if(scopeAddress == false) {
        // 用户拒绝授权之后，要再次授权需打开设置进行修改
        await openSetting();
      }
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      // 将获取到的地址信息存入缓存中
      wx.setStorageSync("address", address);  
    }catch(err) {
      console.log(err)
    }
  },
  //设置购物车商品状态，包括全选按钮状态,总价格，总数量
  setCart(cart) {
    let checkall = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      //当cart为空数组时不会进入
      if(v.checked){
        totalNum += v.num;
        totalPrice += v.num * v.goods_price;
      }else {
        checkall = false;
      }
    });
    checkall = cart.length > 0 ? checkall : false;
    this.setData({
      cart,
      checkall,
      totalNum,
      totalPrice
    })
  },

  //商品状态发生改变
  handleGoodsChecked(e) {
    let {cart} = this.data;
    let {goods_id} = e.currentTarget.dataset;
    let index = cart.findIndex(v => v.goods_id == goods_id);
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
    // cart状态改变，需将最新的cart存入缓存中
    wx.setStorageSync("cart", cart);
  },

  toggleCheckall() {
    let {checkall,cart} = this.data;
    checkall = !checkall;
    cart.forEach(v => v.checked = checkall);
    this.setCart(cart);
    // cart状态改变，需将最新的cart存入缓存中
    wx.setStorageSync("cart", cart);
  },

  // 增减商品数量
  async handleGoodsNum(e){
    let {goods_id, operation} = e.currentTarget.dataset;
    let {cart} = this.data;
    const index = cart.findIndex(v => v.goods_id == goods_id);
    cart[index].num += operation;
    if(cart[index].num < 1){
      // 当商品数量少于1时
      let isDelete = await showModal({content:"确定删除该商品吗？"});
      if(isDelete) {
        cart.splice(index,1);
      }else{
        cart[index].num = 1;
      }
    }
    this.setCart(cart);
    // cart状态改变，需将最新的cart存入缓存中
    wx.setStorageSync("cart", cart);
  },

  // 去结算
  handlePay() {
    const {totalNum, address} = this.data;
    if(!totalNum){
      showToast({title: "你还没有添加商品"});
      return ;
    }
    if(!address){
      showToast({title: "你还没有收货地址"});
      return ;
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    });
      
  },
})