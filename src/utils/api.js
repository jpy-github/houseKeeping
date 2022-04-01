import Taro from '@tarojs/taro';

// export const apiUrl = 'http://rap2api.taobao.org/app/mock/257275/shop';
export const apiUrl = "http://localhost:3000";

export function getRequest(url, params) {
  return new Promise((resolve, reject) => {
    console.log(apiUrl + url)
    Taro.request({
      url: apiUrl + url,
      data: {
        ...params,
      },
      method: 'GET',
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}


export function postRequest(url, data) {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: apiUrl + url,
      data: data,
      method: 'POST',
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function customRequest(url, data, method='GET') {
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