import {login, showModal} from '../../utils/asyncWX.js'
import {request} from '../../request/index.js'
// pages/auth/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 点击了授权
  async handleGetUserInfo(e) {
    const {encryptedData, rawData, iv, signature} = e.detail;
    const {code} = await login();
    const tokenParams = {encryptedData, rawData, iv, signature, code};
    // 发送请求，获取token
    const res = await request({
      url: "/users/wxlogin",
      method: "post",
      data:tokenParams
    });
    await showModal({content:"该功能尚未开通"})
    wx.navigateBack({
      delta: 1
    });
  }
})