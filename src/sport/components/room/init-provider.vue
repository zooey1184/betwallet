<template>
  <slot></slot>
</template>

<script>
import {
  computed,
  defineComponent,
  inject,
  provide,
  reactive,
  watch,
} from "vue";
import { queryTenant } from "@/sport/api/index";

export default defineComponent({
  components: {},
  props: {},
  setup(props) {
    const state = reactive({
      code: undefined,
      otherCode: undefined,
    });
    const ACCOUNTS = inject("ACCOUNTS");

    const getAccounts = computed(() => ACCOUNTS.accounts.value);

    const handleGetCode = () => {
      const n = getAccounts?.value;
      const id = n?.[0];
      if (id) {
        queryTenant({ wallet: id }).then((res) => {
          state.code = res?.length ? res : "";
        });
      }
    };
    watch(
      () => getAccounts?.value,
      (n) => {
        handleGetCode();
      },
      {
        immediate: true,
      }
    );

    const getCode = computed(() => state.code);
    const getOtherCode = computed(() => state.otherCode);

    provide("ROOM", {
      code: getCode,
      otherCode: getOtherCode,
      handleGetCode,
      setState: (data) => {
        for (let i in data) {
          state[i] = data[i];
        }
      },
    });

    return {
      state,
    };
  },
});
</script>
