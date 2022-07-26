<template>
  <div>
    <div class="linear-bg pane">
      <div class="title">流动性提供者奖励</div>
      <div class="font-size-14 my-8">
        流动性提供者在所有交易中按其所占份额的比例收取0.3%的费用，费用会实时添加到池中，并且可以通过移除流动资金来获取
      </div>
      <div class="title">阅读更多关于提供流动性</div>
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
      <!-- <div
        class="roombtn"
        :class="{ bg: state.active === 0, 'linear-bg': state.active === 1 }"
      >
        创建奖池
      </div> -->
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
import usePermission from '@/sport/components/useHooks/use-permission'

export default defineComponent({
  components: {},
  props: {},
  setup(props) {
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

    const {hasPermission} = usePermission()
    const handleConfirm = async() => {
      
    };
    const handleInit = async () => {
      hasPermission()
    }

    onMounted(() => {
      handleInit()
    })

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
