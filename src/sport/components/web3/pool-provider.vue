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

    const handleGetReward = async () => {
      console.log(CONTRACT.value);
      // const res = await CONTRACT.value.football_contract?.methods[name](...params).encodeABI()
    };

    const getWalletAddress = computed(() => ACCOUNTS?.accounts?.value?.[0]);

    const handleGetPools = async (n) => {
      const res = await CONTRACT.value.football_contract.methods
        .pools(n)
        .call();
      state.pools = res;
      state.betTotalAmount = res.betTotalAmount;
    };

    const handleGetTotalBet = (n) => {
      getTotalBet({ wallet: n }).then((res) => {
        console.log(res);
        state.totalBet = res;
      });
    };

    watch(
      () => [getWalletAddress.value, CONTRACT.value],
      (n) => {
        if (n[0] && n[1]?.football_contract) {
          handleGetPools(n[0]);
          handleGetTotalBet(n[0]);
        }
      },
      {
        immediate: true,
      }
    );

    onMounted(() => {
      handleGetReward();
    });

    const getPools = computed(() => state.pools);
    const get_totalBet = computed(() => state.totalBet);
    provide("POOLS", {
      poos: getPools,
      totalBet: get_totalBet,
    });

    return {
      state,
    };
  },
});
</script>
