// 似乎是订单详情

import Taro, { getCurrentInstance } from '@tarojs/taro';
import React, { Component } from 'react';
import { View, Input, ScrollView, Image } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import Loading from '../../components/Loading/index';
// import { getRequest } from '../../utils/api';
// import { customRequest } from 'src/utils/api';
import mock from './mock';
import './index.less';

const apiUrl = "http://localhost:3000";
function customRequest(url, data, method = 'GET') {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: apiUrl + url,
      data: data,
      method: method,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

class Order extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      orderType: '全部订单',
      searchVal: '',
      orderList: [],
      initOrderList: []
    };
  }

  componentDidMount = () => {
    // const {
    //   router: { params = {} },
    // } = getCurrentInstance() && getCurrentInstance();
    const orderType = Taro.getStorageSync('orderType')??'全部订单';

    this.fetchApi();
    this.setState({ orderType });
  };

  componentWillUnmount = () => {
    Taro.setStorage({
      key:'orderType',
      data:'全部订单'
    })
  }

  componentDidShow() {
    this.fetchApi()
  }

  /**
   * @desc 搜索事件
   * @param { object }  e
   */
  handleSearch = (e) => {
    this.setState({ isLoading: true });

    const { value } = e && e.detail && e.detail;

    if (value) {
      let { initOrderList = [] } = this.state;
      let orderList = initOrderList.filter((order) => value === order.goodsId.name);
      this.setState({ orderList });
    } else{
      this.setState(preState=>({ orderList:preState.initOrderList}));
    }

    this.setState({
      searchVal: value,
      isLoading: false,
    });
  };

  /**
   * @desc 清空搜索框内容
   */
  handleClearSearchVal = () => {
    this.setState(preState=>({ searchVal: '', orderList:preState.initOrderList}));

    // const { orderType = 0 } = this.state;
  };

  /**
   * @desc 获取数据
   * @param { number } orderType
   */
  fetchApi = async () => {
    const orderType = Taro.getStorageSync('orderType')??'全部订单';
    this.setState({ isLoading: true });
    const {searchVal} = this.state
    const res = await customRequest('/order', { orderType, searchVal });
    if (res && res.status === 200) {
      const { data = [] } = res;

      this.setState({ orderList: data, initOrderList: data });
    }

    this.setState({ isLoading: false });
  };

  render() {
    const { orderList = [], searchVal = '', isLoading = false } = this.state;

    return (
      <View className='orderContainer'>
        <View className='searchWrap'>
          <Input
            className='searchInput'
            type='text'
            placeholder='请输入商品名称'
            value={searchVal}
            onInput={this.handleSearch.bind(this)}
          />
          <View className='removeIcon'
          onClick={this.handleClearSearchVal}
          >
            <AtIcon value='close-circle' size='20' color='#ccc' />
          </View>
        </View>

        <ScrollView className='scrollView' scrollY scrollWithAnimation>
          {Array.isArray(orderList) &&
            orderList.length > 0 &&
            orderList.map((order) => {
              return (
                <View className='cardWrap' key={order._id}>
                  <View className='cardDom'>
                    <View className='cardImgWrap'>
                      <Image className='cardImg' src={order.goodsId?.imgUrl} />
                    </View>
                    <View className='cardCon'>
                      <View className='cardTitle'>{order.goodsId?.name}</View>
                      <View className='cardType'>
                        {/* {order.orderType === 1 ? '待收货' : '已收货'} */}
                        {order.status}
                      </View>
                      <View className='cardTxt'>{order.goodsId?.desc}</View>
                    </View>
                    {['已接单', '已完成'].includes(order.status) && <View className='cardCon'>
                      <View className='cardTxt'>人员:{order.employeeId?.name}</View>
                      <View className='cardTxt'>联系方式:{order.employeeId?.phone}</View>
                    </View>}
                  </View>
                </View>
              );
            })}
        </ScrollView>

        <Loading isLoading={isLoading} />
      </View>
    );
  }
}

export default Order;

