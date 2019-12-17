import {RECEIVE_ADDRESS,RECEIVE_CATEGORYS,RECEIVE_SHOPS,SAVE_USER,SAVE_TOKEN} from './mutationtypes'
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
  }
}