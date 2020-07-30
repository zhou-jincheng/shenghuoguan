// pages/login/index.js
Page({
  login(e) {
    const {userInfo} = e.detail;
    // 将用户信息存入缓存中
    wx.setStorageSync("userInfo", userInfo);
    wx.navigateBack({
      delta: 1
    });
      
  }
})