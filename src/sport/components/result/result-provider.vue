<template>
  <slot></slot>
</template>

<script>
import {
  defineComponent,
  inject,
  reactive,
  provide,
  computed,
  watch,
} from "vue";
import { getBetList } from "@/sport/api/index";

export default defineComponent({
  components: {},
  props: {},
  setup(props) {
    const state = reactive({
      resultList: [],
    });
    const ACCOUNTS = inject("ACCOUNTS");
    const walletAddress = computed(() => ACCOUNTS?.accounts?.value?.[0]);
    const handleGetBetList = () => {
      if (walletAddress?.value) {
        // const a = "0xF873Ad938E8041C9c39f8A8DFd3505528240C302";
        const a = false
        getBetList({ wallet: a || walletAddress.value }).then((res) => {
          console.log(res);
          state.resultList = res;
        });
      }
    };

    const handleInLoop = () => {
      handleGetBetList();
      setTimeout(() => {
        handleInLoop();
      }, 60 * 1000);
    };

    watch(
      () => walletAddress.value,
      (n) => {
        if (n) {
          handleInLoop();
        }
      },
      {
        immediate: true,
      }
    );

    const getResultList = computed(() => state.resultList);
    provide("RESULT", {
      resultList: getResultList,
    });
    return {
      state,
    };
  },
});
</script>
