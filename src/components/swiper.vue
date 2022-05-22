<template>
  <section class="zyqbanner">
    <div class="swiper-container zyqban">
      <div class="swiper-wrapper">
        <div class="swiper-slide fl-cen flexC"><img src="../images/zyq0425/banner01.jpg"></div>
        <div class="swiper-slide fl-cen flexC"><img src="../images/zyq0425/banner01.jpg"></div>
        <div class="swiper-slide fl-cen flexC"><img src="../images/zyq0425/banner01.jpg"></div>
      </div>
    </div>
    <div class="swiper-button-next zyqnext"></div>
    <div class="swiper-button-prev zyqprev"></div>
  </section>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  components: {},
  props: {},
  setup(props) {
    onMounted(() => {
      var swiper1 = new Swiper('.zyqban', {
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
</script>