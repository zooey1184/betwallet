<template>
  <div class="wrap">
    <div class="active-color mt50 title ff text-align-center">
      DEFAULT TRANSACTION SPEED
      <QuestionCircleOutlined class="color-purple" />
    </div>
    <div class="flex items-center justify-between mt-8 flex-w">
      <div
        class="item f5"
        :class="{ 'item-active': state.speedValue === item.value }"
        v-for="item in state.speed"
        @click="handlePickSpeed(item)"
      >
        {{ item.label }}
      </div>
    </div>

    <div class="active-color title ff text-align-center mt-24">
      SWAPS & LIQUIDITY
      <QuestionCircleOutlined class="color-purple" />
    </div>
    <div class="text-align-center">SLIPPAGE TOLERANCE</div>
    <!-- 自定义 -->
    <div class="mt-16">
      <ModalInput
        v-model:value="state.toleranceValue"
        :maxlength="2"
        placeholder="SELECT INPUT"
      />
    </div>
    <div class="flex items-center justify-between mt-16">
      <div
        class="item f5"
        :class="{
          'item-active': state.toleranceValue?.toString() === item.value,
        }"
        v-for="item in state.tolerance"
        @click="handlePickTolerance(item)"
      >
        {{ item.label }}
      </div>
    </div>

    <div class="active-color ff title text-align-center mt-24">
      TX DEADLINE (MINS)
      <QuestionCircleOutlined class="color-purple" />
    </div>
    <div class="flex items-center justify-between mt-8">
      <div
        class="item f5"
        :class="{ 'item-active': state.timeCutValue === item.value }"
        v-for="item in state.timeCut"
        @click="handlePickTimecut(item)"
      >
        {{ item.label }}
      </div>
    </div>

    <div class="confirmBtn" @click="handleConfirm">PLACE BET</div>
  </div>
</template>

<script>
import {
  defineComponent,
  inject,
  reactive,
  computed,
  onMounted,
  watch,
} from "vue";
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import ModalInput from "../modal-input.vue";

export default defineComponent({
  components: {
    QuestionCircleOutlined,
    ModalInput,
  },
  props: {},
  emits: ["ok"],
  setup(props, { emit }) {
    const state = reactive({
      // 响应速度
      speed: [
        {
          label: "STANDARD(5)",
          value: "5",
        },
        {
          label: "FAST(6)",
          vlaue: "6",
        },
        {
          label: "INSTANT(7)",
          value: "7",
        },
      ],
      speedValue: "5",
      // 滑动 =》 承受风险值
      tolerance: [
        {
          label: "5%",
          value: "5",
        },
        {
          label: "10%",
          value: "10",
        },
        {
          label: "20%",
          value: "20",
        },
      ],
      toleranceValue: "5",
      toleranceCustom: "",
      timeCut: [
        {
          label: "20",
          value: "20",
        },
      ],
      timeCutValue: "",
    });

    const SPORT_BET = inject("SPORT_BET");
    const getBetConfig = computed(() => SPORT_BET.getBetConfig?.value);

    // watch(
    //   () => state.toleranceValue,
    //   (n) => {
    //     if (n) {
    //       state.toleranceCustom = undefined;
    //     }
    //   }
    // );
    // watch(
    //   () => state.toleranceCustom,
    //   (n) => {
    //     state.toleranceValue = undefined;
    //   }
    // );
    const handlePickSpeed = (item) => {
      state.speedValue = item.value;
    };
    const handlePickTolerance = (item) => {
      state.toleranceValue = item.value;
    };
    const handlePickTimecut = (item) => {
      state.timeCutValue = item.value;
    };

    const handleConfirm = () => {
      SPORT_BET.setState({
        betConfig: {
          tolerance: state.toleranceValue || 0,
          speed: state.speedValue,
          timeCut: state.timeCutValue,
        },
      });
      emit("ok");
    };

    onMounted(() => {
      if (getBetConfig.value) {
        const config = getBetConfig.value;
        state.toleranceValue = config.tolerance;
        state.timeCutValue = config.timeCut;
        state.speedValue = config.speed;
      }
    });

    return {
      state,
      handlePickSpeed,
      handlePickTolerance,
      handlePickTimecut,
      handleConfirm,
    };
  },
});
</script>

<style lang="less" scoped>
.wrap {
  padding: 0 24px;
}
.mt50 {
  margin-top: 50px;
  @media screen and (max-width: 600px) {
    margin-top: 24px;
  }
}
.title {
  font-size: 22px;
  @media screen and (max-width: 600px) {
    font-size: 15px;
  }
}
.item {
  width: 120px;
  height: 38px;
  line-height: 32px;
  cursor: pointer;
  text-align: center;
  color: var(--primary-main);
  border: 2px solid var(--primary-main);
  border-radius: 8px;
  font-size: 14px;
  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
}
.item-active {
  background: var(--primary-main);
  color: #fff;
}
.confirmBtn {
  font-size: 16px;
  font-weight: 600;
  height: 38px;
  line-height: 38px;
  background: var(--primary-main);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  margin-top: 50px;
  color: #fff;

  &:active {
    opacity: 0.8;
  }

  @media screen and (max-width: 600px) {
    margin-top: 24px;
  }
}
</style>
