<template>
  <Wrap>
    <template #default="data">
      <div class="pos-r">
        <img src="../../assets/part3-bg.png" class="bgImg" alt="" />
        <div class="gutter_col z-index-9">
          <div class="color-white">
            <transition name="slideBottom">
              <div
                class="linear-color title-lg text-align-center"
                style="margin-bottom: 4px"
              >
                Everyone could be a bookmaker !
              </div>
            </transition>
            <!-- <transition name="slideBottom">
              <div
                class="subTitle text-align-center font-weight-600 mt-24 mb-32"
              >
                USDT decentralized capital pool
              </div>
            </transition> -->

            <!-- <div style="height: 16.5vh;" class="bg-gray-30 mb-24 mt-16">
            </div> -->
            <img
              style="height: 30vh; z-index: 2"
              src="../../assets/part3-gif.gif"
              alt=""
            />

            <transition name="slideBottom">
              <div class="grey" style="margin-top: 6px; margin-bottom: 55px">
                <div>
                  Everyone can build their own $PePe pool freely, you will get a unique casino number and become a bookmaker after building. Players must enter the number to find the corresponding $PePe pool before betting. You don't need to do anything else after building.
                </div>
              </div>
            </transition>


            <!-- <transition name="slideBottom">
              <div>
                <div
                  class="linear-color title-lg text-align-center"
                  style="margin-bottom: 4px"
                >
                  Token rewards everywhere !
                </div>
                <div class="grey mt-8" style="margin-bottom: 55px">
                  <div class="cc">
                    You will get tokens rewards whether adding a USDT pool or
                    participating in betting, it is for encouraging all the
                    behaviors in the protocol interaction.
                  </div>
                  <div class="mt-16 cc">
                    Detailed information will be launched soon.
                  </div>
                </div>
              </div>
            </transition> -->
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

export default defineComponent({
  components: {
    Wrap,
    MouseTrack,
  },
  props: {},
  setup(props) {
    return {};
  },
});
</script>

<style lang="less" scoped>
.bgImg {
  position: absolute;
  width: 100%;
  height: auto;
  z-index: 0;
}
.item {
  margin-bottom: 24px;
  display: flex;
}
</style>
