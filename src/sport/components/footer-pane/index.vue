<template>
  <Pc v-if="!isMobile" />
  <Mobile v-else />
</template>

<script>
import { defineComponent, inject, onMounted, ref } from "vue";
import Pc from "./pc.vue";
import Mobile from "./mobile.vue";

export default defineComponent({
  components: {
    Pc,
    Mobile,
  },
  props: {},
  setup(props) {
    const isMobile = ref(false);

    onMounted(() => {
      if (window.innerWidth <= 600) {
        isMobile.value = true;
      } else {
        isMobile.value = false;
      }
    });
    return {
      isMobile,
    };
  },
});
</script>
