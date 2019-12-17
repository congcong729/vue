/* 
对axio进行2次封装一个能发ajax请求的函数
1. 统一处理请求异常
2. 异步请求成功的数据不是response, 而是response.data
3. 对请求体参数进行urlencode处理, 而不使用默认的json方式(后台接口不支持)
4. 配置请求超时的时间
5. 通过请求头携带token数据
*/
import axios from 'axios'
import qs from 'qs'
import { Indicator, Toast, MessageBox } from 'mint-ui'
import store from '@/vuex'
import router from '@/router'
const instance = axios.create({
  baseURL:'/api',
  timeout:20000
})
instance.interceptors.request.use((config)=>{
  Indicator.open()
  const data = config.data
 
  if(data instanceof Object){
    config.data = qs.stringify(data)
  }
  const token = store.state.token
  if(token){
    config.headers['Authorization'] = token
  }else{
    if(config.headers.needcheck){
      throw new Error('没有登录，不能请求')
    }
  }
  return config
})
instance.interceptors.response.use(
  (response)=>{
    Indicator.close()
    return response.data
  },
  (error)=>{
    Indicator.close()
    //没发请求
    const response = error.response
    if(!response){
      const path = route.currentRoute.path
      if(path!=='/login'){
        router.replace('/login')
        Toast(error.response.data.message || '登陆失效, 请重新登陆')
      }
    }else{
      if(error.response.status===401){
        const path = router.currentRoute.path
        if(path!='/login'){
          router.replace('/login')
          Toast(error.message)
        }
        
      }else if(error.response.status===404){
        MessageBox('提示','访问资源不存在')
      }else{
        MessageBox('提示',error.msg)
      }
    }
    
    return new Promise(()=>{})
  }
)
export default instance