<template>
  <Wrap>
    <template #default='data'>
      <div class="pos-r">
        <img :src='BgImg' class="pos-a" style="left: -8vw; top: -12vw; z-index: 9" alt="">
        <div class="flex gutter_col items-center justify-between">
          <div style="height: 18vw; width: 24vw" class="pos-r flex-0 mr-24 mt-16">
            <!-- <img class="w-100p gif-pane" :src='Gif' alt=""> -->
            <LazyImg :src='Gif' :cover='CoverImg' class="gif-pane" />
          </div>
          
          
          <div class="color-white fle-1">
            <div class="linear-color title-lg fadeout" :class="{fadein: data.show[0]}" style="margin-bottom: 4px">The first Betweb3 sports betting platform</div>
            <div :class="{fadein: data.show[1]}" class="fadeout subTitle font-weight-600 mt-48 mb-32">USDT decentralized capital pool</div>
          
            <div :class="{fadein: data.show[2]}" class="fadeout grey" style="margin-top: 6px; margin-bottom: 55px">
              <div >The essence of the traditional sports betting platform is that the platform itself endorses the platform itself to make payment for the user's wins and losses. </div>
              <div>Betweb3 adopts the concept of decentralization and builds a completely decentralized capital pool to undertake the user's payment problem.</div>
            </div>

            <div class="item fadeout"  :class="{fadein: data.show[3]}">
              <div>
                <img v-lazy='Icon1' alt="">
              </div>
              <p style='margin-left: 13px'>Destruction of the ownership of the capital pool</p>
            </div>

            <div class="item fadeout" :class="{fadein: data.show[4]}">
              <div>
                <img v-lazy='Icon2' alt="">
              </div>
              <p style='margin-left: 13px'>60% of each profit is distributed to token holders, 10% is automatically repurchased destroyed token, and 30% remains in the capital pool</p>
            </div>

            <div class="flex items-center fadeout" :class="{fadein: data.show[5]}">
              <div><img v-lazy='Icon3' alt=""></div>
              <p style='margin-left: 13px'>Amount and profit are completely transparent</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Wrap>
</template>

<script>
import { defineComponent, inject, ref, watch } from 'vue'
import Wrap from '@/web/components/wrap'
import MouseTrack from '@/web/components/mouse-track'
import BgImg from '../../assets/part3-bg.png'
import Gif from '../../assets/part3-gif.gif'
import Icon1 from '../../assets/part3-1.png'
import Icon2 from '../../assets/part3-2.png'
import Icon3 from '../../assets/part3-3.png'
import LazyImg from '@/web/components/lazy-img'
import CoverImg from '@/web/assets/part3_cover.jpg'
import Pane from '@/web/components/pane'

export default defineComponent({
  components: {
    Wrap,
    MouseTrack,
    LazyImg,
    Pane
  },
  props: {},
  setup(props) {

    return {
      BgImg,
      Gif,
      Icon1,
      Icon2,
      Icon3,
      CoverImg
    }
  }
})
</script>

<style lang="less" scoped>
.item {
  margin-bottom: 37px;
  display: flex;
  align-items: center;
}
.gif-pane {
  width: 110%;
  position: absolute;
  left: -7vw;
  top: 0;
}
</style>