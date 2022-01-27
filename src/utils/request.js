import axios from 'axios';
import qs from 'qs';

// new Map()
// 类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键
const pendingRequest = new Map();

// 生成 key
function generateReqKey(config) {
  const {
    method, url, params, data,
  } = config;
  return [method, url, qs.stringify(params), qs.stringify(data)].join('&');
}

// 用于把当前请求信息添加到pendingRequest对象中
function addPendingRequest(config) {
  const requestKey = generateReqKey(config);
  // eslint-disable-next-line
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
    if (!pendingRequest.has(requestKey)) {
      pendingRequest.set(requestKey, cancel);
    }
  });
}

// 检查是否存在重复请求，若存在则取消已发的请求
function removePendingRequest(config) {
  const requestKey = generateReqKey(config);
  if (pendingRequest.has(requestKey)) {
    const cancelToken = pendingRequest.get(requestKey);
    cancelToken(requestKey); // 取消请求
    pendingRequest.delete(requestKey);
  }
}

const instance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 10000,
});

// request 拦截器
instance.interceptors.request.use(
  (config) => {
    removePendingRequest(config);
    addPendingRequest(config);
    return config;
  },
  (error) => Promise.reject(error),
);

// response 拦截器
instance.interceptors.response.use(
  (response) => {
    removePendingRequest(response.config);
    return Promise.resolve(response);
  },
  (error) => {
    removePendingRequest(error.config || {});
    if (axios.isCancel(error)) {
      console.error(`已取消的重复请求：${error.message}`);
    }
    return Promise.reject(error);
  },
);

// 提取 response.data
export const request = async (url, config) => {
  const response = await instance({ url, ...config });
  return response.data;
};

export default instance;
