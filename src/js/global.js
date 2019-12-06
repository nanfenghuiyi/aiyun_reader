
// 当前地址
let baseUrl = ''

if (window.location.host == 'static.a56999.com') {
  baseUrl = 'https://zu.a56999.com'
} else {
  baseUrl = 'http://sit.zuapi.a56999.com'
}

export default {
  baseUrl
}