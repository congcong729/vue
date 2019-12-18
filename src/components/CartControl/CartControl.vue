<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont icon-remove_circle_outline" v-if="food.count" @click="updateCount(false)"></div>
    </transition>
    <div class="cart-count" v-if="food.count>0">{{food.count}}</div>
    <div class="iconfont icon-add_circle" @click="updateCount(true)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import throttle from 'lodash/throttle' 
  export default {
    props:{
      food:Object
    },
    methods:{
      //节流
      updateCount:throttle(function (isAdd) {
        this.$store.dispatch('updateFoodCount',{food:this.food,isAdd})
      },1000)
    }
  }
</script>

<style lang='stylus' rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
    .cartcontrol
      font-size: 0
      .cart-decrease
        display: inline-block
        padding: 6px
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)

      .icon-remove_circle_outline
        display: inline-block
        padding 6px
        line-height 24px
        font-size 24px
        color $green
        &.move-enter-active,&.move-leave-active
          transition all 0.5s
        &.move-enter,&.move-leave-to
          transform translateX(30px) rotate(180deg)
          opacity 0
      .cart-count
        display: inline-block
        vertical-align: top
        width: 12px
        padding-top: 6px
        line-height: 24px
        text-align: center
        font-size: 10px
        color: rgb(147, 153, 159)
      .icon-add_circle
        display: inline-block
        padding: 6px
        line-height: 24px
        font-size: 24px
        color $green
</style>
