import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  SAVE_USER,
  SAVE_TOKEN,
  RESET_USER,
  RESET_TOKEN,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  ADD_FOODCOUNT,
  REDUCE_FOODCOUNT
} from './mutationtypes'

import {
  req_address,
  req_categorys,
  req_shops,
  req_autoLogin,
  req_goods,
  req_ratings,
  req_info
} from '../api/index.js'
export default {
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
  },
  saveuser({commit},user){
    const token = user.token
    delete user.token
    localStorage.setItem('token_key', token)
    commit(SAVE_USER,user)
    commit(SAVE_TOKEN,token)
  },
  async autologin({commit,state}){
    if(state.token && !state.user._id){
      const result = await req_autoLogin()
      if(result.code===0){
        const user = result.data
        commit(SAVE_USER,user)
      }
    }
  },
  logout({commit}){
    localStorage.removeItem('token_key')
    commit(RESET_USER)
    commit(RESET_TOKEN)
  },
  async getgoods({commit}){
    const result = await req_goods()
    if(result.code===0){
      const goods = result.data
      commit(RECEIVE_GOODS,{goods})
     }
  },
  async getratings({commit}){
    const result = await req_ratings()
    if(result.code===0){
      const ratings = result.data
      commit(RECEIVE_RATINGS,{ratings})
    }
  },
  async getinfo({commit}){
    const result = await req_info()
    if(result.code===0){
      const info = result.data
      commit(RECEIVE_INFO,{info})
    }
  },
  updateFoodCount({commit},{food,isAdd}){
    if(isAdd){
      commit(ADD_FOODCOUNT,{food,isAdd})
    }else{
      commit(REDUCE_FOODCOUNT,{food})
    }
  }
}