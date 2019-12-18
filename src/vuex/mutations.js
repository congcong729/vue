import Vue from 'vue'
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
export default {
  [RECEIVE_ADDRESS](state,address){
    state.address = address
  },
  [RECEIVE_CATEGORYS](state,categorys){
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state,shops){
    state.shops = shops
  },
  [SAVE_USER](state,user){
    state.user = user
  },
  [SAVE_TOKEN](state,token){
    state.token = token
  },
  [RESET_USER](state){
    state.user = {}
  },
  [RESET_TOKEN](state){
    state.token = ''
  },
  [RECEIVE_GOODS](state,{goods}){
    state.goods = goods
  },
  [RECEIVE_RATINGS](state,{ratings}){
    state.ratings = ratings
  },
  [RECEIVE_INFO](state,{info}){
    state.info = info
  },
  [ADD_FOODCOUNT](state,{food,isAdd}){
    if(food.count){
      food.count++
    }else{
      Vue.set(food,'count',1)
    }
  },
  [REDUCE_FOODCOUNT](state,{food}){
    food.count--
  }
}