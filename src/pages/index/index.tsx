// import { useState, useEffect } from "react";
// import { View, Text, Button, Image } from "@tarojs/components";
// import Taro from "@tarojs/taro";
// import MySwiper from "../../components/MySwiper";
// import GoodsList from '../../components/GoodsList';
// import "./index.less";

// const Index = () => {
//   const [userName, setUserName] = useState("ZS");
//   const [brands, setBrands] = useState([]);
//   const [productList, setProductList] = useState([]);


//   useEffect(() => {
//     console.log(Taro.getUserInfo({}));
//     Taro.getSetting({}).then((res) => {
//       console.log(res.authSetting["scope.userInfo"]);
//       if (res.authSetting["scope.userInfo"] === false) {
//         Taro.getUserInfo();
//       }
//     });

//     setBrands([
//       {image_src:'https://img.staticdj.com/0d02e62e143767be187d23db01925aa8.jpg'},
//       {image_src:'https://cdn.shopify.com/s/files/1/0264/5121/4410/products/Hypoallergenic-Earring-Lifts_01_a097a402-3952-4978-8c71-1563ea34397e.jpg?v=1607592825'}
//     ])
//     setProductList([
//       {
//         id:1
//       },
//       {
//         id:2
//       },
//       {
//         id:3
//       }
//     ])
//   }, []);

//   const handleGetUserInfo = (res) => {
//     console.log(res);
//   };

//   return (
//     <View className="index">
//       <MySwiper
//         // banner={banner}
//         home
//       />
//       {brands.map((item, index) => (
//         <View className="nav-item" key={index}>
//           <Image mode="widthFix" src={item.image_src} />
//         </View>
//       ))}
//       <GoodsList list={productList} 
//       // loading={effects['home/product']} 
//       />
//       <Button open-type="getPhoneNumber" onGetPhoneNumber={handleGetUserInfo}>
//         授权
//       </Button>
//       <Text>Hello {userName}!</Text>
//       111111111111111111111111111
//     </View>
//   );
// };

// export default Index;


import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View, Image, Swiper, SwiperItem } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import Single from './components/Single/index';
import Special from './components/Special/index';
import More from './components/More/index';
import Loading from '../../components/Loading/index';
// import GlobalFooter from '../../components/GlobalFooter/index';
import { getRequest } from '../../utils/api';
import home from './mock/home';
import './index.less';

// const getRequest=(path)=>{
//   if(path==='/home')
//   return home
// }

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

class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      fetchData: {
        imgList: [],
        iconList: [],
        singleList: [],
        moreList: [],
        isLoading: false,
      },
    };
  }

  componentDidMount = async () => {
    // this.setState({ isLoading: true });
    userInit()
    const data = await getRequest('/goods');

    if (data.status === 200) {
      this.setState({ fetchData: data.data });
    }

    // this.setState({ isLoading: false });
  };

  /**
   * @desc 跳转商品列表
   * @param { number } iconId
   */
  goGoodList = (iconId) => {
    Taro.navigateTo({
      url: `/pages/goodList/index?iconId=${iconId}`,
    });
  };

  render() {
    const {
      fetchData: { imgList, iconList, singleList, moreList, logoImgUrl },
    } = this.state;

    return (
      <View className='homeWrap'>
        <Swiper indicatorColor='#999' indicatorActiveColor='#fff' circular indicatorDots autoplay>
          {Array.isArray(imgList) &&
            imgList.length > 0 &&
            imgList.map((img) => {
              return (
                <SwiperItem key={img.id}>
                  <Image className='slideImg' src={img.imgUrl} />
                </SwiperItem>
              );
            })}
        </Swiper>

        <View className='iconList'>
          {Array.isArray(iconList) &&
            iconList.length > 0 &&
            iconList.map((icon) => {
              return (
                <View
                  className='iconItem'
                  key={icon.id}
                  onClick={this.goGoodList.bind(this, icon.id)}
                >
                  <View className='iconWrap'>
                    <AtIcon value={icon.iconType} size='28' color='#fff' />
                  </View>
                  <View className='iconTitle'>{icon.title}</View>
                </View>
              );
            })}
        </View>

        <View className='logoWrap'>
          <Image className='logoImg' src={logoImgUrl} />
        </View>

        <View className='titleDom'>精选单品2</View>
        <Single singleList={singleList} />

        <Special moreList={moreList} />

        <More moreList={moreList} />

        <Loading isLoading={this.state.isLoading} />

        {/* <GlobalFooter isActive='01' /> */}
      </View>
    );
  }
}

export default Index;
