// import Taro from '@tarojs/taro';
// import React, { Component } from 'react';
// import { View, Input } from '@tarojs/components';
// import { AtToast } from 'taro-ui';
// // import { connect } from 'react-redux';
// // import { editUserInfo } from '../../store/actions/userActions';
// import './index.less';

// // @connect(({ userReducer }) => ({
// //   userReducer,
// // }))
// // class UserEdit extends Component {
// //   constructor() {
// //     console.log('useredit1')
// //     super(...arguments);
// //     this.state = {
// //       consignee: '',
// //       address: '',
// //       phone: '',
// //       isOpen: false,
// //     };
// //   }
// const UserEdit = ()=>{

//   // componentDidMount = () => {
//   //   // const { userReducer = {} } = this.props;

//   //   // this.setState({
//   //   //   consignee: userReducer.consignee,
//   //   //   address: userReducer.address,
//   //   //   phone: userReducer.phone,
//   //   // });
//   //   console.log('useredit2')
//   // };

//   // /**
//   //  * @desc 收货人搜索框
//   //  * @param { object } e
//   //  */
//   // onConsigneeChange = async (e) => {
//   //   this.setState({ consignee: e.detail.value });
//   // };

//   // /**
//   //  * @desc 收货地址搜索框
//   //  * @param { object } e
//   //  */
//   // onAddressChange = async (e) => {
//   //   this.setState({ address: e.detail.value });
//   // };

//   // /**
//   //  * @desc 联系电话搜索框
//   //  * @param { object } e
//   //  */
//   // onPhoneChange = async (e) => {
//   //   this.setState({ phone: e.detail.value });
//   // };

//   // /**
//   //  * @desc 提交
//   //  */
//   // submitEdit = async () => {
//   //   this.setState({ isOpen: true });
//   //   // this.props.dispatch(editUserInfo(this.state.consignee, this.state.address, this.state.phone));

//   //   setTimeout(() => {
//   //     this.setState({ isOpen: false });
//   //     Taro.navigateBack();
//   //   }, 2000);
//   // };
//     const { consignee='', address='', phone='', isOpen='' } = {};
// return 12131234
//     return (
//       <View className='userEditWrap'>
//         <View className='infoItem'>
//           <View className='prefixDom'>收货人：</View>
//           <View className='inputDom'>
//             <Input
//               type='text'
//               value={consignee}
//               onChange={this.onConsigneeChange.bind(this)}
//               className='inputNode'
//             />
//           </View>
//         </View>

//         <View className='infoItem'>
//           <View className='prefixDom'>收货地址：</View>
//           <View className='inputDom'>
//             <Input
//               type='text'
//               value={address}
//               onChange={this.onAddressChange.bind(this)}
//               className='inputNode'
//             />
//           </View>
//         </View>

//         <View className='infoItem'>
//           <View className='prefixDom'>联系电话：</View>
//           <View className='inputDom'>
//             <Input
//               type='text'
//               value={phone}
//               onChange={this.onPhoneChange.bind(this)}
//               className='inputNode'
//             />
//           </View>
//         </View>

//         <View className='submitBtn' onClick={this.submitEdit.bind(this)}>
//           提交
//         </View>

//         <AtToast isOpened={isOpen} text='修改成功' icon='heart-2' />
//       </View>
//     );
// }

// export default UserEdit;

// const a = ()=><View>1</View>
// export default a

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
