import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View, Image, ScrollView } from '@tarojs/components';
// import { AtIcon } from 'taro-ui';
import { AtIcon } from 'taro-ui';
import { AtButton } from 'taro-ui'
// import { connect } from 'react-redux';
// import GlobalFooter from '../../components/GlobalFooter/index';
import './index.less';

// @connect(({ userReducer }) => ({
//   userReducer,
// }))

class User extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      headPortrait: '',
      name: '',
      name: '',
      address: '',
      phone: '',
      currentUser: {}
    };
  }

  componentDidMount = () => {
    let currentUser = Taro.getStorageSync('user')
    this.setState({ currentUser })
  };

  componentDidShow() {
    let currentUser = Taro.getStorageSync('user')
    this.setState({ currentUser })
  }

  /**
   * @desc 跳转订单列表
   * @param { number } type
   */
  handleGoOrder = (orderType) => {
    Taro.switchTab({
      url: `/pages/order/index`,
    });
    Taro.setStorage({
      key: 'orderType',
      data: orderType
    })
  };

  /**
   * @desc 跳转编辑个人信息
   */
  handleGoUserEdit = () => {
    Taro.navigateTo({
      url: '/pages/order1/index',
    });
  };

  render() {
    const { headPortrait = '', nickName = '', name = '', address = '', phone = '' } = this.state.currentUser;
    return (
      <View className='homeWrap'>
        <ScrollView scroll-y='true' scrollWithAnimation className='scrollDom'>
          <View className='headWrap'>
            <View className='userInfoWrap'>
              <View className='avatarWrap'>
                <Image className='avatarImg' src={headPortrait} />
              </View>
              <View className='nickName'>{nickName}</View>
            </View>
            <Image className='backImg' src={headPortrait} />
          </View>

          <View className='iconListWrap'>
            <View className='iconList'>
              <View className='iconItem' onClick={this.handleGoOrder.bind(this, '全部订单')}>
                <AtIcon value='lightning-bolt' size='30' color='#999' />
                <View className='iconItemTxt'>全部订单</View>
              </View>
              <View className='iconItem' onClick={this.handleGoOrder.bind(this, '未完成')}>
                <AtIcon value='heart' size='30' color='#999' />
                <View className='iconItemTxt'>未完成</View>
              </View>
              <View className='iconItem' onClick={this.handleGoOrder.bind(this, '已完成')}>
                <AtIcon value='heart-2' size='30' color='#999' />
                <View className='iconItemTxt'>已完成</View>
              </View>
            </View>
          </View>

          <View className='gridListWrap'>
            <View className='gridList'>
              <View className='gridItem' onClick={this.handleGoUserEdit.bind(this)}>
                <View className='gridItemIcon'>
                  <AtIcon value='lightning-bolt' size='30' color='#999' />
                </View>
                <View className='gridItemTxt'>
                  <View className='gridItemTitle'>收货人</View>
                  <View className='gridItemCon'>{name}</View>
                </View>
              </View>
              <View className='gridItem' onClick={this.handleGoUserEdit.bind(this)}>
                <View className='gridItemIcon'>
                  <AtIcon value='lightning-bolt' size='30' color='#999' />
                </View>
                <View className='gridItemTxt'>
                  <View className='gridItemTitle'>收货地址</View>
                  <View className='gridItemCon'>{address}</View>
                </View>
              </View>
            </View>

            <View className='gridList'>
              <View className='gridItem' onClick={this.handleGoUserEdit.bind(this)}>
                <View className='gridItemIcon'>
                  <AtIcon value='lightning-bolt' size='30' color='#999' />
                </View>
                <View className='gridItemTxt'>
                  <View className='gridItemTitle'>联系电话</View>
                  <View className='gridItemCon'>{phone}</View>
                </View>
              </View>
              <View className='gridItem'>
                {/* <View className='gridItemIcon'>
                  <AtIcon value='lightning-bolt' size='30' color='#999' />
                </View>
                <View className='gridItemTxt'>
                  <View className='gridItemTitle'>我的收藏</View>
                  <View className='gridItemCon'>...</View>
                </View> */}
              </View>
            </View>
          </View>

          <View className='sysList'>
            <View className='sysItem'>用户反馈</View>
            <View className='sysItem'>关于我们</View>
          </View>
        </ScrollView>

        {/* <GlobalFooter isActive='04' /> */}
      </View>
    );
  }
}

export default User;
