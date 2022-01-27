import { request } from '@/utils/request';
import { deviceId } from '@/utils/enumeration';

// 获取基金估值
export function getFundGZList(codes = []) {
  const params = {
    pageIndex: 1,
    pageSize: codes.length,
    appType: 'ttjj',
    product: 'EFund',
    plat: 'Android',
    deviceid: deviceId,
    Version: 1,
    Fcodes: codes.join(),
  };

  return request(
    'https://fundmobapi.eastmoney.com/FundMNewApi/FundMNFInfo',
    {
      params,
    },
  );
}

// 获取热门主题
export function getHotTheme() {
  return request(
    'https://emdatah5.eastmoney.com/dc/NXFXB/GetHotTheme',
  );
}
