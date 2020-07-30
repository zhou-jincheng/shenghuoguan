// pages/search/index.js
import {request} from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    isFocus: false,
    inputValue: ""
  },
  timer: -1,
  handleInput(e) {
    clearTimeout(this.timer);
    let {value} = e.detail;
    value = value.trim();
    if(!value) {
      //值不合法
      this.cancle();
      return ;
    }
    this.setData({
      isFocus: true
    })
    this.timer = setTimeout(() => {
      this.qsearch(value)
    }, 1000);
  },
  async qsearch(query) {
    let goodsList = await request({
      url: "/goods/qsearch",
      data:{query}
    });
    console.log(goodsList)
    this.setData({
      goodsList
    })
  },
  cancle() {
    this.setData({
      isFocus: false,
      goodsList: [],
      inputValue: ""
    })
  }
})