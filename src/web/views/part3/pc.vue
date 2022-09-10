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
              Everyone could be a bookmaker !
            </div>
            <!-- <div :class="{fadein: data.show[1]}" class="fadeout subTitle font-weight-600 mt-48 mb-32">USDT decentralized capital pool</div> -->

            <div
              :class="{ fadein: data.show[2] }"
              class="fadeout grey"
              style="margin-top: 6px; margin-bottom: 55px"
            >
              <div>
                Everyone can build their own USDT pool freely, you will get a
                unique casino number and become a bookmaker after building. Players
                must enter the number to find the corresponding USDT pool before
                betting. You don't need to do anything else after building.
              </div>
              <!-- <div class="mt-8">Invite your friends to participate in.</div> -->
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
                Token rewards everywhere !
              </div>
              <div
                :class="{ fadein: data.show[2] }"
                class="fadeout grey"
                style="margin-top: 6px; margin-bottom: 55px"
              >
                <div>
                  You will get tokens rewards whether adding a USDT pool or
                  participating in betting, it is for encouraging all the
                  behaviors in the protocol interaction.
                </div>
                <div class="mt-8">
                  Detailed information will be launched soon.
                </div>
                <!-- <div class="mt-8">
                  Build a USDT pool and invite friends to place bet or just find
                  a pool to bet.
                </div> -->
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
