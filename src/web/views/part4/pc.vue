<template>
  <Wrap>
    <template #default="data">
      <div class="flex gutter_col items-center justify-between">
        <div class="color-white" style="width: 50%">
          <div
            :class="{ fadein: data.show[0] }"
            style="margin-bottom: 36px"
            class="fadeout linear-color title-lg"
          >
            Smart contract execution process
          </div>

          <div
            :class="{ fadein: data.show[1] }"
            style="margin-bottom: 29px"
            class="fadeout grey"
          >
            <div>
              Decentralization is achieved from user betting, user compensation
              and other steps. The data is delivered through Chainlink, and we
              are in-depth cooperation with Sportradar Group AG (NASDAQ: SRAD)
              on the results of event data.
            </div>
          </div>

          <div
            :class="{ fadein: data.show[2] }"
            class="my-16 color-blue fadeout"
            style="margin-bottom: 53px"
          >
            Decentralization is our premise
          </div>

          <div class="item fadeout" :class="{ fadein: data.show[3] }">
            <div><img src="../../assets/part4-1.png" alt="" /></div>
            <p style="margin-left: 13px">Fairness</p>
          </div>

          <div class="item fadeout" :class="{ fadein: data.show[4] }">
            <div><img src="../../assets/part4-2.png" alt="" /></div>
            <p style="margin-left: 13px">Justice</p>
          </div>

          <div
            class="flex items-center fadeout"
            :class="{ fadein: data.show[5] }"
          >
            <div><img src="../../assets/part4-3.png" alt="" /></div>
            <p style="margin-left: 13px">Transparency</p>
          </div>
        </div>
        <div
          style="height: 18vw; width: 26vw"
          :class="{ fadein: data.show[0] }"
          class="fadeout pos-r flex-0"
        >
          <LazyImg :src="Gif" :cover="Part4Cover" class="gif-pane" alt="" />
        </div>
      </div>
    </template>
  </Wrap>
</template>

<script>
import { defineComponent, ref } from "vue";
import Wrap from "@/web/components/wrap";
import MouseTrack from "@/web/components/mouse-track";
import Gif from "../../assets/part4_gif.gif";
import LazyImg from "@/web/components/lazy-img";
import Part4Cover from "../../assets/part4_cover.jpg";

export default defineComponent({
  components: {
    Wrap,
    MouseTrack,
    LazyImg,
  },
  props: {},
  setup(props) {
    return {
      Gif,
      Part4Cover,
    };
  },
});
</script>

<style lang="less" scoped>
.item {
  display: flex;
  align-items: center;
  margin-bottom: 37px;
}
.gif-pane {
  width: 110%;
  position: absolute;
  right: -2vw;
  top: 0;
}
</style>
