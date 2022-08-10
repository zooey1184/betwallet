<template>
  <Spin :spinning="getLoading">
    <div class="active-color f4 font-size-18 font-weight-600 text-align-center">
      CASINO INFORMATION
    </div>
    <div class="color-black f3 text-align-center mt-16">
      AMOUNT OF THE USDT POOL
    </div>
    <div
      class="flex justify-center f5 mt-8 font-weight-600 active-color"
      style="font-size: 48px"
    >
      $10000 USDT
    </div>

    <div class="flex items-center justify-between my-24">
      <div
        class="roombtn f4"
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
        class="roombtn f4"
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
    <div class="overflow-hidden" style="border-radius: 8px">
      <div
        class="content scrollbar overflow-auto bg"
        style="padding: 16px 24px"
        v-if="state.active === '0'"
      >
        <div
          class="color-white3 f5 font-size-14 mb-24"
          v-for="item in getAllBetList.pending"
        >
          <div class="flex items-center">
            <div style="width: 30%">USER: 12***</div>
            <div style="width: 20%" class="text-align-center">07.21</div>
            <!-- <div style="width: 20%" class="text-align-right">5:00AM</div> -->
            <div style="width: 50%" class="text-align-right flex items-center">
              <div class="item">{{ getVsInfo(item).home.name }}</div>
              <div style="margin: 0 4px" class="gray-9">vs</div>
              <div class="item text-align-right">
                {{ getVsInfo(item).away.name }}
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div>EDG 1.07</div>
            <div>BETTING AMOUNT:{{ item.bet_amount }}USDT</div>
          </div>
        </div>
      </div>

      <div
        class="content scrollbar overflow-auto bg"
        style="padding: 16px 24px"
        v-if="state.active === '1'"
      >
        <div
          class="color-white3 f5 font-size-14 mb-24"
          v-for="item in getAllBetList.history"
        >
          <div class="flex items-center">
            <div style="width: 30%">USER: 12***</div>
            <div style="width: 20%" class="text-align-center">07.21</div>
            <!-- <div style="width: 20%" class="text-align-right">5:00AM</div> -->
            <div style="width: 50%" class="text-align-right flex items-center">
              <div class="item">{{ getVsInfo(item).home.name }}</div>
              <div style="margin: 0 2px" class="gray-9">vs</div>
              <div class="item text-align-right">
                {{ getVsInfo(item).away.name }}
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div>EDG 1.07</div>
            <div>BETTING AMOUNT:{{ item.bet_amount }}USDT</div>
          </div>
        </div>
      </div>
    </div>

    <div class="confirmBtn active-bg mt-16 mb-8 f4" @click="handleStopPool">
      CLOSE THE CASINO
    </div>
  </Spin>
</template>

<script>
import { reactive, defineComponent, inject, computed } from "vue";
import { QuestionCircleOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import Circle from "./circle.vue";
import { message, Spin } from "ant-design-vue";
import useMethods from "@/sport/hooks/useFootballMethods";

export default defineComponent({
  components: {
    QuestionCircleOutlined,
    LoadingOutlined,
    Circle,
    Spin,
  },
  emits: ["ok"],
  setup(props, { emit }) {
    const state = reactive({
      active: "0",
    });

    const RESULT = inject("RESULT");
    const getAllBetList = computed(() => {
      const pending = RESULT.allBetList.value?.filter(
        (item) => !item.isSettled
      );
      const history = RESULT.allBetList.value?.filter((item) => item.isSettled);
      return {
        pending,
        history,
      };
    });

    const getVsInfo = (info) => {
      const selections = info.selections;
      const home = selections.find((item) => item.type === "home");
      const away = selections.find((item) => item.type === "away");
      return {
        home,
        away,
      };
    };
    const handlePick = (e) => {
      state.active = e;
    };
    const { handleMethods, getLoading } = useMethods();

    const handleStopPool = () => {
      handleMethods({
        name: "updateFundPoolStopFlag",
        callback: (h, r, e) => {
          if (r) {
            message.success("成功停止投注");
            emit("ok");
          }
        },
      });
    };
    return {
      state,
      handlePick,
      getLoading,
      handleStopPool,
      getAllBetList,
      getVsInfo,
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
  color: #fff;
  cursor: pointer;
}
.content {
  max-height: 250px;
  padding: 16px;
}
.color-white3 {
  color: #f9f9f9;
  &:hover {
    color: #ffbdbd;
  }
}
.item {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 14px;
  width: 80px;
}
</style>
