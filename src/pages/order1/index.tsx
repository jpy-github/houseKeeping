// 用户信息编辑


import Taro from '@tarojs/taro';
import React, { Component, useState, useEffect } from 'react';
import { View, Input } from '@tarojs/components';
import { AtToast } from 'taro-ui';
// import { connect } from 'react-redux';
// import { editUserInfo } from '../../store/actions/userActions';
import './index.less';

// @connect(({ userReducer }) => ({
//   userReducer,
// }))
// class UserEdit extends Component {
//   constructor() {
//     console.log('useredit1')
//     super(...arguments);
//     this.state = {
//       consignee: '',
//       address: '',
//       phone: '',
//       isOpen: false,
//     };
//   }
const UserEdit = ()=>{
  const [consignee, setConsignee] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
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
    // this.props.dispatch(editUserInfo(this.state.consignee, this.state.address, this.state.phone));

    setTimeout(() => {
      // this.setState({ isOpen: false });
      Taro.navigateBack();
    }, 2000);
  };
    // const { consignee='', address='', phone='', isOpen='' } = {};
// return 12131234
    return (
      <View className='userEditWrap'>
        <View className='infoItem'>
          <View className='prefixDom'>收货人：</View>
          <View className='inputDom'>
            <Input
              type='text'
              value={consignee}
              onChange={onConsigneeChange.bind(this)}
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
              onChange={onAddressChange.bind(this)}
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
              onChange={onPhoneChange.bind(this)}
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