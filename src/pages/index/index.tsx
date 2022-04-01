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
// import indeximg from '../../images/';
import indeximg from '../../images/custom/indeximg1.jpg';
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
      fetchData: { imgList1, iconList, singleList, moreList },
    } = this.state;
    const logoImgUrl = indeximg
const imgList = [
  {
    "id": 4,
    "iconType": "",
    "title": "",
    "imgUrl": "http://localhost:3000/images/5e6604a3133956.60922417.jpg",
    "logoImgUrl": "",
    "type": 2
  },
  {
    "id": 5,
    "iconType": "",
    "title": "",
    "imgUrl": "http://localhost:3000/images/5e6604a3133956.60922417.jpg",
    "logoImgUrl": "",
    "type": 3
  },
]
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

        <View className='titleDom'>精选单品12</View>
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
