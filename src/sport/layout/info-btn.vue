<template>
  <div class="flex items-center cursor-pointer">
    <div class="around" @click="handleShowInfo">
      <img style="width: 36px" src="../images/v2/coin-icon-gray.png" alt="" />
    </div>
    <div>
      <div>{{ address }}</div>
      <div class="pos-r" style="width: 120px">
        <Progress
          :percent="getWinRate"
          :strokeWidth="15"
          strokeColor="#ff0083"
          trailColor="#0f0723"
          :show-info="false"
        />
        <div class="insetP">{{ getTotalWin }}/{{ getTotalBet }}</div>
      </div>
      <!-- <div class="progress primary-dark-bg">
        <div class="active-bg insetP">{{ getTotalWin }}/{{ getTotalBet }}</div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { defineComponent, inject, reactive, computed } from "vue";
import { Progress } from "ant-design-vue";
export default defineComponent({
  components: {
    Progress,
  },
  props: {
    address: {
      type: String,
      default: "****",
    },
  },
  emits: ["info"],
  setup(props, { emit }) {
    const state = reactive({});
    const RESULT = inject("RESULT");

    const getTotalBet = computed(() => RESULT?.totalBet?.value || 0);
    const getTotalWin = computed(() => RESULT?.totalWin?.value || 0);
    const getWinRate = computed(() => RESULT.winRate?.value);

    const handleShowInfo = () => {
      emit("info");
    };
    return {
      state,
      getTotalBet,
      getTotalWin,
      getWinRate,
      handleShowInfo,
    };
  },
});
</script>

<style lang="less" scoped>
.around {
  padding: 4px;
  border-radius: 30px;
  background: #fff;
  margin-right: 8px;
}
.progress {
  width: 100px;
  height: 16px;
  border-radius: 10px;
  font-size: 12px;
  overflow: hidden;
  position: relative;
}
.insetP {
  position: absolute;
  height: 100%;
  line-height: 16px;
  border-radius: 10px;
  padding: 0 4px;
  font-size: 12px;
  line-height: 12px;
  top: 6px;
}
</style>
