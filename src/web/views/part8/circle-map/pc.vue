<template>
  <div class="pos-r" style="height: 19.375vw; width: 40.75vw">
    <div class="pos-a top-0 left-0">
      <Circle
        rotate="40"
        size="8.54vw"
        desc="Alpha"
        @click="state.active = 0"
        :solid="state.active === 0"
      >
        <div class="color-white flex justify-center h-95p items-center">
          <img class="w-65p" :src="q202" v-if="state.active === 0" alt="" />
          <img class="w-70p" :src="q202_img" v-if="state.active !== 0" alt="" />
        </div>
      </Circle>
    </div>
    <div class="q3_2022">
      <Circle
        rotate="315"
        size="8.17vw"
        desc="Beta"
        @click="state.active = 1"
        :solid="state.active === 1"
      >
        <div
          class="color-white overflow-hidden flex flex-col justify-center items-center h-100p"
          style="border-radius: 10px"
        >
          <img
            class="w-80p"
            :src="q3_2022_gif"
            v-if="state.active === 1"
            alt=""
          />
          <img
            class="w-80p"
            :src="q3_2022_jpg"
            v-if="state.active !== 1"
            alt=""
          />
        </div>
      </Circle>
    </div>
    <div class="q4_2022">
      <Circle
        :showLine="false"
        size="7.8vw"
        desc="Gamma"
        @click="state.active = 2"
        :solid="state.active === 2"
      >
        <div
          class="color-white h-100p flex flex-col justify-center items-center"
        >
          <img
            class="w-70p"
            v-if="state.active === 2"
            src="../../../assets/2022q4.gif"
            alt=""
          />
          <img
            class="w-70p"
            :src="q4_2022_jpg"
            v-if="state.active !== 2"
            src=""
            alt=""
          />
        </div>
      </Circle>
    </div>
    <div class="q1_2023">
      <Circle
        rotate="225"
        size="10.67vw"
        desc="Delta"
        @click="state.active = 3"
        :solid="state.active === 3"
      >
        <div class="color-white h-100p flex justify-center items-center">
          <img
            class="w-70p"
            v-if="state.active === 3"
            src="../../../assets/2023q1.gif"
            alt=""
          />
          <img
            class="w-70p"
            :src="q1_2023_jpg"
            v-if="state.active !== 3"
            alt=""
          />
        </div>
      </Circle>
    </div>
    <!-- <div class="q2_2023">
      <Circle :rotate="135" size='7.8vw'  desc='2023Q2'  @click='state.active = 4' :solid="state.active === 4">
        <div class="color-white h-100p flex justify-center items-center">
          <img class="w-80p" v-if='state.active === 4' src="../../../assets/2023q2.gif" alt="">
          <img class="w-80p" v-if='state.active !== 4' :src='q2_2023_jpg' alt="">
        </div>
      </Circle>
    </div> -->
  </div>
</template>

<script>
import { defineComponent, reactive, ref, watch } from "vue";
import Circle from "../circle";
import q202 from "@/web/assets/2022q2.gif";
import q202_img from "@/web/assets/2022q2.jpg";
import q3_2022_gif from "../../../assets/2022q3.gif";
import q3_2022_jpg from "../../../assets/2022q3.jpg";
import q4_2022_jpg from "../../../assets/2022q4.jpg";
import q1_2023_jpg from "../../../assets/2023q1.jpg";
import q2_2023_jpg from "../../../assets/2023q2.jpg";

export default defineComponent({
  components: {
    Circle,
  },
  props: {
    active: {
      type: Number,
      default: 0,
    },
  },
  emits: ["update:active", "change"],
  setup(props, { emit }) {
    const state = reactive({
      active: props.active,
    });

    watch(
      () => props.active,
      (n) => {
        state.active = n;
      }
    );

    watch(
      () => state.active,
      (n) => {
        emit("update:active", n);
        emit("change", n);
      }
    );

    return {
      state,
      q202,
      q202_img,
      q3_2022_gif,
      q3_2022_jpg,
      q4_2022_jpg,
      q1_2023_jpg,
      q2_2023_jpg,
    };
  },
});
</script>

<style lang="less" scoped>
.q3_2022 {
  position: absolute;
  left: 8.54vw;
  top: 6.4vw;
}
.q4_2022 {
  position: absolute;
  left: 16.04vw;
  top: -1.51vw;
}
.q1_2023 {
  position: absolute;
  left: 23.9vw;
  top: 6.4vw;
}
.q2_2023 {
  position: absolute;
  left: 33.4vw;
  top: 0;
}
.desc-item {
  font-size: 12px;
  margin-top: 4px;
  @media (min-width: 900px) and (max-width: 1440px) {
    font-size: 13px;
    margin-top: 5px;
  }
  @media (min-width: 1441px) and (max-width: 1919px) {
    font-size: 14px;
    margin-top: 6px;
  }
  @media (min-width: 1920px) {
    font-size: 14px;
    margin-top: 8px;
  }
}
</style>
