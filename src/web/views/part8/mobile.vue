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
import {options} from './constant'

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
      options: options
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