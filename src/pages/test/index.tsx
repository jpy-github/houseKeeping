import { useState, useEffect } from "react";
import { View, Text, Button } from "@tarojs/components";
import "./index.less";
import Taro from "@tarojs/taro";

const Index = () => {
  const [userName, setUserName] = useState("ZS");
  useEffect(()=>{
    console.log(Taro.getUserInfo({}))
    Taro.getSetting({}).then(res=>{
      console.log(res.authSetting['scope.userInfo'])
      if(res.authSetting['scope.userInfo']===false){
        Taro.getUserInfo()
      }
    })
  }, [])

  useEffect(() => {
  console.log('123')
  }, []);

  const handleGetUserInfo=res=>{
    console.log(res)
  }

  return (
    <View className="index">
      <Button open-type="getPhoneNumber" onGetPhoneNumber={handleGetUserInfo} >授权</Button>
      <Text>Hello {userName}!</Text>
    </View>
  );
};

export default Index;
