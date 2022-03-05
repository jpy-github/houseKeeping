import Taro, { Component } from "@tarojs/taro";
import { useState, useEffect } from "react";
import { Swiper, SwiperItem, Image, View } from "@tarojs/components";
import PropTypes from "prop-types";
import "./index.less";

const MySwiper = (props)=> {

  useEffect(() => {
    console.log('321')
    }, []);

    const {
      // banner,
      home=false,
    } = props;
    const banner = [
      {image_src:'https://img.staticdj.com/0d02e62e143767be187d23db01925aa8.jpg'},
      {image_src:'https://cdn.shopify.com/s/files/1/0264/5121/4410/products/Hypoallergenic-Earring-Lifts_01_a097a402-3952-4978-8c71-1563ea34397e.jpg?v=1607592825'}
    ]
    return (
      <Swiper
        className={!home ? "swiper-container" : "swiper"}
        circular
        indicatorDots
        indicatorColor="#999"
        indicatorActiveColor="#bf708f"
        autoplay
      >
        {banner.map((item, index) => (
          <SwiperItem key={index}>
            <Image mode='widthFix' src={`${item.image_src}!w750`} />
          </SwiperItem>
        ))}
      </Swiper>
      // <View className='index'>123</View>
    );
  }

  export default MySwiper