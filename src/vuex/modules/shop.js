import Vue from 'vue'
import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  ADD_FOODCOUNT,
  REDUCE_FOODCOUNT
}from '../mutationtypes'
import {
  req_goods,
  req_ratings,
  req_info
} from '../api/index.js'
export default {
  state:{
    goods:[],
    ratings:[],
    info:{}
  },
  mutations:{
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
  },
  actions:{
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
  },
  getters:{
    
  }
}