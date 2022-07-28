<template>
  <div>
    <div class="active-color font-size-18 font-weight-600 text-align-center">
      CASINO INFORMATION
    </div>
    <div class="color-black text-align-center mt-16">
      AMOUNT OF THE USDT POOL
    </div>
    <div
      class="flex justify-center mt-8 font-weight-600 active-color"
      style="font-size: 48px"
    >
      $10000 USDT
    </div>

    <div class="flex items-center justify-between my-24">
      <div
        class="roombtn"
        :class="{
          'active-bg': state.active === '0',
          'active-color': state.active !== '0',
          'color-white': state.active === '0',
        }"
        @click="handlePick('0')"
      >
        ONGOING
      </div>
      <div
        class="roombtn"
        :class="{
          ' active-bg': state.active === '1',
          'active-color': state.active !== '1',
          'color-white': state.active === '1',
        }"
        @click="handlePick('1')"
      >
        HISTORY
      </div>
    </div>
    <div class="content overflow-hidden">
      <div class="content scrollbar overflow-auto bg">
        <div class="gray-9 font-size-14" v-for="item in 10">
          <div class="flex items-center">
            <div style="width: 40%">EDG VS LGD</div>
            <div style="width: 20%" class="text-align-center">1.17</div>
            <div style="width: 40%" class="text-align-right">11.06 5:00AM</div>
          </div>

          <div class="flex items-center justify-between">
            <div class="color-blue">投注金额</div>
            <div>800 USDT</div>
          </div>
        </div>
      </div>
    </div>

    <div class="confirmBtn active-bg mt-16 mb-8">CLOSE THE CASINO</div>
  </div>
</template>

<script>
import { reactive, defineComponent } from "vue";
import { QuestionCircleOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import Circle from "./circle.vue";

export default defineComponent({
  components: {
    QuestionCircleOutlined,
    LoadingOutlined,
    Circle,
  },
  setup() {
    const state = reactive({
      active: "0",
    });

    const handlePick = (e) => {
      state.active = e;
    };

    return {
      state,
      handlePick,
    };
  },
});
</script>

<style lang="less" scoped>
.roombtn {
  height: 42px;
  border-radius: 10px;
  line-height: 42px;
  text-align: center;
  width: 45%;
  border: 1px solid var(--primary-main);
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
}
.confirmBtn {
  height: 42px;
  width: 100%;
  text-align: center;
  line-height: 42px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
}
.content {
  max-height: 250px;
  padding: 8px;
  border-radius: 8px;
}
</style>
