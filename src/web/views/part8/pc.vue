<template>
  <Wrap>
    <template #default="data">
      <div class="mb-48 pos-r">
        <img v-lazy="BgImg1" class="abs-bg1" alt="" />
        <div class="abs-bg2">
          <!-- <MouseTrack><img v-lazy="BgImg2" class="w-100p" alt="" /></MouseTrack> -->
        </div>

        <div
          style="margin-bottom: 26px"
          class="inline-block linear-color title-lg"
        >
          Roadmap
        </div>
        <div class="subTitle" style="margin-bottom: 12vh">
          We are working on expanding the BetWeb3 ecosystem. Stay tuned.
        </div>
        <div class="flex items-center justify-around">
          <div
            class="slideout-left flex-0"
            style="width: 55%"
            :class="{ 'slidein-right': data.show[0] }"
          >
            <Steps
              align="around"
              :options="options"
              v-model:active="state.active"
            />
          </div>
          <div class="slideout-right" :class="{ 'slidein-left': data.show[0] }">
            <CircleMap v-model:active="state.active" />
          </div>
        </div>
      </div>
    </template>
  </Wrap>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import Steps from "../../components/steps/steps.vue";
import CircleMap from "./circle-map";
import Wrap from "@/web/components/wrap";
import BgImg1 from "../../assets/part8-bg1.png";
import BgImg2 from "../../assets/part8-bg2.png";
import MouseTrack from "@/web/components/mouse-track";
import { options } from "./constant";

export default defineComponent({
  components: {
    Steps,
    CircleMap,
    Wrap,
    MouseTrack,
  },
  props: {},
  setup(props) {
    const state = reactive({
      active: 0,
    });
    return {
      state,
      options: options,
      BgImg1,
      BgImg2,
    };
  },
});
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
