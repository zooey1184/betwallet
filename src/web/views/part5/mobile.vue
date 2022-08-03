<template>
  <Wrap>
    <template #default="data">
      <!-- <img src="../../assets/part5-bg.png" class='abs-bg' alt=""> -->
      
      <div class="gutter_col pos-r z-index-9">
        <transition name="slideRight">
          <div>
            <div class="linear-color title-lg text-align-center">Easy to use product</div>
            <div class="mt-24 desc mb-24">
              Betweb3 uses blockchain technology to restore and optimize the interactive experience of traditional
              sports betting platforms for ease of use
            </div>
            <!-- <div style="height: 16.5vh" class="bg-gray-30"></div> -->
            <div class="flex justify-center">
              <img src="../../assets/1.png" v-if="state.active === 0" class="img" alt="" />
              <img src="../../assets/2.png" v-if="state.active === 1" class="img" alt="" />
              <img src="../../assets/3.png" v-if="state.active === 2" class="img" alt="" />
              <img src="../../assets/4.png" v-if="state.active === 3" class="img" alt="" />
              <img src="../../assets/5.png" v-if="state.active === 4" class="img" alt="" />
              <img src="../../assets/6.png" v-if="state.active === 5" class="img" alt="" />
            </div>
          </div>
        </transition>

        <transition name="slideLeft">
          <div style="padding-top: 3vh">
            <Steps align="center" v-model:active='state.active' :options="options" />
          </div>
        </transition>
      </div>
    </template>
  </Wrap>
</template>

<script>
  import { defineComponent, reactive, ref } from 'vue'
  import Steps from '../../components/steps'
  import Wrap from '@/web/components/wrap'
  import MouseTrack from '@/web/components/mouse-track'
  import { options } from './constant'

  export default defineComponent({
    components: {
      Steps,
      Wrap,
      MouseTrack
    },
    props: {},
    setup(props) {
      const state = reactive({
        active: 0
      })
      return {
        options: options,
        state
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
    z-index: 0;
  }
  .img {
    width: 60%;
    max-width: 500px;
  }
</style>
