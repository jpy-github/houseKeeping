import Taro, {getCurrentInstance} from '@tarojs/taro';
import React, { Component, useState, useEffect } from 'react';
import { View, Picker, Text } from '@tarojs/components';
import { AtInput, AtIcon, AtToast } from 'taro-ui';
// import { connect } from 'react-redux';
// import { addToCart, deleteFromCart } from '../../store/actions/cartActions';
import { postRequest, getRequest } from '../../utils/api';
import './index.less';

// @connect(({ cartReducer, userReducer }) => ({
//   cartReducer,
//   userReducer,
// }))


// const res = await getRequest(`/goods/${params.id}`);
//     if (res && res.status === 200) {
//       this.setState({
//         fetchData: res.data,
//       });
//     }

const Cart =()=> {

      const selector = [
        { id: 1, value: 5, name: '5元' },
        { id: 2, value: 10, name: '10元' },
        { id: 3, value: 15, name: '15元' },
        { id: 4, value: 20, name: '20元' },
      ]
      const [selectorChecked, setSelectorChecked] = useState('请选择优惠券')
      const [discountMoney, setDiscountMoney] = useState(0)
      const [actualMoney, setActualMoney] = useState(10)
      const [goods, setGoods] = useState({})
      const [inputVal, setInputVal] = useState('')
      const [isOpen, setIsOpen] = useState(false)
      const [isSubmit, setIsSubmit] = useState(false)
      const currentUser = Taro.getStorageSync('user')
  

      useEffect(() => {
        const {
          router: { params = {} },
        } = getCurrentInstance() && getCurrentInstance();
        const fetchData = async()=>{
          const res = await getRequest(`/goods/${params.id}`);
          if (res && res.status === 200) {
            setGoods(res.data)
          }
        }
        fetchData()
        }, []);
      
  /**
   * @desc 添加商品
   * @param id
   * @param name
   * @param price
   */
  // addGood = async (id, name, price) => {
  //   this.props.dispatch(addToCart(id, name, price));
  //   this.setState({
  //     selectorChecked: '请选择优惠券',
  //     discountMoney: 0,
  //     actualMoney: this.props.cartReducer.totalMoney,
  //   });
  // };

  /**
   * 减少商品
   * @param id
   */
  // subtractNum = (id) => {
  //   this.props.dispatch(deleteFromCart(id));
  //   this.setState({
  //     selectorChecked: '请选择优惠券',
  //     discountMoney: 0,
  //     actualMoney: this.props.cartReducer.totalMoney,
  //   });
  // };

  /**
   * @desc 选择优惠券
   * @param e
   */
  const onSelectChange = (e) => {
    console.log(e)
    const originPrice = goods.price;
    const selected = selector[e.detail.value];
    let discountMoneyTemp = selected.value;
    let actualMoneyTemp = 0;

    if (discountMoneyTemp <= originPrice) {
      actualMoneyTemp = (originPrice - discountMoneyTemp).toFixed(2);
    } else {
      discountMoneyTemp = discountMoney;
      actualMoneyTemp = (originPrice - discountMoney).toFixed(2);
      setIsOpen(true)
      setTimeout(() => {
        setIsOpen(false)
      }, 2000);
    }
    setSelectorChecked(selected.value <= originPrice ? selected.name : selectorChecked)
    setDiscountMoney(discountMoneyTemp)
    setActualMoney(actualMoneyTemp)
    // this.setState({
    //   selectorChecked: selected.value <= totalMoney ? selected.name : this.state.selectorChecked,
    //   discountMoney,
    //   actualMoney:actualMoneyTemp,
    // });
  };

  /**
   * 填写备注
   * @param inputVal
   */
  const inputValChange = (inputVal) => {
    setInputVal(inputVal)
  };

  /**
   * 支付
   */
  const confirmPay = async () => {
    const data = {
      employer_id:currentUser._id,
      goods_id:goods._id,
    }
    await postRequest('/orderCreate', data);
    setIsSubmit(true)
    setTimeout(() => {
      setIsSubmit(false)
      Taro.switchTab({
        url: `/pages/order/index`,
      });
    }, 2000);

    // const data = await getRequest('/mock/payApi');
    // if (data.code === 0) {
      // Taro.requestPayment({
      //   timeStamp: '',
      //   nonceStr: '',
      //   package: '',
      //   signType: 'MD5',
      //   paySign: '',
      //   success: function (res) { console.log(res)},
      //   fail: function (res) {console.log(res) }
      // })
    // }
    
  };

    // const { selector, discountMoney, actualMoney, isOpen } = this.state;
    
    const { name, address, phone } = currentUser;
    console.log(goods)
    return (
      <View className='orderWrap'>
        <View className='userInfo'>
          <Text className='userInfoTxt'>收货人：{name}</Text>
          <Text className='userInfoTxt'>联系方式：{phone}</Text>
          <View className='userInfoAddr'>收货地址：{address}</View>
        </View>

        <View className='goodsWrap'>
          <View className='goodsTitle'>所选商品</View>

              <View className='goodsList' key={goods.id}>
                <Text className='goodName'>{goods.name}</Text>
                {/* <View className='goodOperate'>
                  <View className='goodIcon' onClick={this.subtractNum.bind(this, item.id)}>
                    <AtIcon value='subtract-circle' size='18' color='#2083e4' />
                  </View>
                  <Text className='goodNum'>x{item.num}</Text>
                  <View className='goodIcon' onClick={this.addGood.bind(this, item.id, null, null)}>
                    <AtIcon value='add-circle' size='18' color='#2083e4' />
                  </View>
                </View> */}
                <Text className='goodPrice'>￥{goods.price}</Text>
              </View>

          <Picker mode='selector' range={selector} rangeKey='name' 
          onChange={onSelectChange}
          >
            <View className='couponPicker'>
              红包<Text className='couponTxt'>{selectorChecked}</Text>
            </View>
          </Picker>
          <View className='totalMoney'>
            合计：
            <Text className='totalMoneyNum'>￥{actualMoney}</Text>
          </View>
          <View>
            <AtInput
              name='value'
              title='备注：'
              type='text'
              placeholder='请输入备注'
              value={inputVal}
              onChange={inputValChange}
            />
          </View>
        </View>

        <View className='orderBottom'>
          <View className='bottomTotal'>待支付：￥{actualMoney}</View>
          <View className='bottomCoupon'>已优惠：￥{discountMoney}</View>
          <View className='confirmPay' onClick={confirmPay}>
            确认支付1
          </View>
        </View>

        <AtToast isOpened={isOpen} text='优惠券金额不可以大于总金额' icon='sketch' />
        <AtToast isOpened={isSubmit} text='下单成功' icon='text-strikethrough' />
      </View>
    );
  
}

export default Cart;
