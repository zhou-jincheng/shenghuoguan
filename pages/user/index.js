// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    userInfo: {},
    collectNums: 0
  },

 

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userInfo = wx.getStorageSync("userInfo");
    const isLogin = userInfo.nickName ? true : false;
    const collectNums = wx.getStorageSync("collect").length;
      
    this.setData({
      userInfo,
      isLogin,
      collectNums
    })
  },
  login() {
    wx.navigateTo({
      url: '/pages/login/index'
    });
      
  }
  
})