<template>
  <footer class="footer_guide">
    <span class="guide_item" @click="goto('/msite')" :class="{on:$route.path==='/msite'}">
      <span>
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>{{$t('footer_msite')}}</span>
    </span>
    <span class="guide_item" @click="goto('/search')"  :class="{on:$route.path==='/search'}">
      <span>
        <i class="iconfont icon-search"></i>
      </span>
      <span>{{$t('footer_search')}}</span>
    </span>
    <span class="guide_item" @click="goto('/order')" :class="{on:$route.path==='/order'}">
      <span>
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>{{$t('footer_order')}}</span>
    </span>
    <span class="guide_item" @click="goto('/profile')" :class="{on:$route.path==='/profile'}">
      <span>
        <i class="iconfont icon-geren"></i>
      </span>
      <span>{{$t('footer_profile')}}</span>
    </span>
  </footer>
</template>

<script type="text/ecmascript-6">
  export default {
    methods:{
      goto(path){
        if (path!==this.$route.path) {
          this.$router.replace(path)
        }
      }
    }
  }
</script>

<style lang='stylus' rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'
  .footer_guide
    top-border-1px(#cccccc)
    z-index 100
    display flex
    position fixed
    left 0
    bottom 0
    width 100%
    height 50px
    background-color #fff
    .guide_item
      display flex
      flex-direction column
      text-align center
      width 25%
      &.on
        color $green
      span
        margin-top 4px
        font-size 12px
        .iconfont
          font-size 22px
 
</style>
