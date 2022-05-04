<template>
  <div class="IndBetN IndBetW wow slideInUp" data-wow-duration="1.8s">
    <div class="IndBetNH flexC fl-bet">
      <p>Rewards</p>
      <a href="javascript:;" class="IndBetI" @click='haddleToggleVisible'></a>
    </div>
    <div class="IndBetNk" id="dropdownReward">
      <!--未登录-展开-->
      <LinkWallet v-if="!state.isLogin" />
      <!--已登录-展开-->
      <div class="IndBetYDK" v-else>
        <div class="IndBetYz Huans flexC">
          <div class="IndBetYzH">Amount earned so far:</div>
          <div class="IndBetYzS">0 USDT</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, watch } from "vue";
import LinkWallet from './link-wallet.vue'

export default defineComponent({
  components: {
    LinkWallet
  },
  props: {
    userInfo: {
      type: Object,
    },
  },
  setup(props) {
    const state = reactive({
      isLogin: !!props.userInfo,
      visible: false,
    });

    watch(
      () => props.userInfo,
      (n) => {
        if (n) {
          state.isLogin = true;
        }
      }
    );

    const haddleToggleVisible = () => {
      if (!state.visible) {
        $("#dropdownReward").slideDown(400);
      } else {
        $("#dropdownReward").slideUp(400);
      }
      state.visible = !state.visible;
    };

    return {
      state,
      haddleToggleVisible,
    };
  },
});
</script>
