<template>
  <Wrap>
    <template #default="data">
      <div class="flex gutter_col justify-between">
        <div class="color-white">
          <transition name="slideBottom">
            <div class="linear-color mb-24 text-align-center title-lg">
              Contract execution process
            </div>
          </transition>

          <!-- <div style="height: 16.5vh;" class="bg-gray-30 mb-24"></div> -->
          <img src="../../assets/part4_gif.gif" class="w-100p" alt="" />

          <transition name="slideBottom">
            <div class="grey mb-24">
              <div>
                Decentralization is achieved from user betting, user
                compensation and other steps. We are in-depth cooperation with
                Sportradar Group AG (NASDAQ: SRAD) on the results of events
                data.
              </div>
            </div>
          </transition>
          <!-- <transition name="slideBottom">
            <div class="my-16 color-blue mb-24">
              Decentralization is our premise
            </div>
          </transition> -->

          <div class="flex items-center justify-between">
            <transition name="slideBottom">
              <div class="item">
                <div><img src="../../assets/part4-1.png" alt="" /></div>
                <p class="ml-8">Fairness</p>
              </div>
            </transition>
            <transition name="slideBottom">
              <div class="item">
                <div><img src="../../assets/part4-2.png" alt="" /></div>
                <p class="ml-8">Justice</p>
              </div>
            </transition>
            <transition name="slideBottom">
              <div class="flex">
                <div><img src="../../assets/part4-3.png" alt="" /></div>
                <p class="ml-8">Transparency</p>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </template>
  </Wrap>
</template>

<script>
import { defineComponent, ref } from "vue";
import Wrap from "@/web/components/wrap";
import MouseTrack from "@/web/components/mouse-track";

export default defineComponent({
  components: {
    Wrap,
    MouseTrack,
  },
  props: {},
  setup(props) {},
});
</script>

<style lang="less" scoped>
.item {
  display: flex;
}
</style>
