<template>
  <Wrap>
    <template #default="data">
      <div class="pos-r">
        <img
          :src="BgImg"
          class="pos-a"
          style="left: -8vw; top: -12vw; z-index: 9"
          alt=""
        />
        <div class="flex gutter_col items-center justify-between">
          <div
            style="height: 18vw; width: 24vw"
            class="pos-r flex-0 mr-24 mt-16"
          >
            <!-- <img class="w-100p gif-pane" :src='Gif' alt=""> -->
            <LazyImg :src="Gif" :cover="CoverImg" class="gif-pane" />
          </div>

          <div class="color-white fle-1">
            <div
              class="linear-color title-lg fadeout"
              :class="{ fadein: data.show[0] }"
              style="margin-bottom: 4px"
            >
              Everyone can be the bookmaker!
            </div>
            <!-- <div :class="{fadein: data.show[1]}" class="fadeout subTitle font-weight-600 mt-48 mb-32">USDT decentralized capital pool</div> -->

            <div
              :class="{ fadein: data.show[2] }"
              class="fadeout grey"
              style="margin-top: 6px; margin-bottom: 55px"
            >
              <div>
                Anyone can freely add their own usdt pool. After adding, you will get a unique casino code and become a bookmaker. Players must use the casino code to find the corresponding usdt pool before betting.
              </div>
              <div class="mt-8">
                After adding the usdt pool, you don't need to worry about anything else. Just go to the community and social media to invite your friends to participate in betting!
              </div>
            </div>

            <!-- <div class="item fadeout" :class="{ fadein: data.show[3] }">
              <div>
                <img v-lazy="Icon1" alt="" />
              </div>
              <p style="margin-left: 13px">
                Destruction of the ownership of the capital pool
              </p>
            </div>

            <div class="item fadeout" :class="{ fadein: data.show[4] }">
              <div>
                <img v-lazy="Icon2" alt="" />
              </div>
              <p style="margin-left: 13px">
                60% of each profit is distributed to token holders, 10% is
                automatically repurchased destroyed token, and 30% remains in
                the capital pool
              </p>
            </div> -->

            <!-- <div
              class="flex items-center fadeout"
              :class="{ fadein: data.show[5] }"
            >
              <div><img v-lazy="Icon3" alt="" /></div>
              <p style="margin-left: 13px">
                Amount and profit are completely transparent
              </p>
            </div> -->

            <div class="color-white fle-1">
              <div
                class="linear-color title-lg fadeout"
                :class="{ fadein: data.show[0] }"
                style="margin-bottom: 4px"
              >
                Ubiquitous Token Rewards!
              </div>
              <div
                :class="{ fadein: data.show[2] }"
                class="fadeout grey"
                style="margin-top: 6px; margin-bottom: 55px"
              >
                <div>Whether you are building a USDT pool or participating in betting, you will be rewarded with Tokens</div>
                <div class="mt-8">
                  We will publish detailed rules in official channels to incentivize all behaviors involved in protocol interaction.
                </div>
                <div class="mt-8">Go ahead and build a USDT pool and invite friends to participate in betting</div>
                <div class="mt-8">Of course, you can also find a USDT pool to participate in betting!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Wrap>
</template>

<script>
import { defineComponent, inject, ref, watch } from "vue";
import Wrap from "@/web/components/wrap";
import MouseTrack from "@/web/components/mouse-track";
import BgImg from "../../assets/part3-bg.png";
import Gif from "../../assets/part3-gif.gif";
import Icon1 from "../../assets/part3-1.png";
import Icon2 from "../../assets/part3-2.png";
import Icon3 from "../../assets/part3-3.png";
import LazyImg from "@/web/components/lazy-img";
import CoverImg from "@/web/assets/part3_cover.jpg";
import Pane from "@/web/components/pane";

export default defineComponent({
  components: {
    Wrap,
    MouseTrack,
    LazyImg,
    Pane,
  },
  props: {},
  setup(props) {
    return {
      BgImg,
      Gif,
      Icon1,
      Icon2,
      Icon3,
      CoverImg,
    };
  },
});
</script>

<style lang="less" scoped>
.item {
  margin-bottom: 37px;
  display: flex;
  align-items: center;
}
.gif-pane {
  width: 110%;
  position: absolute;
  left: -7vw;
  top: 0;
}
</style>
