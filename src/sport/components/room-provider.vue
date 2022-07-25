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
    });
    const ACCOUNTS = inject("ACCOUNTS");
    const getAccounts = computed(() => ACCOUNTS.accounts.value);
    watch(
      () => getAccounts?.value,
      (n) => {
        console.log(n);
        const id = n?.[0];
        if (id) {
          queryTenant({ wallet: id }).then((res) => {
            console.log(res);
            state.code = res.data;
          });
        }
      },
      {
        immediate: true,
      }
    );

    const getCode = computed(() => state.code);

    provide("ROOM", {
      code: getCode,
    });

    return {
      state,
    };
  },
});
</script>
