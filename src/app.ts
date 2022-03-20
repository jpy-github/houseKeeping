import { Component } from "react";
import "taro-ui/dist/style/index.scss";
import { Provider } from "react-redux";
// import configStore from "./store";

// const store = configStore();

import "./app.less";

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  // render () {
  //   return (
  //     <Provider store={store}>{this.props.children}</Provider>;
  //     // <Provider store={store}>
  //     //   {this.props.children}
  //     // </Provider>
  //   )

  //   // this.props.children
  // }
  render() {
    // return <Provider>1</Provider>
    return this.props.children;
  }
}

export default App
