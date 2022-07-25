<template>
  <!-- <Web3Provider> -->
  <!-- <InitProvider> -->
  <!-- <RoomProvider> -->
  <!-- <SportProvider> -->
  <Layout />
  <!-- <Page /> -->
  <!-- </SportProvider> -->
  <!-- </RoomProvider> -->
  <!-- </InitProvider> -->
  <!-- </Web3Provider> -->
</template>

<script>
import { defineComponent, onMounted } from "vue";
// import InitProvider from "./components/init-provider.vue";
// import Page from "./page.vue";
// import Web3Provider from "./components/web3";
// import SportProvider from "./components/bet-provider.vue";
// import RoomProvider from "./components/room-provider.vue";
import Layout from "./layout";

export default defineComponent({
  components: {
    // InitProvider,
    // Page,
    // Web3Provider,
    // SportProvider,
    // RoomProvider,
    Layout,
  },
  setup(props) {
    onMounted(() => {
      $(window).resize(function () {
        //当浏览器大小变化时
        if ($("body").width() > 959) {
          $(".wapNav").removeClass("wapNavO");
          $(".wapMenu").slideUp(100);
        }
      });
    });
  },
});
</script>
