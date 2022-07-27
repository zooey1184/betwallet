<template>
  <div>
    <BetTab v-model:active="state.active"></BetTab>
    <div>
      <BetPane />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import BetTab from "./bet-tab.vue";
import BetPane from "./bet-pane.vue";

export default defineComponent({
  components: {
    BetTab,
    BetPane,
  },
  props: {},
  setup(props) {
    const state = reactive({
      active: "bet",
    });

    return {
      state,
    };
  },
});
</script>
