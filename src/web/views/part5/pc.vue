<template>
  <Wrap>
    <template #default='data'>
      <div class="gutter_col flex justify-between pos-r">
        <img :src='BgImg' class='abs-bg' alt="">
        <div :class="{'slidein-right': data.show[1]}" class="slideout-left" style="width: 40%; padding-top: 11vh">
          <Steps :options="options" />
        </div>
        
        <div  :class="{'slidein-left': data.show[1]}" class="slideout-right" style='width: 50%'>
          <div class="linear-color title-lg inline-block">Easy to use product</div>
          <div class="mt-24 desc">Betweb3 uses blockchain technology to restore and optimize the interactive experience of traditional sports betting platforms for ease of use</div>
          <div class="flex justify-end" style="margin-top: 10vh">
            <div style="height: 16.5vw; width: 24vw" class="bg-gray-30"></div>
          </div>
        </div>
      </div>
    </template>
  </Wrap>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Steps from '../../components/steps'
import Wrap from '@/web/components/wrap'
import MouseTrack from '@/web/components/mouse-track'
import BgImg from '../../assets/part5-bg.png'
export default defineComponent({
  components: {
    Steps,
    Wrap,
    MouseTrack
  },
  props: {},
  setup(props) {
    return {
      options: [
        {
          label: 'connect walle',
          desc: 'Choose a wallet and connect'
        },
        {
          label: 'Choose game',
          desc: 'Choose football, basketball, eSports events'
        },
        {
          label: 'place a bet',
          desc: 'Choose the market and bet amount, and bet within the limits'
        },
        {
          label: 'send transaction',
          desc: 'Complete the betting transaction after waiting for the block to be confirmed'
        },
        {
          label: 'bet wins',
          desc: 'The capital pool will automatically transfer USDT to the winning address through the smart contract'
        },
      ],
      BgImg
    }
  }
})
</script>

<style lang="less" scoped>
.abs-bg {
  position: absolute;
  left: -5vw;
  top: -8vw;
  width: 19.4vw;
  height: auto;
}
</style>