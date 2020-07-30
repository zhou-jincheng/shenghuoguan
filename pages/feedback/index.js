import {chooseImage, showToast} from "../../utils/asyncWX.js"

// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id: '0',
        name: '体验问题',
        isActive: true
      },
      {
        id: '1',
        name: '商品、商家投诉',
        isActive: false
      }
    ],
    tempFilePaths: [],
    chooseImgsUrl:[],
    ideaContent: ""
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

  // 图片上传处理函数
  async handleUploadImg() {
    let {tempFilePaths} = await chooseImage(); 
    this.setData({tempFilePaths});
  },
  // 删除图片
  handleImgDelete(e) {
    let {index} = e.currentTarget.dataset;
    let {tempFilePaths} = this.data;
    tempFilePaths.splice(index,1);
    this.setData({
      tempFilePaths
    })
  },
  // 提交意见
  async commit() {
    // 获取表单内容
    let {ideaContent,tempFilePaths} = this.data;
    if(!ideaContent.trim()){
      // 校验表单输入合法性
      await showToast({title:"输入不合法"})
      return ;
    }
    wx.showLoading({
      title: "上传中",
      mask: true
    });
      
    if(tempFilePaths.length !=0) {
      tempFilePaths.forEach((v,i) => {
        wx.uploadFile({
          url: 'https://sm.ms/api/upload',
          filePath: v,
          name: "file",
          formData: {},
          success: (result) => {
            if(i === tempFilePaths.length-1){
              console.log("服务器错误,就做到这吧");
              this.setData({
                ideaContent:"",
                tempFilePaths: []
              })
              wx.hideLoading();
              wx.navigateBack({
                delta: 1
              });
                
            }
          },
          fail: (err) => {
            console.log(err)
          },
          complete: () => {}
        });
          
      })
    }else {
      console.log("只是上传了文本!");
      this.setData({
        ideaContent:"",
        tempFilePaths: []
      })
      wx.hideLoading();
      wx.navigateBack({
        delta: 1
      });
    }
    
      
  },
  // 同步表单域内容
  handletextareaInput(e) {
    this.setData({
      ideaContent: e.detail.value
    })
  }

})