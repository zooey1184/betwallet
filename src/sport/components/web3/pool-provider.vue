<template>
  <slot></slot>
</template>

<script>
import {
  computed,
  defineComponent,
  inject,
  watch,
  onMounted,
  reactive,
  provide,
} from "vue";
import { getTotalBet } from "@/sport/api";

export default defineComponent({
  components: {},
  props: {},
  setup(props) {
    const state = reactive({
      rewards: undefined,
      betTotalAmount: undefined,
      totalBet: undefined,
      pools: {},
    });

    const ACCOUNTS = inject("ACCOUNTS");
    const CONTRACT = inject("CONTRACT");
    const ROOM = inject("ROOM");

    const handleGetReward = async (n) => {
      const res = await CONTRACT.value.football_contract?.methods["rewards"](
        n
      ).call();

      state.rewards = res;
      return res;
    };

    const getWalletAddress = computed(() => ACCOUNTS?.accounts?.value?.[0]);
    const getRoomAddress = computed(() => ROOM.roomAddress.value);

    // ## 获取奖池总额
    const handleGetPools = async (n) => {
      console.log(n);
      const r = n?.toLocaleLowerCase();
      const res = await CONTRACT.value.football_contract.methods
        .pools(r)
        .call();
      state.pools = res;
      state.betTotalAmount = res.betTotalAmount;
    };

    // 获取投注总额
    const handleGetTotalBet = (n) => {
      getTotalBet({ wallet: n }).then((res) => {
        state.totalBet = res;
      });
    };

    watch(
      () => [getWalletAddress.value, CONTRACT.value, getRoomAddress.value],
      (n) => {
        if (n[0] && n[1]?.football_contract && n[2]) {
          handleGetReward(n[0]);
          handleGetPools(n[2]);
          handleGetTotalBet(n[0]);
        }
      },
      {
        immediate: true,
      }
    );

    const getPools = computed(() => state.pools);
    const get_totalBet = computed(() => state.totalBet);
    const getReward = computed(() => state.rewards);
    // const getPools = computed(() => POOLS.pools?.value)
    const getPoolsLeft = computed(() => {
      const val = getPools.value;
      if (val) {
        const init = web3.utils.fromWei(`${val.initAmount}`, "mwei") || 0;
        const bet = web3.utils.fromWei(`${val.betTotalAmount}`, "mwei") || 0;
        const pay = web3.utils.fromWei(`${val.payForTotalAmount}`, "mwei") || 0;

        const t = parseInt(init) + parseInt(bet) - parseInt(pay);
        return t;
      }
      return 0;
    });
    provide("POOLS", {
      pools: getPools,
      poolsLeft: getPoolsLeft,
      totalBet: get_totalBet,
      rewards: getReward,
    });

    return {
      state,
    };
  },
});
</script>
