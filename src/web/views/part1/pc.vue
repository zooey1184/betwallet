<template>
  <Wrap>
    <template #default="data">
      <div
        style="padding-top: 10vw; min-height: 85vh"
        class="box flex color-white justify-between"
      >
        <MouseTrack>
          <img v-lazy="BgImg" class="bg_img" alt="" />
        </MouseTrack>

        <div style="z-index: 9; width: 48vw">
          <div
            class="title-md fade-left"
            :class="{ 'fade-right': data.show[0] }"
          >
            <div class="title-md">
              The decentralized
              <span class="title-md linear-color">sports betting protocol</span>
            </div>
          </div>

          <div style="margin-top: 4vw">
            <div
              :class="{ 'fade-right': data.show[1] }"
              class="fade-left linear-bg inline-block launch_btn launch_btn_act"
            >
              Launch APP
            </div>
          </div>
          <div style="margin-top: 0.5vw">
            <div
              :class="{ 'fade-right': data.show[2] }"
              class="fade-left color-blue inline-block launch_btn"
            >
              No registration required
            </div>
          </div>
          <div
            :class="{ 'fade-right': data.show[3] }"
            class="fade-left flex mt-24 items-center"
          >
            <div class="gray desc">Audited by</div>
            <div class="mx-16">
              <img :src="Logo" class="logo" alt="" />
            </div>
            <div class="desc">and more</div>
          </div>
        </div>
        <div
          style="width: 25vw; height: 28vw; top: 0"
          class="pos-r overflow-hidden"
        >
          <FadeLogo />
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
import BgImg from "../../assets/part1-bg.png";
import Logo from "../../assets/logo.png";

export default defineComponent({
  components: {
    FadeLogo,
    Wrap,
    MouseTrack,
  },
  props: {},
  setup(props) {
    return {
      BgImg,
      Logo,
    };
  },
});
</script>

<style lang="less" scoped>
.bg_img {
  position: absolute;
  left: 7vw;
  top: 1.8vw;
}
.launch_btn {
  padding: 8px 0;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
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
