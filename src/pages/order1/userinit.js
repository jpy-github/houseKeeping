
import Taro from '@tarojs/taro';
const a=1
const userInit = ()=>{
    Taro.login({
      success: function (loginRes) {
        if (loginRes.code) {
          Taro.getUserInfo({
            success:user=>{
              Taro.request({
                url: 'http://localhost:3000/login',
                method:'POST',
                data: {
                  code: loginRes.code,
                  encryptedData:user.encryptedData,
                  iv:user.iv
                },
                success:res=>{
                  console.log('res',res)
                  Taro.setStorage({
                    key:'user',
                    data:{
                      ...res.data.user,
                      id:res.data.data.openId
                    }
                  })
                }
              })
            }
          })
  
        } else {
          console.log('登录失败！' + loginRes.errMsg)
        }
      }
    })
  }

  export default userInit