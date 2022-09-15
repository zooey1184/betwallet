<template>
  <section
    class="swiper mt-16"
    ref="swiperRef"
    style="overflow: hidden; border-radius: 8px"
  >
    <div
      class="swiper-container pos-r scontainer w-100p"
      v-if="state.bannerList?.length"
    >
      <div class="swiper-wrapper pos-r w-100p">
        <div
          class="swiper-slide pos-r"
          v-for="item in state.bannerList"
          :key="item.order_id"
          :style="{ backgroundImage: `url(${item.uri})` }"
        >
          <!-- <img :src="item.uri" class="w-100p" /> -->
          <div
            class="startbtn active-bg cursor-pointer ff flex items-center justify-center"
          >
            <img
              src="../images/icons/email.png"
              style="width: 16px; height: auto; margin-right: 4px"
              alt=""
            />
            GET START
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-next next"></div>
      <div class="swiper-button-prev pre"></div>
    </div>
  </section>
</template>

<script>
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  nextTick,
  inject,
} from "vue";
import { getBanner } from "@/sport/api/index.js";

export default defineComponent({
  components: {},
  props: {},
  setup(props, { expose }) {
    const state = reactive({
      bannerList: [],
      swiper: undefined,
    });
    const swiperRef = ref();
    const LAYOUT = inject("LAYOUT");
    const getBannerList = () => {
      getBanner().then((res) => {
        if (res) {
          state.bannerList = res;
          nextTick(() => {
            state.swiper = new Swiper(".scontainer", {
              speed: 300,
              loop: true,
              height: 300, //你的slide高度
              autoWidth: true,
              autoplay: {
                disableOnInteraction: false,
                delay: 4000,
              },
              pagination: {
                el: ".swiper-pagination",
                clickable: true,
              },
              navigation: {
                nextEl: ".next",
                prevEl: ".pre",
              },
              // resizeObserver: true,
              // on: {
              //   resize: function () {
              //     // this.update(); //窗口变化时，更新Swiper的一些属性，如宽高等
              //   },
              // },
            });

            LAYOUT.setMethods({
              swiperUpdateSize: () => {
                setTimeout(() => {
                  const _swiperRect = swiperRef.value.getBoundingClientRect();
                  console.log(_swiperRect.width);
                  // state.swiper.el.style.width = `${_swiperRect.width}px`
                }, 550);
              },
            });
          });
        }
      });
    };
    onMounted(() => {
      getBannerList();
    });

    expose({
      updateSize: () => {
        console.log("object");
        state.swiper.slideNext();
      },
    });

    return {
      swiperRef,
      state,
    };
  },
});
</script>

<style lang="less" scoped>
.swiper {
  --swiper-pagination-color: var(--primary-main); /* 两种都可以 */
}
.swiper-pagination {
  position: absolute;
  left: 12px;
  bottom: 12px;
  width: 100px !important;
}
.swiper-container {
  border-radius: 8px;
  overflow: hidden;
}
.swiper-wrapper {
  border-radius: 8px;
  height: 420px;
  @media (min-width: 1560px) and (max-width: 1919px) {
    height: 380px;
  }
  @media (min-width: 1240px) and (max-width: 1559px) {
    height: 320px;
  }
  @media (min-width: 960px) and (max-width: 1239px) {
    height: 280px;
  }
  @media (min-width: 560px) and (max-width: 960px) {
    height: 200px;
  }
  @media screen and (max-width: 560px) {
    height: 140px;
  }
  // overflow: hidden;
}
.swiper-slide {
  background-size: auto 110%;
  background-position: right;
  background-repeat: no-repeat;
  @media screen and (max-width: 960px) {
    background-size: cover;
  }
}
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
