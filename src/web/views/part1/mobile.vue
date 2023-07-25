<template>
  <Wrap>
    <template #default="data">
      <div
        style="min-height: 85vh; padding-bottom: 15vh; margin-top: 10vh"
        class="box color-white"
      >
        <div class="mb-32 mt-48">
          <FadeLogo />
        </div>
        <div style="z-index: 9">
          <img src="../../assets/part1-bg.png" class="bg_img" alt="" />
          <transition name="fade">
            <div class="title-md text-align-center">
              <div class="title-md">
                The decentralized
                <span class="title-md linear-color"
                  >sports betting protocol</span
                >
              </div>
            </div>
          </transition>

          <div style="margin-top: 4vw; z-index: 9">
            <transition name="slideLeft">
              <div class="linear-bg launch_btn launch_btn_act">Launch APP</div>
            </transition>
          </div>
          <div style="margin-top: 0.5vw; z-index: 9">
            <transition name="slideLeft">
              <div class="color-blue launch_btn">No registration required</div>
            </transition>
          </div>
          <transition name="slideLeft">
            <div class="flex mt-24 justify-center items-center">
              <div class="gray desc">Audited by</div>
              <div class="mx-16">
                <img src="../../assets/h-logo.png" class="logo" alt="" />
              </div>
              <!-- <div class="desc">and more</div> -->
            </div>
          </transition>
        </div>
      </div>
    </template>
  </Wrap>
</template>

<script>
import { defineComponent, ref } from "vue";
import FadeLogo from "@/web/components/fade-logo";
import Wrap from "@/web/components/wrap";
import MouseTrack from "@/web/components/mouse-track";

export default defineComponent({
  components: {
    FadeLogo,
    Wrap,
    MouseTrack,
  },
  props: {},
  setup(props) {},
});
</script>

<style lang="less" scoped>
.bg_img {
  position: absolute;
  left: 0;
  top: 50vh;
  z-index: 0;
}
.launch_btn {
  padding: 8px 0;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  font-size: 14px;
  user-select: none;
  transition: all 300ms linear;
  @media (min-width: 900px) and (max-width: 1440px) {
    padding: 10px 0;
    width: 200px;
    font-size: 15px;
  }
  @media (min-width: 1441px) and (max-width: 1919px) {
    padding: 14px 0;
    width: 240px;
    font-size: 16px;
  }
  @media (min-width: 1920px) {
    padding: 16px 0;
    font-size: 17px;
    width: 280px;
  }
}
.launch_btn_act {
  &:hover {
    opacity: 0.8;
  }
  &:active {
    transform: scale(1.1);
  }
}
.desc {
  font-size: 13px;
  @media (min-width: 900px) and (max-width: 1440px) {
    font-size: 14px;
  }
  @media (min-width: 1441px) and (max-width: 1919px) {
    font-size: 15px;
  }
  @media (min-width: 1920px) {
    font-size: 16px;
  }
}
.logo {
  height: 26px;
  width: auto;
  padding-top: 2px;
  @media (min-width: 900px) and (max-width: 1440px) {
    height: 28px;
  }
  @media (min-width: 1441px) and (max-width: 1919px) {
    height: 30px;
  }
  @media (min-width: 1920px) {
    height: 33px;
  }
}
</style>
