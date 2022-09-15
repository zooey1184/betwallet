<template>
  <div class="">
    <div class="">
      <div class="flex items-center justify-center">
        <img src="../../images/footer-logo.png" alt="" />
      </div>
      <div class="text-align-center my-16">
        ©2021 - Nesting - ALL RIGHTS RESERVED
      </div>
    </div>
    <div class="flex items-center justify-center">
      <Icons />
    </div>
    <div class="text-align-center cursor-pointer link mt-8">
      BETWEB3 TERMS&CONDITIONS
    </div>
  </div>
  <div style="margin-top: 26px" class="text-align-center gray-9 font-size-12">
    Any investment in blockchain assets involves the risk of losing part or all
    of your investment. The value of your exchange’s blockchain assets is
    affected by market and other investment risks
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import DiscordIcon from "../icons/discord.vue";
import Icons from "./icons.vue";

export default defineComponent({
  components: {
    DiscordIcon,
    Icons,
  },
  props: {},
  setup(props) {
    const state = reactive({});

    return {
      state,
    };
  },
});
</script>

<style lang="less" scoped>
.right {
  margin-left: 30px;
  @media (min-width: 900px) and (max-width: 1440px) {
    margin-left: 44px;
  }
  @media (min-width: 1441px) and (max-width: 1919px) {
    margin-left: 66px;
  }
  @media (min-width: 1920px) {
    margin-left: 99px;
  }
}
.text {
  margin-left: 30px;
  @media (min-width: 900px) and (max-width: 1440px) {
    margin-left: 50px;
  }
  @media (min-width: 1441px) and (max-width: 1919px) {
    margin-left: 99px;
  }
  @media (min-width: 1920px) {
    margin-left: 121px;
  }
}
.icon {
  width: 30px;
  height: 30px;
  margin-left: 16px;
  transition: all 150ms linear;
  &:hover {
    transform: scale(1.2);
  }
}
</style>
