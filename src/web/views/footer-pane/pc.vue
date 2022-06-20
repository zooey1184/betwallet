<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center">
      <img v-lazy='logo' alt="">
      <div class="right">
        ©2021 - Nesting - All Rights Reserved
      </div>
    </div>
    <div class="flex items-center">
      <div class="flex items-center">
        <a href='https://twitter.com/BetWeb3' target='_blank'>
          <img class="icon cursor-pointer" src='../../assets/icon-t.png' alt="">
        </a>
        <a href='https://medium.com/@betweb3official' target='_blank'>
          <img class="icon cursor-pointer" src='../../assets/icon-m.png' alt="">
        </a>
        
        <img class="icon cursor-pointer" src="../../assets/icon-discord.png" alt="">
        <img class="icon cursor-pointer" src="../../assets/icon-g.png" alt="">
      </div>
      <div class="text cursor-pointer link">Disclaimers</div>
    </div>
  </div>
  <div style="margin-top: 26px" class="text-align-center gray-9 font-size-12">
    indicative of future performance. Any investment in blockchain assets involves the risk of losing part or all of your investment. The value of your exchange’s blockchain assets is affected by market and other investment risks
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import logo from '../../assets/footer-logo.png'
import Icon_t from '../../assets/icon-t.png'
import Icon_m from '../../assets/icon-m.png'
import Icon_d from '../../assets/icon-discord.png'
import Icon_g from '../../assets/icon-g.png'
export default defineComponent({
  components: {},
  props: {},
  setup(props) {
    return {
      logo,
      Icon_t,
      Icon_m,
      Icon_d,
      Icon_g
    }
  }
})
</script>

<style lang="less" scoped>
.right {
  margin-left: 30px;
  @media (min-width: 900px) and (max-width: 1440px) {
    margin-left: 44px;
  }
  @media (min-width: 1441px) and (max-width: 1919px) {
    margin-left: 66px;
  }
  @media (min-width: 1920px) {
    margin-left: 99px;
  }
}
.text {
  margin-left: 30px;
  @media (min-width: 900px) and (max-width: 1440px) {
    margin-left: 50px;
  }
  @media (min-width: 1441px) and (max-width: 1919px) {
    margin-left: 99px;
  }
  @media (min-width: 1920px) {
    margin-left: 121px;
  }
}
.icon {
  width: 30px;
  height: 30px;
  margin-left: 16px;
  transition: all 150ms linear;
  &:hover {
    transform: scale(1.2);
  }
}
</style>