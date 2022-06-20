<template>
  <Wrap>
    <template #default='data'>
      <div class="pos-r">
        <img src="../../assets/part3-bg.png" class="bgImg" alt="">
        <div class="gutter_col  z-index-9">
          
          <div class="color-white">
            <transition name='slideBottom'>
              <div class="linear-color title-lg text-align-center" style="margin-bottom: 4px">The first Betweb3 sports betting platform</div>
            </transition>
            <transition name='slideBottom'>
              <div class="subTitle text-align-center font-weight-600 mt-24 mb-32">USDT decentralized capital pool</div>
            </transition>

            <!-- <div style="height: 16.5vh;" class="bg-gray-30 mb-24 mt-16">
            </div> -->
            <img style="height: 30vh; z-index: 2" src="../../assets/part3-gif.gif" alt="">
            
            <transition name='slideBottom'>
              <div class="grey" style="margin-top: 6px; margin-bottom: 55px">
                <div >The essence of the traditional sports betting platform is that the platform itself endorses the platform itself to make payment for the user's wins and losses. </div>
                <div>Betweb3 adopts the concept of decentralization and builds a completely decentralized capital pool to undertake the user's payment problem.</div>
              </div>
            </transition>
      

            <transition name='slideBottom'>
              <div class="item">
                <div>
                  <img src="../../assets/part3-1.png" alt="">
                </div>
                <p style='margin-left: 13px'>Destruction of the ownership of the capital pool</p>
              </div>
            </transition>
            <transition name='slideBottom'>
              <div class="item" >
                <div>
                  <img src="../../assets/part3-2.png" alt="">
                </div>
                <p style='margin-left: 13px'>60% of each profit is distributed to token holders, 10% is automatically repurchased destroyed token, and 30% remains in the capital pool</p>
              </div>
            </transition>
            <transition name='slideBottom'>
              <div class="flex">
                <div><img src="../../assets/part3-3.png" alt=""></div>
                <p style='margin-left: 13px'>Amount and profit are completely transparent</p>
              </div>
            </transition>
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

export default defineComponent({
  components: {
    Wrap,
    MouseTrack,
  },
  props: {},
  setup(props) {

    return {
      
    }
  }
})
</script>

<style lang="less" scoped>
.bgImg {
  position: absolute;
  width: 100%;
  height: auto;
  z-index: 0;
}
.item {
  margin-bottom: 24px;
  display: flex;
}
</style>