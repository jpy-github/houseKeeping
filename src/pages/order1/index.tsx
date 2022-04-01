// 用户信息编辑


import Taro from '@tarojs/taro';
import React, { Component, useState, useEffect } from 'react';
import { View, Input } from '@tarojs/components';
import { AtToast } from 'taro-ui';
// import { customRequest } from 'src/utils/api';
// import { connect } from 'react-redux';
// import { editUserInfo } from '../../store/actions/userActions';
import './index.less';
import userInit from './userinit';

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

const UserEdit = ()=>{
  const currentUser = Taro.getStorageSync('user')
  const { name:initConsignee='', address:initAddress='', phone:initPhone=''} = currentUser;
  const [consignee, setConsignee] = useState(initConsignee)
  const [address, setAddress] = useState(initAddress)
  const [phone, setPhone] = useState(initPhone)
  const [isOpen, setIsOpen] = useState(false)
  

  // componentDidMount = () => {
  //   // const { userReducer = {} } = this.props;

  //   // this.setState({
  //   //   consignee: userReducer.consignee,
  //   //   address: userReducer.address,
  //   //   phone: userReducer.phone,
  //   // });
  //   console.log('useredit2')
  // };

  /**
   * @desc 收货人搜索框
   * @param { object } e
   */
  const onConsigneeChange = async (e) => {
    console.log(e.detail.value)
    setConsignee(e.detail.value)
  };

  /**
   * @desc 收货地址搜索框
   * @param { object } e
   */
  const onAddressChange = async (e) => {
    setAddress(e.detail.value)
  };

  /**
   * @desc 联系电话搜索框
   * @param { object } e
   */
   const onPhoneChange = async (e) => {
     setPhone(e.detail.value)
  };

  /**
   * @desc 提交
   */
   const submitEdit = async () => {
     setIsOpen(true)
     await customRequest(`/employer`, {id:currentUser._id,name:consignee, address, phone}, 'PUT');
     await userInit()
    // this.props.dispatch(editUserInfo(this.state.consignee, this.state.address, this.state.phone));

    setTimeout(() => {
      setIsOpen(false)
      Taro.navigateBack();
    }, 2000);
  };
// return 12131234
    return (
      <View className='userEditWrap'>
        <View className='infoItem'>
          <View className='prefixDom'>收货人：</View>
          <View className='inputDom'>
            <Input
              type='text'
              value={consignee}
              // onChange={onConsigneeChange}
              onBlur={onConsigneeChange}
              className='inputNode'
            />
          </View>
        </View>

        <View className='infoItem'>
          <View className='prefixDom'>收货地址：</View>
          <View className='inputDom'>
            <Input
              type='text'
              value={address}
              onBlur={onAddressChange}
              className='inputNode'
            />
          </View>
        </View>

        <View className='infoItem'>
          <View className='prefixDom'>联系电话：</View>
          <View className='inputDom'>
            <Input
              type='text'
              value={phone}
              onBlur={onPhoneChange}
              className='inputNode'
            />
          </View>
        </View>

        <View className='submitBtn' onClick={submitEdit.bind(this)}>
          提交
        </View>

        <AtToast isOpened={isOpen} text='修改成功' icon='heart-2' />
      </View>
    );
}

export default UserEdit;