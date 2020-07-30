// 同时发送异步代码的次数
let ajaxTimes = 0;
export function request(params) {
    ajaxTimes++;
    // 显示加载中
    wx.showLoading({
        title: '加载中',
    });
    const baseURL= "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve,reject) => {
        wx.request({
            ...params,
            url: baseURL + params.url,
            success: (result) => {
                resolve(result.data.message);
                ajaxTimes--;
                if(ajaxTimes == 0){
                    // 关闭正在等待的图标
                    wx.hideLoading();
                }
            },
            fail: (err) => {
                reject(err);
            }
        });
          
    })
}