<template>
  <Wrap>
    <template #default="data">
      <div class="gutter_col flex justify-between pos-r">
        <img :src="BgImg" class="abs-bg" alt="" />
        <div
          :class="{ 'slidein-right': data.show[1] }"
          class="slideout-left"
          style="width: 40%; padding-top: 11vh"
        >
          <Steps :options="options" v-model:active="state.active" />
        </div>

        <div
          :class="{ 'slidein-left': data.show[1] }"
          class="slideout-right"
          style="width: 50%"
        >
          <div class="linear-color title-lg inline-block">Easy to use</div>
          <div class="mt-24 desc">
            BetWeb3 optimizes the interactive experience of traditional sports
            betting platforms.
          </div>
          <div class="flex justify-end" style="margin-top: 10vh">
            <img
              src="../../assets/1.png"
              v-if="state.active === 0"
              style="width: 70%"
              alt=""
            />
            <img
              src="../../assets/2.png"
              v-if="state.active === 1"
              style="width: 70%"
              alt=""
            />
            <img
              src="../../assets/3.png"
              v-if="state.active === 2"
              style="width: 70%"
              alt=""
            />
            <img
              src="../../assets/4.png"
              v-if="state.active === 3"
              style="width: 70%"
              alt=""
            />
            <img
              src="../../assets/5.png"
              v-if="state.active === 4"
              style="width: 70%"
              alt=""
            />
            <img
              src="../../assets/6.png"
              v-if="state.active === 5"
              style="width: 70%"
              alt=""
            />
            <!-- <div style="height: 16.5vw; width: 24vw" class="bg-gray-30"></div> -->
          </div>
        </div>
      </div>
    </template>
  </Wrap>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import Steps from "../../components/steps";
import Wrap from "@/web/components/wrap";
import MouseTrack from "@/web/components/mouse-track";
import BgImg from "../../assets/part5-bg.png";
import { options } from "./constant";

export default defineComponent({
  components: {
    Steps,
    Wrap,
    MouseTrack,
  },
  props: {},
  setup(props) {
    const state = reactive({
      active: 0,
    });
    return {
      options: options,
      BgImg,
      state,
    };
  },
});
</script>

<style lang="less" scoped>
.abs-bg {
  position: absolute;
  left: -5vw;
  top: -8vw;
  width: 19.4vw;
  height: auto;
}
</style>
