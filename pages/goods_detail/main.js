import {request} from '../../request/index.js'

// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    isCollect: false
  },
  // 商品信息,为方便进行操作
  goodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    const pages =  getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const options = currentPage.options;
    this.getgoodsObj(options.goods_id);
  },
  // 根据商品Id查找商品信息
  async getgoodsObj(goods_id){
    let goodsObj =await request({
      url:"/goods/detail",
      data: {
        goods_id
      }
    });
    this.goodsInfo = goodsObj;

    // 查看该商品是否被收藏
    const collect = wx.getStorageSync("collect") || [];
    const isCollect = collect.some(v => v.goods_id === goodsObj.goods_id);  

    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        // iphone部分手机 不识别 webp图片格式 
        // 最好找到后台 让他进行修改 
        // 临时自己改 确保后台存在 1.webp => 1.jpg 
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics: goodsObj.pics
      },
      isCollect
    });
  },
  //点击查看轮播图片细节
  handlePreviewImage(e) {
    let current = e.currentTarget.dataset;
    let urls = this.data.goodsObj.pics.map(v => v.pics_mid);
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls// 需要预览的图片http链接列表
    })
  },

  // 加入购物车
  handleCartAdd() {
    // 从缓冲中取商品列表
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(v => v.goods_id === this.goodsInfo.goods_id) 
    if(index === -1) {
      // 商品未添加
      this.goodsInfo.num = 1;
      this.goodsInfo.checked = true;
      cart.push(this.goodsInfo);
    }else {
      //商品已添加，数量+1
      cart[index].num++;
    }
    // 将数据重新存入缓存
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // 防止用户乱点击
      mask: true
    });
        
  },
  // 点击收藏按钮
  handleGoodsCollect() {
    let isCollect = false;
    let collect = wx.getStorageSync("collect") || [];
    let index = collect.findIndex(v => v.goods_id === this.goodsInfo.goods_id);
    if(index != -1) {
      // 商品已被收藏，将该商品从收藏列表中删除
      collect.splice(index,1);
      isCollect = false;
      wx.showToast({
        title: '已移除收藏',
        duration: 1000,
        mask: true
      });
        
    }else {
      // 尚未收藏，将该商品添加到收藏列表
      collect.push(this.goodsInfo);
      isCollect = true;
      wx.showToast({
        title: '商品已收藏',
        duration: 1000,
        mask: true
      });
    }
    // 将收藏列表重新存入缓存中
    wx.setStorageSync("collect", collect);
    // 设置商品收藏状态
    this.setData({
      isCollect
    })
  }
  
})