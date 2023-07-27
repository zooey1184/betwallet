<template>
  <div>
    <div
      v-if="!state.loading && !state.isOver"
      style="max-height: 70vh"
      class="overflow-auto"
    >
      <div
        class="active-color mt-24 f4 font-size-20 font-weight-600 text-align-center"
      >
        PLACE BET
      </div>
      <!-- <div class="text-align-center f3 my-16">BET</div> -->
      <div
        class="active-color flex ff items-center justify-center font-weight-600 lg-title"
      >
        <div class="mr-24">${{ getBetInfo.stake }}</div>
        <div class="ml-24">$PEPE</div>
      </div>
      <div class="active-color mt-8 mb-16" v-for="item in getBetList">
        <div
          class="font-size-32 font-weight-600 line-height-32 flex items-center"
        >
          {{ getActiveInfo(item).name }}
          <span class="flex items-center ml-24">
            {{ getActiveInfo(item).odds }}
          </span>
        </div>
        <div class="flex items-center justify-between">
          <div class="line-height-16">
            {{ item.homeInfo.name }} VS {{ item.awayInfo.name }}
          </div>
          <div class="line-height-16">
            {{ item.homeInfo.handicap ? "Match Handicap" : "Match Winner" }}
          </div>
        </div>

        <div
          class="bet-pane primary-bg mt-8"
          v-if="getBetInfo.type !== 'combo'"
        >
          <div class="flex items-center justify-between mb-8">
            <div>YOUR BET</div>
            <div>${{ item.betValue }}</div>
          </div>
          <div class="flex items-center justify-between">
            <div>POTENTIAL WIN</div>
            <div class="active-color">
              {{ getSingleWin(item).value }} ± {{ getSingleWin(item).offset }}
            </div>
          </div>
        </div>
      </div>

      <!-- COMBO -->
      <div class="bet-pane primary-bg mt-8" v-if="getBetInfo.type === 'combo'">
        <div class="flex items-center justify-between mb-8">
          <div>YOUR BET</div>
          <div>${{ getBetInfo.stake }}</div>
        </div>
        <div
          class="flex items-center justify-between mb-8"
          v-if="getBetInfo.type === 'combo'"
        >
          <div>POTENTIAL ODDS</div>
          <div>{{ getBetInfo.odds }}</div>
        </div>
        <div class="flex items-center justify-between">
          <div>POTENTIAL WIN</div>
          <div class="active-color">{{ getBetInfo.win }}</div>
        </div>
      </div>
      <div class="mt-16 font-size-12 line-height-16">
        THE ODDS WILL BE ESTIMATED AND YOU WILL PLACE BETS WITH A MINIMUM OF
        {{ getMinMax.min }}% (RELATED TO SLIPPAGE) AND A MAXIMUM OF
        {{ getMinMax.max }}%. MINIMUM WIN IS {{ getMinMax.minValue }}, MAXIMUM
        WIN IS {{ getMinMax.maxValue }}. THE BET WILL AUTOMATICALLY BE CANCELED
        IF SLIPPAGE BEYOND ITS RANGE
      </div>
      <div class="flex items-center">
        <div class="mr-8 cancelBtn flex-0" @click="handleBetLast">BACK</div>
        <Button
          :loading="state.loading"
          type="primary"
          class="confirmBtn flex-1"
          @click="handleBetFn"
          >PLACE BET</Button
        >
      </div>
    </div>

    <Loading v-if="state.loading && !state.isOver" />
    <Over v-if="state.isOver" @click='handleClose' />
  </div>
</template>

<script>
import { computed, defineComponent, inject, reactive } from "vue";
import { preCheck, preCheckMulti } from "@/sport/api/index";
import { useBet } from "@/sport/hooks/use-methods";
import usePermission from "@/sport/hooks/use-methods";
import { message, Spin, Button } from "ant-design-vue";
import { TIP } from "@/sport/constant/tip";
import Loading from "./loading.vue";
import Over from "./over.vue";

export default defineComponent({
  components: {
    Spin,
    Button,
    Loading,
    Over,
  },
  props: {},
  emits: ["cancel", 'close'],
  setup(props, { emit }) {
    const state = reactive({
      loading: false,
      isOver: false,
    });
    const CONTRACT = inject("CONTRACT");
    const SPORT_BET = inject("SPORT_BET");
    const UTILS = inject('UTILS')
    const ROOM = inject("ROOM");
    const { handleAuth } = usePermission();

    const getBetInfo = computed(() => SPORT_BET.getMyBetInfo?.value);
    const getBetConfig = computed(() => SPORT_BET.getBetConfig?.value);
    const getBetList = computed(() =>
      getBetInfo?.value?.data?.filter((item) => !!item.betValue)
    );
    const RESULT = inject("RESULT");

    const handleGetParams = () => {
      const getMyBetInfo = getBetInfo.value;
      const list = getMyBetInfo.data?.filter(
        (item) => item.active && item.betValue
      );
      const _list = [];
      list.forEach((item) => {
        // const AMOUNT = web3.utils.toWei(`${item.betValue}`, "mwei");
        const AMOUNT = UTILS.decimals(item.betValue)

        const tolerance = getBetConfig?.value?.tolerance || 0;
        const minOdds = Math.floor(parseInt(item.activeValue * (100 - tolerance)));
        // const minOdds = parseInt(item.activeValue * 100);
        _list.push({
          marketId: item.oddsId,
          tenant: ROOM?.code?.value,
          amount: AMOUNT,
          betSide: item.active === "home" ? 0 : item.active === "away" ? 1 : 2,
          minOdds: minOdds, // (当前赔率*(100-滑点))
        });
      });
      return _list;
    };

    const getMinMax = computed(() => {
      const t = getBetConfig.value.tolerance;
      const min = 100 - parseInt(t);
      const max = 100 + parseInt(t);
      const minV = parseFloat((getBetInfo.value.win * (min / 100)).toFixed(2));
      const maxV = parseFloat((getBetInfo.value.win * (max / 100)).toFixed(2));
      return {
        min,
        max,
        minValue: minV,
        maxValue: maxV,
      };
    });

    const getActiveInfo = (item) => {
      if (item.active === "home") {
        return item.homeInfo;
      } else if (item.active === "away") {
        return item.awayInfo;
      }
    };

    const getSingleWin = (item) => {
      const t = getBetConfig.value.tolerance;
      const min = 100 - parseInt(t);
      const max = 100 + parseInt(t);
      const activeInfo = getActiveInfo(item);
      // const minV = parseFloat((item.betValue * (min / 100)).toFixed(2));
      // const maxV = parseFloat((item.betValue * (max / 100)).toFixed(2));
      // const offset = parseFloat((item.betValue * t).toFixed(2));
      const value = parseFloat((activeInfo.odds * item.betValue).toFixed(2));

      const offset = parseFloat((value * (t / 100)).toFixed(2));
      return {
        // minV,
        // maxV,
        value,
        offset,
      };
    };
    const { handleBet } = useBet();

    const handleBetLast = () => {
      emit("cancel");
    };
    // const {
    //   handlePermission
    // } = usePermission();

    const handleBetFn = () => {
      const list = handleGetParams();
      const params = list[0];
      state.loading = true;
      const query = {
        tenant: params.tenant,
        amount: params.amount,
        odds: params.minOdds,
        bet_side: params.betSide,
        market_id: params.marketId,
      }
      console.log(params)
      // preCheck(query).then((res) => {
      //   if (res) {
      //     handleAuth(() => {
      //       handleBet(params, (h, r, e) => {
      //         if (r) {
      //           message.success("BET SUCCESS");
      //           setTimeout(() => {
      //             SPORT_BET.clear();
      //             RESULT.handleGetResultList();
      //             state.loading = false;
      //             state.isOver = true;
      //           });
      //         }
      //         if (e) {
      //           state.loading = false;
      //           state.isOver = false;
      //         }
      //       });
      //     });
      //   } else {
      //     message.warning(TIP.preCheck);
      //     state.loading = false;
      //     state.isOver = false;
      //   }
      // });
    };

    const handleGetBetInfo = () => {
      const getMyBetInfo = getBetInfo.value;
      const list = getMyBetInfo.data?.filter(
        (item) => item.active && item.betValue
      );
      const _list = [];
      list.forEach((item) => {
        const AMOUNT = UTILS.decimals(item.betValue)

        const tolerance = getBetConfig?.value?.tolerance || 0;
        const minOdds = parseInt(item.activeValue * (100 - tolerance));
        _list.push({
          amount: AMOUNT,
          odds: minOdds, // (当前赔率*(100-滑点))
          bet_side: item.active === "home" ? 0 : item.active === "away" ? 1 : 2,
          market_id: item.oddsId,
        });
      });
      return _list;
    };
    const handleBetMulti = () => {
      const list = handleGetBetInfo();
      const obj = {
        tenant: ROOM?.code?.value,
        orderInfos: list,
      };
      preCheckMulti(obj).then((res) => {
        console.log(res);
      });
    };

    const handleClose = () => {
      emit('close')
      state.loading = false
      state.isOver = false
    }

    return {
      state,
      handleBetFn,
      getBetList,
      getBetInfo,
      getActiveInfo,
      getMinMax,
      getSingleWin,
      handleBetLast,
      handleBetMulti,
      handleClose,
    };
  },
});
</script>

<style lang="less" scoped>
.bet-pane {
  border-radius: 8px;
  padding: 8px 16px;
  color: #fff;
}
.lg-title {
  font-size: 48px;
  @media screen and (max-width: 600px) {
    font-size: 28px;
  }
}
.cancelBtn {
  font-size: 16px;
  font-weight: 600;
  min-width: 60px;
  width: 30%;
  height: 38px;
  line-height: 38px;
  background: #fff;
  border: 1px solid var(--primary-main);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  margin-top: 24px;
  color: var(--primary-main);
  margin-bottom: 16px;
  &:active {
    opacity: 0.8;
  }
}
.confirmBtn {
  font-size: 16px;
  font-weight: 600;
  height: 38px;
  line-height: 32px !important;
  background: var(--primary-main) !important;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  margin-top: 24px;
  color: #fff;
  margin-bottom: 16px;
  border: 1px solid var(--primary-main) !important;
  &:active {
    opacity: 0.8;
  }
  &:hover {
    color: #fff;
    border: 1px solid var(--primary-main);
    background: #ff0083 !important;
  }
}
</style>
