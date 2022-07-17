<template>
  <Wrap>
    <template #default="data">
      <!-- <img src="../../assets/part5-bg.png" class='abs-bg' alt=""> -->
      <div class="gutter_col pos-r z-index-9">
        <transition name="slideRight">
          <div>
            <div class="linear-color title-lg text-align-center">
              Easy to use product
            </div>
            <div class="mt-24 desc mb-24">
              Betweb3 uses blockchain technology to restore and optimize the
              interactive experience of traditional sports betting platforms for
              ease of use
            </div>
            <div style="height: 16.5vh" class="bg-gray-30"></div>
          </div>
        </transition>

        <transition name="slideLeft">
          <div style="padding-top: 3vh">
            <Steps align="center" :options="options" />
          </div>
        </transition>
      </div>
    </template>
  </Wrap>
</template>

<script>
import { defineComponent, ref } from "vue";
import Steps from "../../components/steps";
import Wrap from "@/web/components/wrap";
import MouseTrack from "@/web/components/mouse-track";
import { options } from "./constant";

export default defineComponent({
  components: {
    Steps,
    Wrap,
    MouseTrack,
  },
  props: {},
  setup(props) {
    return {
      options: options,
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
  z-index: 0;
}
</style>
