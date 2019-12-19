import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
}from '../mutationtypes'

import {
  req_address,
  req_categorys,
  req_shops
} from '../api/index.js'
export default {
  state:{
    latitude: 40.10038, // 纬度
    longitude: 116.36867, // 经度
    address: {}, // 地址信息对象
    categorys: [], // 分类数组
    shops: [], //商家数组
  },
  mutations:{
    [RECEIVE_ADDRESS](state,address){
      state.address = address
    },
    [RECEIVE_CATEGORYS](state,categorys){
      state.categorys = categorys
    },
    [RECEIVE_SHOPS](state,shops){
      state.shops = shops
    }
  },
  actions:{
    async getaddress({commit,state}){
      const {longitude,latitude} = state
      const result = await req_address(longitude,latitude)
      if(result.code===0){
        const address = result.data
        commit(RECEIVE_ADDRESS,address)
      }
    },
    async getcategorys({commit}){
      const result = await req_categorys()
      if(result.code===0){
        const categorys = result.data
        commit(RECEIVE_CATEGORYS,categorys)
      }
    },
    async getshops({commit,state}){
      const {longitude,latitude} = state
      const result = await req_shops(longitude,latitude)
      if(result.code===0){
        const shops = result.data
        commit(RECEIVE_SHOPS,shops)
      }
    }
  },
  getters:{
    
  }
}