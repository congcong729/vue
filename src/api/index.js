import ajax from './ajax'
export const req_adress = (longitude,latitude)=>ajax(`/position/${longitude},${latitude}`)
export const req_categorys = ()=>ajax('/index_category')
export const req_categorys = ({longitude,latitude})=>ajax('/shops')