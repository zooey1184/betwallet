<template>
  <section class="zyqbanner">
    <div class="swiper-container zyqban" v-if='state.bannerList?.length'>
      <div class="swiper-wrapper">
        <div class="swiper-slide fl-cen flexC" v-for="item in state.bannerList" :key="item.order_id">
          <img :src="item.uri">
        </div>
      </div>
    </div>
    <div class="swiper-button-next zyqnext"></div>
    <div class="swiper-button-prev zyqprev"></div>
  </section>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, nextTick } from 'vue'
import {getBanner} from '../api'

export default defineComponent({
  components: {},
  props: {},
  setup(props) {
    const state = reactive({
      bannerList: [],
      swiper: undefined
    })
    const getBannerList = () => {
      getBanner().then(res => {
        if (res?.data) {
          state.bannerList = res.data
          console.log(state.bannerList);
          nextTick(() => {
            state.swiper = new Swiper('.zyqban', {
            speed: 300,
            loop: true,
            autoplay: {
              disableOnInteraction: false,
              delay:4000,
            },
            navigation: {
              nextEl: '.zyqnext',
              prevEl: '.zyqprev',
            },
          });
          })
        }
      })
    }
    onMounted(() => {
      getBannerList()
    })

    return {
      state
    }
  }
})
</script>