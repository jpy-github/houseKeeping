import { useState, useEffect } from "react";
import { View, Text, Button, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import MySwiper from "../../components/MySwiper";
import GoodsList from '../../components/GoodsList';
import "./index.less";

const Index = () => {
  const [userName, setUserName] = useState("ZS");
  const [brands, setBrands] = useState([]);
  const [productList, setProductList] = useState([]);


  useEffect(() => {
    console.log(Taro.getUserInfo({}));
    Taro.getSetting({}).then((res) => {
      console.log(res.authSetting["scope.userInfo"]);
      if (res.authSetting["scope.userInfo"] === false) {
        Taro.getUserInfo();
      }
    });

    setBrands([
      {image_src:'https://img.staticdj.com/0d02e62e143767be187d23db01925aa8.jpg'},
      {image_src:'https://cdn.shopify.com/s/files/1/0264/5121/4410/products/Hypoallergenic-Earring-Lifts_01_a097a402-3952-4978-8c71-1563ea34397e.jpg?v=1607592825'}
    ])
    setProductList([
      {
        id:1
      },
      {
        id:2
      },
      {
        id:3
      }
    ])
  }, []);

  const handleGetUserInfo = (res) => {
    console.log(res);
  };

  return (
    <View className="index">
      <MySwiper
        // banner={banner}
        home
      />
      {brands.map((item, index) => (
        <View className="nav-item" key={index}>
          <Image mode="widthFix" src={item.image_src} />
        </View>
      ))}
      <GoodsList list={productList} 
      // loading={effects['home/product']} 
      />
      <Button open-type="getPhoneNumber" onGetPhoneNumber={handleGetUserInfo}>
        授权
      </Button>
      <Text>Hello {userName}!</Text>
      11111111111111111111111111111
    </View>
  );
};

export default Index;
