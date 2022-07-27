<template>
  <div>
    <div class="flex items-center justify-center">
      <img src="../../images/v2/room-logo.png" style="width: 200px" alt="" />
    </div>
    <div
      class="font-size-16 text-align-center mt-24 mb-16 font-weight-600 active-color"
    >
      CASINO INSTRUCTIONS
    </div>
    <div class="font-size-14 my-8 text-align-center line-height-16 color-black">
      AFTER CREATE CASINO AND ADD USDT POOL USERS IMMEDIATELY GENERATE THEIR OWN
      “CASINO CODE” AND BECOME BOOKMAKERS, OTHERS CAN ENTER THE CASINO BY
      INPUTTING THE “CASINO CODE”THE USDT POOL CAN BE WITHDRAWN AT ANY TIME IF
      NO BETS ARE IN PROGRESS
    </div>
    <div class="title text-align-center line-height-16 color-gray">
      IF OTHER USERS ARE BETTING IN YOUR CASINO, YOU WILL RECEIVE A MASSIVE BET
      TOKEN REWARD.
    </div>

    <div class="flex items-center justify-between my-24">
      <div
        class="roombtn active-border"
        v-for="item in state.btns"
        @click="handlePick(item)"
        :class="{
          'bg-white': state.active !== item.value,
          'active-color': state.active !== item.value,
          'active-bg': state.active === item.value,
        }"
      >
        {{ item.label }}
      </div>
    </div>

    <div class="input-wrap active-border flex items-center">
      <input
        class="flex-1 input"
        v-model="state.code"
        placeholder="请输入房间号(8位数字)"
        :maxlength="8"
      />
      <div class="roomConfirm active-bg" @click="handleConfirm">CONFIRM</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from "vue";
import usePermission from "@/sport/components/useHooks/use-permission";
import { message } from "ant-design-vue";

export default defineComponent({
  components: {},
  props: {},
  setup(props) {
    const state = reactive({
      active: 1,
      code: "",
      btns: [
        {
          label: "LOOK FOR CASINO",
          value: 0,
        },
        {
          label: "CREAT CASINO",
          value: 1,
        },
      ],
    });
    const handlePick = (item) => {
      state.active = item.value;
    };

    const { hasPermission } = usePermission();
    const handleConfirm = async () => {
      if (state.code.match(/^\d{8}$/)) {
      } else {
        message.warning("房间号格式不正确");
      }
    };
    const handleInit = async () => {
      hasPermission();
    };

    onMounted(() => {
      // handleInit();
    });

    return {
      state,
      handlePick,
      hasPermission,
      handleConfirm,
    };
  },
});
</script>

<style lang="less" scoped>
.pane {
  padding: 16px;
  border-radius: 12px;
}
.roombtn {
  height: 42px;
  border-radius: 10px;
  line-height: 42px;
  text-align: center;
  width: 45%;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
}
.input-wrap {
  border-radius: 4px;
  overflow: hidden;
}
.input {
  padding-left: 8px;
  height: 42px;
  border: none;
  outline: none;
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
  cursor: pointer;
  &:hover {
    color: #fff;
  }
}
.importBtn {
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    color: #1890ff;
  }
}
</style>
