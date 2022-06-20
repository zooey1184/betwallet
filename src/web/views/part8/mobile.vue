<template>
  <Wrap>
    <template #default='data'>
      <div class="mb-48 pos-r">
        <img src="../../assets/part8-bg1.png" class="abs-bg1" alt="">
        <img src="../../assets/part8-bg2.png" class="abs-bg2" alt="">
        <div class="text-align-center">
          <div style="margin-bottom: 26px" class="inline-block linear-color title-lg">Road map</div>
        </div>
        <div class="subTitle mb-24">We are also working on ex、panding the Web3bet ecosystem.Stay tuned…</div>
        <div class="">
          <transition name="slideRight">
            <div>
              <CircleMap v-model:active='state.active' />
            </div>
          </transition>
          <transition name="slideLeft">
            <div style="width: 100%;" class="mt-24">
              <Steps :options="options" v-model:active='state.active' />
            </div>
          </transition>
          
        </div>
      </div>
    </template>
  </Wrap>
</template>


<script>
import { defineComponent, reactive, ref } from 'vue'
import Steps from '../../components/steps/m-index.vue'
import CircleMap from './circle-map'
import Wrap from '@/web/components/wrap'

export default defineComponent({
  components: {
    Steps,
    CircleMap,
    Wrap
  },
  props: {},
  setup(props) {
    const state = reactive({
      active: 0,
    })
    return {
      state,
      options: [
        {
          label: 'Q2 2022',
          value: 'q202',
          desc: [
            'Sports betting platform test network online',
            'Top audit firm completes contract audit',
            'Airdrop plan announced'
          ]
        },
        {
          label: 'Q3 2022',
          value: 'q302',
          desc: [
            'Complete the token Public Sale',
            'Establishment of initial capital pool',
            'Sports betting platform V1 officially released, covering football, basketball and e-sports',
            'Token pledge officially launched',
            'Released on Binance Smart Chain, Polygon, Avalanche, Arwave, Solana'
          ]
        },
        {
          label: 'Q4 2022',
          value: 'q402',
          desc: [
            'World Cup overall publicity plan launched',
            'Launch of AI bot developed in partnership with top sports betting data firm',
            'Sponsorship from top event teams',
            'Released on Binance Smart Chain, Polygon, Avalanche, Arwave, Solana'
          ]
        },
        {
          label: 'Q1 2023',
          value: 'q103',
          desc: [
            'Sports category expansion, horse racing，golf, tennis, darts, baseball, snooker, tennis, etc.',
            'Expansion of entertainment methods such as lottery, blackjack, baccarat, and "Horse" machine',
            'The exclusive community governance platform "Congress" is launched'
          ]
        },
        {
          label: 'Q2 2023',
          value: 'q203',
          desc: [
            'Completed the upgrade of sports betting game and added the in-play game',
            'Cooperate with European and American e-sports event service providers to hold CS:GO Betweb3 Cup Competition with a total prize of 1 million USDT',
            'The community governance plan was officially released"'
          ]
        },
      ]
    }
  }
})
</script>


<style lang="less" scoped>
.abs-bg1 {
  position: absolute;
  left: -10.2vw;
  top: -10vw;
  width: 21vw;
  height: auto;
}
.abs-bg2 {
  position: absolute;
  right: 0;
  top: -10vw;
  width: 26.4vw;
  height: auto;
}
</style>