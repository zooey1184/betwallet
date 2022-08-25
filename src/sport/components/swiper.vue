<template>
  <section class="zyqbanner" style="overflow: hidden; border-radius: 8px">
    <div class="swiper-container zyqban" v-if="state.bannerList?.length">
      <div class="swiper-wrapper pos-r">
        <div
          class="swiper-slide pos-r fl-cen flexC"
          v-for="item in state.bannerList"
          :key="item.order_id"
        >
          <img :src="item.uri" />
          <div
            class="startbtn active-bg cursor-pointer ff flex items-center justify-center"
          >
            <img
              src="../images/icons/email.png"
              style="width: 16px; margin-right: 4px"
              alt=""
            />
            GET START
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-button-next zyqnext"></div>
    <div class="swiper-button-prev zyqprev"></div>
  </section>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, nextTick } from "vue";
import { getBanner } from "@/sport/api/index.js";

export default defineComponent({
  components: {},
  props: {},
  setup(props) {
    const state = reactive({
      bannerList: [],
      swiper: undefined,
    });
    const getBannerList = () => {
      getBanner().then((res) => {
        if (res) {
          state.bannerList = res;

          console.log(state.bannerList);
          nextTick(() => {
            state.swiper = new Swiper(".zyqban", {
              speed: 300,
              loop: true,
              autoplay: {
                disableOnInteraction: false,
                delay: 4000,
              },
              navigation: {
                nextEl: ".zyqnext",
                prevEl: ".zyqprev",
              },
            });
          });
        }
      });
    };
    onMounted(() => {
      getBannerList();
    });

    return {
      state,
    };
  },
});
</script>

<style lang="less" scoped>
.startbtn {
  position: absolute;
  bottom: 12px;
  right: 12px;
  line-height: 32px;
  z-index: 99;
  color: #fff;
  width: 120px;
  height: 32px;
  border-radius: 10px;
  &:active {
    opacity: 0.8;
  }
}
</style>
