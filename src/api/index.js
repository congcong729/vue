import ajax from './ajax'
export const req_address = (longitude,latitude)=>ajax(`/position/${latitude},${longitude}`)
export const req_categorys = ()=>ajax('/index_category',{header:{needcheck:true}})
export const req_shops = ({longitude,latitude})=>ajax('/shops',{params: {latitude,longitude},header:{needcheck:true}})
export const req_sendcode = (phone)=>ajax.get('/sendcode',{params: {phone}})
export const req_loginpwd = ({name,pwd,captcha})=>ajax.post('/login_pwd',{name,pwd,captcha})
export const req_loginsms = ({phone,code})=>ajax.post('/login_sms',{phone,code})
export const req_autoLogin = ()=>ajax.get('/auto_login')