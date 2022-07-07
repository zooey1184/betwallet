<template>

  <Wrap>
    <template #default='data'>
      <div class="gutter_col">
        
        <div>
          <div class="title-lg linear-color inline-block text-align-center">Tokenomics</div>
          <!-- <div class="mt-8 subTitle">Web3bet 正在扩展以将体育投注体验带到所有兼容的网络  Tokenomics</div> -->
          <div class="pos-r flex-0 mr-40tv">
          <img class="w-100p coin-img" src="../../assets/part7_2.png" alt="">
          <img class="w-100p" src="../../assets/part7_1.jpg" alt="">
        </div>

          <div class="flex mt-24 flex-wrap">
            <transition name='slideBottom'>
              <div class="w-50p mb-16" >
                <div class="gray-9d  desc desc_mb-24">Token Name</div>
                <div class="desc">Web3bet Token</div>
              </div>
            </transition>
            
            <transition name='slideBottom'>
              <div class="w-50p mb-16">
                <div class="gray-9d desc desc_mb-24">Token ticker</div>
                <div class="desc">BET</div>
              </div>
            </transition>
            <transition name="slideBottom">
              <div class="w-50p mb-16">
                <div class="gray-9d desc desc_mb-24">Token type</div>
                <div class="desc">ERC-20</div>
              </div>
            </transition>
            <transition name="slideBottom">
              <div class="w-50p mb-16">
                <div class="gray-9d desc desc_mb-24 ">Token supply</div>
                <div class="desc">1,000,000,000</div>
              </div>
            </transition>
          </div>
          <div class="flex mt-60tv">
            <transition name="slideBottom">
              <div class="w-50p">
                <div class="flex items-center">
                  <img class="icon_w" src="../../assets/part7-1.png" alt="">
                  <div class="desc_title ml-8">Governance</div>
                </div>
                <div class="ml-50tv grey">
                  <div class="desc">Hold BET tokens to gain voting rights on the protocol</div>
                </div>
              </div>
            </transition>
            <transition name="slideBottom">
              <div class="w-50p">
                <div class="flex items-center">
                  <img class="icon_w" src="../../assets/part7-2.png" alt="">
                  <div class="desc_title ml-8">Staking Reward</div>
                </div>
                <div class="ml-50tv grey">
                  <div class="desc">Earn 50% of the profit of the capital pool since staking BET tokens</div>
                </div>
              </div>
            </transition>
          </div>
          <div class="mt-48">
            <transition name="slideBottom">
              <LinearBox>
                <div class="primary font-size-14 info_btn px-48 py-8">More information
                  <img style="margin-left: 4px" src="../../assets/arrow.png" alt="">
                </div>
              </LinearBox>
            </transition>
          </div>
        </div>
      </div>
    </template>
  </Wrap>
</template>

<script>
import { defineComponent, ref } from 'vue'
import LinearBox from '../../components/linear-box'
import Wrap from '@/web/components/wrap'

export default defineComponent({
  components: {
    LinearBox,
    Wrap
  },
  props: {},
  setup(props) {}
})
</script>

<style lang="less" scoped>
.coin-img {
  position: absolute;
  top: 2vw;
  left: 42%;
  width: 5.2vw;
  animation: slide 5000ms ease-in-out infinite;
  @media (max-width: 600px) {
    width: 20vw;
  }
}
@keyframes slide {
  0% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-20px) scale(1.1);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}
.info_btn {
  user-select: none;
  text-align: center;
  -moz-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
  &:active {
    color: #fff;
  }
}
.desc_title {
  font-size: 15px;
  font-weight: 600;
  cursor: default;
  @media (min-width: 900px) and (max-width: 1440px) {
    font-size: 16px;
    margin-bottom: 10px;
  }
  @media (min-width: 1441px) and (max-width: 1919px) {
    font-size: 17px;
    margin-bottom: 11px;
  }
  @media (min-width: 1920px) {
    font-size: 18px;
    margin-bottom: 13px;
  }
}
.desc_mb-24 {
  margin-bottom: 1.25vw;
  // text-align: center;
  cursor: default;
}
.mr-40tv {
  margin-right: 2vw;
}
.ml-50tv {
  margin-left: 0
}
.icon_w {
  width: 24px;
  height: 24px;
  @media (min-width: 900px) and (max-width: 1440px) {
    margin-bottom: 48px;
  }
  @media (min-width: 1441px) and (max-width: 1919px) {
    margin-bottom: 50px;
  }
  @media (min-width: 1920px) {
    margin-bottom: 54px;
  }
}
.mt-60tv {
  margin-top: 3vw;
}
</style>