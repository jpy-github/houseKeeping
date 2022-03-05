export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/order/index",
    "pages/order1/index",
    "pages/goodInfo/index",
    "pages/user/index",
    // "pages/detail/index",
    "pages/newpage/index",
    "pages/test/index",
    // "pages/userEdit/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    list: [
      {
        pagePath: "pages/index/index",
        // selectedIconPath:'pages/index/index',
        selectedIconPath: "./images/tab/home-active.png",
        iconPath: "./images/tab/home.png",
        text: "首页1",
      },
      {
        pagePath: "pages/order/index",
        // selectedIconPath:'pages/order/index',
        selectedIconPath: "./images/tab/cart-active.png",
        iconPath: "./images/tab/cart.png",
        text: "订单1",
      },
      {
        pagePath: "pages/user/index",
        // selectedIconPath:'pages/order/index',
        iconPath: "./images/tab/user.png",
        selectedIconPath: "./images/tab/user-active.png",
        text: "我的",
      },
    ],
  },
});
