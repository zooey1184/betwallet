<template>
  <Wrap :delay="500">
    <template #default="data">
      <div class="color-white gutter_col">
        <div style="min-height: 50px">
          <h2
            :class="{ fadein: data.show[1] }"
            class="fadeout title-lg pos-r linear-color text-align-center"
          >
            New sports betting experiences on Web 3.0
          </h2>
        </div>

        <div class="fadeout" :class="{ fadein: data.show[2] }">
          <p class="text-align-center mt-24 desc line-height-24">
            The global sports betting market worth more than $250 billion, We're
            trying to build up a decentralized sports betting platform on web
            3.0.
          </p>
          <p class="text-align-center desc line-height-24"></p>
          <p class="text-align-center desc line-height-24">
            Everyone could be a banker through the new protocol. And all you
            need is to connect your wallet to bet with USDT if you are a player.
          </p>
        </div>

        <div class="mt-24 flex items-center justify-center">
          <video controls style="width: 100%" loop>
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
