import {
  SAVE_USER,
  SAVE_TOKEN,
  RESET_USER,
  RESET_TOKEN,
}from '../mutationtypes'
import {req_autoLogin} from '../api/index.js'
export default {
  state:{
    user:{},
    token:localStorage.getItem('token_key')||'',
  },
  mutations:{
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
    }
  },
  actions:{
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
    }
  },
  getters:{

  }
}