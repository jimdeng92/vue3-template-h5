/* eslint-env node */
module.exports = {
  'plugins': {
    'autoprefixer': {
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'not ie <= 11',  //不考虑IE浏览器
        'ff >= 30', //仅新版本用“ff>=30
        '> 1%',//  全球统计有超过1%的使用率使用“>1%”;
        'last 2 versions', // 所有主流浏览器最近2个版本
      ],
      grid: true ,// 开启grid布局的兼容(浏览器IE除外其他都能兼容grid，可以关闭开启)
    },
    'postcss-pxtorem': {
      rootValue: 37.5, // 换算的基数
      unitPrecision: 3, // 允许REM单位增长到的十进制数字,小数点后保留的位数。
      exclude: /(node_module)/,
      selectorBlackList: ['.no-rem', 'no-rem', '.van'],// 要忽略的选择器并保留为px。
      propList: ['*'], //可以从px更改为rem的属性。
      mediaQuery: false, // （布尔值）允许在媒体查询中转换px。
      minPixelValue: 1 // 设置要替换的最小像素值。
    }
  }
}
