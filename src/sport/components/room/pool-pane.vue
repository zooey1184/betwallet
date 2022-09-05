<template>
  <div>
    <div v-if="!state.loading">
      <div class="active-color ff title mt50 text-align-center">
        CASINO INFORMATION
      </div>
      <div class="color-black f3 text-align-center mt-16">
        AMOUNT OF THE USDT POOL
      </div>
      <div
        class="flex justify-center f5 mt-8 font-weight-600 active-color amount"
      >
        ${{ poolsLeft }} USDT
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
            <div>
              <div class="gray f1 font-size-12">{{ item.bet_time }}</div>
              <div class="flex items-center">
                <div style="width: 50%">USER: {{ getUser(item) }}</div>
                <!-- <div style="width: 20%" class="text-align-center">07.21</div> -->
                <!-- <div style="width: 20%" class="text-align-right">5:00AM</div> -->
                <div
                  style="width: 50%"
                  class="text-align-right flex items-center"
                >
                  <div class="item">{{ getVsInfo(item).home.name }}</div>
                  <div style="margin: 0 4px" class="gray-9">vs</div>
                  <div class="item text-align-right">
                    {{ getVsInfo(item).away.name }}
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="ellipsis-1" style="max-width: 130px">
                  {{ getVsInfo(item).win.name }} {{ item.odds }}
                </div>
                <div class="flex items-center">
                  <span class="sm-hide">BETTING AMOUNT:</span>
                  <span class="flex items-center flex-1">
                    <!-- <img
                      class="mx-8"
                      src="../../images/v2/coin-icon-red.png"
                      alt=""
                    /> -->
                    <UsdtIcon
                      class="active-color font-size-16"
                      style="margin: 0 3px"
                    />
                    {{ item.bet_amount }}
                  </span>
                </div>
              </div>
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
            <div>
              <div class="gray f1 font-size-12">{{ item.bet_time }}</div>
              <div class="flex items-center">
                <div style="width: 50%">USER: {{ getUser(item) }}</div>
                <!-- <div style="width: 20%" class="text-align-center">07.21</div> -->
                <!-- <div style="width: 20%" class="text-align-right">5:00AM</div> -->
                <div
                  style="width: 50%"
                  class="text-align-right flex items-center"
                >
                  <div class="item">{{ getVsInfo(item).home.name }}</div>
                  <div style="margin: 0 2px" class="gray-9">vs</div>
                  <div class="item text-align-right">
                    {{ getVsInfo(item).away.name }}
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="ellipsis-1" style="max-width: 130px">
                  {{ getVsInfo(item).win.name }} {{ item.odds }}
                </div>
                <div class="flex items-center">
                  <span class="sm-hide">BETTING AMOUNT:</span>
                  <span class="flex items-center">
                    <!-- <img
                      class="mx-8"
                      src="../../images/v2/coin-icon-red.png"
                      alt=""
                    /> -->
                    <UsdtIcon
                      class="active-color font-size-16"
                      style="margin: 0 3px"
                    />
                    {{ item.bet_amount }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="confirmBtn active-bg mt-16 mb-8 f4"
        v-if="!getIsStopBet && getAllBetList.pending?.length"
        @click="handleStopPool"
      >
        CLOSE THE CASINO
      </div>
      <div
        class="confirmBtn active-bg mt-16 mb-8 f4"
        v-if="getIsStopBet && getAllBetList.pending?.length"
        @click="handleStopPool"
      >
        RESTART THE CASINO
      </div>
      <div
        class="confirmBtn active-bg mt-16 mb-8 f4"
        v-if="!!getIsStopBet && !getAllBetList.pending?.length"
        @click="handleClaimFundPool"
      >
        Claim Pool Amount
      </div>
    </div>
    <div v-else>
      <PoolPaneLoading />
    </div>
  </div>
</template>

<script>
import { reactive, defineComponent, inject, computed } from "vue";
import { QuestionCircleOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import Circle from "./circle.vue";
import { message, Spin } from "ant-design-vue";
import useMethods from "@/sport/hooks/useFootballMethods";
import useClaimMethods from "@/sport/hooks/use-claim";
import { TIP } from "@/sport/constant/tip";
import PoolPaneLoading from "./pool-pane-loading.vue";
import UsdtIcon from "../usdt-icon.vue";

export default defineComponent({
  components: {
    QuestionCircleOutlined,
    LoadingOutlined,
    Circle,
    PoolPaneLoading,
    Spin,
    UsdtIcon,
  },
  emits: ["ok"],
  setup(props, { emit }) {
    const state = reactive({
      active: "0",
    });

    const RESULT = inject("RESULT");
    const POOLS = inject("POOLS");
    const getIsStopBet = computed(() => POOLS?.isStopBet.value);
    const poolsLeft = computed(() => POOLS.poolsLeft.value);
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
      const win =
        info.bet_side === "0"
          ? home
          : info.bet_side === "1"
          ? away
          : { name: "DRAW" };
      return {
        home,
        away,
        win,
      };
    };

    const getUser = (info) => {
      const user = info.user;
      return user?.substr(0, 3) + "**" + user?.substr(-3);
    };
    const handlePick = (e) => {
      state.active = e;
    };
    const { handleMethods, getLoading } = useMethods();
    const claimMethods = useClaimMethods();

    const handleClaimFundPool = () => {
      state.loading = true;
      claimMethods.handleMethods({
        name: "claimFundPool",
        callback: (h, r, e) => {
          if (r) {
            state.loading = false;
            message.success("Claim Success");
            RESULT.handleGetResultList();
            POOLS.handleGetPoolsInfo();
            emit("ok");
          }
          if (e) {
            state.loading = false;
          }
        },
      });
    };

    const handleStopPool = () => {
      state.loading = true;
      handleMethods({
        name: "updateFundPoolStopFlag",
        callback: (h, r, e) => {
          if (r) {
            state.loading = false;
            message.success(TIP.stopBet);
            RESULT.handleGetResultList();
            POOLS.handleGetPoolsInfo();
            emit("ok");
          }
          if (e) {
            state.loading = false;
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
      getUser,
      poolsLeft,
      handleClaimFundPool,
      getIsStopBet,
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
  // &:hover {
  //   color: #ffbdbd;
  // }
}
.item {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 14px;
  width: 80px;
}
.amount {
  font-size: 48px;
  @media screen and(max-width: 700px) {
    font-size: 32px;
  }
}
.sm-hide {
  display: flex;
  @media screen and (max-width: 600px) {
    display: none;
  }
}
.title {
  font-size: 22px;
  @media screen and (max-width: 600px) {
    font-size: 18px;
  }
}
.mt50 {
  margin-top: 50px;
  @media screen and (max-width: 600px) {
    margin-top: 24px;
  }
}
</style>
