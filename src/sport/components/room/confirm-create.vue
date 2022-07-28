<template>
  <div>
    <div class="active-color font-size-18 font-weight-600 text-align-center">
      CONFIRM CREATION
    </div>
    <div class="mt-16 mb-16 flex justify-center">
      <img style="width: 150px" src="../../images/v2/room-rect.png" />
    </div>
    <div class="mt-24 mb-16 font-size-12 line-height-18 text-align-center">
      <div>AFTER THE CASINO IS CREATED,</div>
      THE CASINO WILL AUTOMATICALLY OPEN TO ACCEPT ALL BETS, PLAYERS ENTER THE
      CASINO BY “CASINO CODE”. CLICK "CLOSE DOWN” TO CLOSE THE CASINO, THE
      CASINO WILL NO LONGER ACCEPT BETS. AND THE USDT POOL CAN BE WITHDRAWN
      AFTER ALL THE GAMES BETTED IN THE POOL ARE OVER
    </div>
    <div class="font-size-14 mt-24">ENTER THE AMOUNT</div>
    <div class="input-wrap flex items-center">
      <input class="flex-1 input" placeholder="请输入金额" />
      <div class="roomConfirm active-bg">USDT</div>
    </div>
    <div class="color-gray mt-8 font-size-12">
      YOU CAN'T INCREASE OR DECREASE A BET HALFWAY THROUGH
    </div>

    <div class="confirmBtn active-bg mt-16 mb-16">CONFIRM CREATION</div>
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
    const state = reactive({});

    return {
      state,
    };
  },
});
</script>

<style lang="less" scoped>
.input-wrap {
  border-radius: 4px;
  overflow: hidden;
}
.input {
  background: #fff;
  padding-left: 8px;
  height: 42px;
  outline: none;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  outline: none;
  border: 2px solid var(--primary-main);

  line-height: 42px;
  font-size: 18px;
}
.roomConfirm {
  padding: 0 24px;
  height: 42px;
  text-align: center;
  line-height: 42px;
  font-size: 18px;
  transition: all 300ms linear;
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
}
</style>
