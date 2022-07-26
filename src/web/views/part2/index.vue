<template>
  <Wrap :delay="500">
    <template #default="data">
      <div class="color-white gutter_col">
        <div style="min-height: 50px">
          <h2
            :class="{ fadein: data.show[1] }"
            class="fadeout title-lg pos-r linear-color text-align-center"
          >
            Creating new sports betting experiences on Web3.0
          </h2>
        </div>

        <div class="fadeout" :class="{ fadein: data.show[2] }">
          <p class="text-align-center mt-32 desc line-height-24">
            The Global Sports Betting Industry is Worth Over $250Bn, With the
            advent of Web3, we try to decentralize Sports Betting.
          </p>
          <p class="text-align-center desc line-height-24"></p>
          <p class="text-align-center desc line-height-24">
            Anyone can become a banker of a gambling company through agreement,
            and as a player,you only need to connect your wallet to bet with
            USDT
          </p>
        </div>

        <div
          style="height: 34vw"
          class="mt-48 flex items-center justify-center"
        >
          <video controls style="width: 100%">
            <source src="../../assets/video.mp4" type="video/mp4" />
            您的浏览器不支持Video标签。
          </video>
          <!-- Video -->
        </div>
      </div>
    </template>
  </Wrap>
</template>

<script>
import { defineComponent, ref } from "vue";
import Wrap from "@/web/components/wrap";

export default defineComponent({
  components: {
    Wrap,
  },
  props: {},
  setup(props) {},
});
</script>

<style lang="less" scoped>
.fadeout {
  opacity: 0;
  transform: translateY(50px);
  transition: all 1000ms linear;
}
.fadein {
  opacity: 1;
  transform: translateY(0);
}
</style>
