<template>
  <div class="color-white bg overflow-x-hidden" ref="wrapRef">
    <Navbar :isMobile='isMobile' v-model:active='state.active' @change='handleChangeNav' />
    <div class="bg gutter_x" style="margin-top: 60px">
      <Part1 />
    </div>
    <div class='bg gutter_x' ref='productRef'>
      <Part2 />
      <Part3 />
      <Part4 />
      <Part5 />
      <Part6 />
    </div>
    <div style='padding: 0 3%; margin-top: -4vh; box-sizing: border-box'>
      <img src="./assets/filter-line.png" class="w-100p" alt="">
    </div>
    <div class='bg gutter_x' ref='tokenRef'>
      <Part7 />
    </div>
    <div class='bg gutter_x' ref='mapRef'>
      <Part8 />
    </div>
    <div class="bg" style="padding: 4vw 10vw">
      <Footer />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, provide, reactive, computed } from 'vue'
import Circle from './components/circle'
import Navbar from './components/nav'
import Steps from './components/steps'
import MSteps from './components/steps/m-index.vue'
import LinearBox from './components/linear-box'
import Part1 from './views/part1'
import Part2 from './views/part2'
import Part3 from './views/part3'
import Part4 from './views/part4'
import Part5 from './views/part5'
import Part6 from './views/part6'
import Part7 from './views/part7'
import Part8 from './views/part8'

import Footer from './views/footer-pane'

const MOBILE_WIDTH = 1024
export default defineComponent({
  components: {
    Circle,
    Navbar,
    Steps,
    MSteps,
    LinearBox,
    Part1,
    Part2,
    Part3,
    Part4,
    Part5,
    Part6,
    Part7,
    Part8,
    Footer
  },
  props: {},
  setup(props) {
    const isMobile = ref()
    const wrapRef = ref()
    const productRef = ref()
    const tokenRef = ref()
    const mapRef = ref()
    const state = reactive({
      active: 'product',
      scrollTop: 0
    })

    provide('isMobile', isMobile)

    const throttleFn = (fn, wait) => {
      let timer = null;
      let timeStamp = +new Date()
      return function () {
        if (+new Date() - timeStamp > wait) {
          timeStamp = + new Date()
          timer = setTimeout(() => {
            fn()
          }, wait)
        }
      }
    }

    const SCROLL_TOP = computed(() => state.scrollTop)
    provide('scrollTop', SCROLL_TOP)

    window.onscroll = throttleFn((e) => {
      const product = productRef.value?.getBoundingClientRect()
      const token = tokenRef.value?.getBoundingClientRect()
      const map = mapRef.value?.getBoundingClientRect()
      state.scrollTop = document.documentElement.scrollTop;
      if(product) {
        if (product.y + product.height > 80 &&  product.y + product.height <= product.height) {
          state.active = 'product'
        }
        if (token.y + token.height > 80 &&  token.y + token.height <= token.height) {
          state.active = 'token'
        }
        if (map.y + map.height > 80 &&  map.y + map.height <= map.height+200) {
          state.active = 'map'
        }
      }
    }, 200)

    window.onresize = (e) => {
      if (window.innerWidth <= MOBILE_WIDTH) {
        isMobile.value = true
      } else {
        isMobile.value = false
      }
    }

    const handleChangeNav = (e) => {
      const Top = document.documentElement.scrollTop;
      const obj = {
        product: productRef.value,
        token: tokenRef.value,
        map: mapRef.value
      }
      const item = obj[e].getBoundingClientRect()
      window.scrollTo({top: item.y-80 + Top, behavior: 'smooth'})
      state.active = e
    }

    onMounted(() => {
      if(window.innerWidth <= MOBILE_WIDTH) {
        isMobile.value = true
      }
    })

    return {
      wrapRef,
      productRef,
      tokenRef,
      mapRef,
      isMobile,
      handleChangeNav,
      state,
    }
  }
})
</script>