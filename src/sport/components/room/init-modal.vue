<template>
  <div>
    <div class="linear-bg pane">
      <div class="title">CASINO INSTRUCTIONS</div>
      <div class="font-size-14 my-8">
        AFTER CREATE CASINO AND ADD USDT POOL USERS IMMEDIATELY GENERATE THEIR
        OWN “CASINO CODE” AND BECOME BOOKMAKERS, OTHERS CAN ENTER THE CASINO BY
        INPUTTING THE “CASINO CODE”THE USDT POOL CAN BE WITHDRAWN AT ANY TIME IF
        NO BETS ARE IN PROGRESS
      </div>
      <div class="title">
        IF OTHER USERS ARE BETTING IN YOUR CASINO, YOU WILL RECEIVE A MASSIVE
        BET TOKEN REWARD.
      </div>
    </div>

    <div class="flex items-center justify-between my-24">
      <div
        class="roombtn bg"
        v-for="item in state.btns"
        @click="handlePick(item)"
        :class="{
          bg: state.active !== item.value,
          'linear-bg': state.active === item.value,
        }"
      >
        {{ item.label }}
      </div>
    </div>

    <div class="input-wrap flex items-center">
      <input class="flex-1 input" placeholder="请输入房间号" />
      <div class="roomConfirm" @click="handleConfirm">确认</div>
    </div>

    <div class="flex items-center color-gray mt-24 mb-32">
      没有发现你参与的流动性资金池？
      <div class="importBtn">导入</div>
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
  emits: ['next'],
  setup(props, {emit}) {
    const state = reactive({
      active: 1,
      btns: [
        {
          label: "寻找奖池",
          value: 0,
        },
        {
          label: "创建奖池",
          value: 1,
        },
      ],
    });
    const handlePick = (item) => {
      state.active = item.value;
    };

    const { hasPermission, getPermission } = usePermission();
    const handleConfirm = async () => {};
    const handleInit = async () => {
      const hasP = await hasPermission();
      if (!hasP) {
        getPermission({
          callback: () => {
            message.info('Permission verification sent Success, Please wait link')
          },
          receipt: () => {
            message.success('Successfully linked')
            emit('next')
          },
          error: (e) => {
            const msg = e.message?.split('{')?.[0] || 'Verification failed'
            message.error(msg)
          }
        })
      }
    };

    onMounted(() => {
      handleInit();
    });

    return {
      state,
      handlePick,
      hasPermission,
    };
  },
});
</script>

<style lang="less" scoped>
.pane {
  padding: 16px;
  border-radius: 12px;
}
.title {
  font-size: 18px;
  font-weight: 600;
}
.roombtn {
  height: 42px;
  border-radius: 50px;
  line-height: 42px;
  text-align: center;
  width: 45%;
  // border: 1px solid #eee;
  font-size: 18px;
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
  background: #37375c;
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
  background: #545472;
  text-align: center;
  line-height: 42px;
  font-size: 18px;
  transition: all 300ms linear;
  cursor: pointer;
  &:hover {
    background: #1890ff;
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
