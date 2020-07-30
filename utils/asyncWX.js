/**
 * promise形式的getSetting
 */
export function getSetting(){
    return new Promise((resolve,reject) => {
        wx.getSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {reject(err)},
            complete: () => {}
        });
          
    })
}

/**
 * promise形式的chooseAddress
 */
export function chooseAddress(){
    return new Promise((resolve,reject) => {
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {reject(err)},
            complete: () => {}
        });
          
    })
}

/**
 * promise形式的openSetting
 */
export function openSetting(){
    return new Promise((resolve,reject) => {
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {reject(err)},
            complete: () => {}
        });
          
    })
}

/**
 * promise形式的showModal
 */
export function showModal({content}){
    return new Promise((resolve,reject) => {
        wx.showModal({
            title: '提示',
            content,
            success (res) {
              if (res.confirm) {
                resolve(true);
              } else if (res.cancel) {
                resolve(false);
              }
            }
          }) 
    })
}

/**
 * promise形式的showToast
 */
export function showToast({title}){
    return new Promise((resolve,reject) => {
        wx.showToast({
            title,
            icon: 'none',
            mask: true
        });
          
    })
}

/**
 * promise形式的login
 */
export function login(){
    return new Promise((resolve,reject) => {
        wx.login({
            timeout:10000,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {reject(err)}
        });   
    })
}

/**
 * promise形式的chooseImage
 */
export function chooseImage(){
    return new Promise((resolve,reject) => {
        wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {reject(err)}
        });
            
    })
}

