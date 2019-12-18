<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:isShowSms}" @click="isShowSms=true">短信登录</a>
          <a href="javascript:;" :class="{on:!isShowSms}" @click="isShowSms=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:isShowSms}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" 
              v-model="phone" name="phone" v-validate="'required|mobile'">
              <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
              <button :disabled="!isRightPhone||count>0" class="get_verification" @click.prevent="sendcode" 
               :class="{right_phone_number:isRightPhone}">{{count>0?`短信已发送(${count}s)`:"获取验证码"}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code" name="code" v-validate="{required: true,regex: /^\d{6}$/}" >
              <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!isShowSms}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="用户名"
                  v-model="name" name="name" v-validate="'required'">
                <span style="color: red;" v-show="errors.has('name')">{{ errors.first('name') }}</span>  
              </section>
              <section class="login_verification">
                <input :type="isShowPwd?'text':'password'" maxlength="8" placeholder="密码"
                  v-model="pwd" name="pwd" v-validate="'required'">
                <span style="color: red;" v-show="errors.has('pwd')">{{ errors.first('pwd') }}</span>   
                <div class="switch_button" :class="isShowPwd?'on':'off'" @click="isShowPwd=!isShowPwd">
                  <div class="switch_circle" :class="{right:isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd?'abc':''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码"
                 v-model="captcha" name="captcha" v-validate="{required: true,regex: /^[0-9a-zA-Z]{4}$/}">
                 <span style="color: red;" v-show="errors.has('captcha')">{{ errors.first('captcha') }}</span>
                <img class="get_verification" src="/api/captcha" alt="captcha" @click="updateCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">{{$t('login')}}</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
        <br>
        <button @click.prevent="toggleLocal">切换语言</button>
      </div>
      <a href="javascript:" class="go_back">
        <i class="iconfont icon-jiantou2" @click="$router.replace('/profile')"></i>
      </a>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import { Toast, MessageBox } from 'mint-ui'
  export default {
    data(){
      return{
        isShowSms:true,
        phoneNum:'',
        isShowPwd:false,
        count:0,
        phone:'',
        code:'',
        name:'',
        pwd:'',
        captcha:''
      }
    },
    computed:{
      isRightPhone(){
        return /^1\d{10}$/.test(this.phone)
      }
    },
    methods:{
      async sendcode(){
        this.count = 10
        const timeId = setInterval(() => {
          this.count=this.count-1
          if (this.count <= 0) {
            clearInterval(timeId)
            this.count = 0
          }
        }, 1000)
        const result = await this.$API.req_sendcode(this.phone)
        if(result.code===0){
          Toast('验证码发送成功')
        }else{
          this.count = 0
          MessageBox('提示',result.msg||'验证码发送失败')
        }
      },
      updateCaptcha(){
        this.$refs.captcha.src='/api/captcha?time='+Date.now()
      },

      async login () {
        let names
        if (this.isShowSms) {
          names = ['phone','code']
        }else{
          names = ['name','pwd','captcha']
        }
        this.updateCaptcha()
        const success = await this.$validator.validateAll(names)
        let result
        if (success) {
          //判断是那种登录方式，发相对应的登录请求
          const {isShowSms,phone,code,name,pwd,captcha} = this
          if(isShowSms){
            result = await this.$API.req_loginsms({phone,code})
          }else{
            result = await this.$API.req_loginpwd({name,pwd,captcha})
          }
          if(result.code===0){
            const user = result.data
            this.$store.dispatch('saveuser',user)
            this.$router.replace('/profile')
          }else{
            MessageBox('提示',result.msg)
          }
        }
      },
      toggleLocal(){
        const locale = this.$i18n.locale==='zh_CN'?'en':'zh_CN'
        this.$i18n.locale=locale
        localStorage.setItem('locale_key',locale)
      }
    }
  }
</script>

<style lang='stylus' rel="stylesheet/stylus" scoped>
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                      transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
 
</style>
