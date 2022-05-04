<template>
  <div class="IndBetN IndBetNma IndBetW wow slideInUp" data-wow-duration="1.4s">
    <div class="IndBetNH flexC fl-bet">
      <p>The amount you stake</p>
      <a href="javascript:;" class="IndBetI" @click="haddleToggleVisible"></a>
    </div>
    <div class="IndBetNk" ref="dropdownRef" id='dropdownStake'>
      <!--未登录-展开-->
      <LinkWallet v-if="!state.isLogin" />
      <!--已登录-展开-->
      <div class="IndBetYDK" v-else>
        <div class="IndBetYz Huans">
          <div class="IndBetYzT flexC fl-bet">
            <a href="javascript:;" :class="{on: state.active === 'tabA1'}" @click='state.active="tabA1"' class="IndBetYzTa tabA1">Stake</a>
            <a href="javascript:;" :class="{on: state.active === 'tabA2'}" @click='state.active="tabA2"' class="IndBetYzTa tabA2">Unstake</a>
          </div>
          <div class="IndBetYzN">
            <div class="IndBetYzK Huans flexC">
              <input type="text" name="name" autocomplete="off" />
              <div class="IndBetYzKSW flexC fl-bet">
                <a href="javascript:;" class="IndBetYzDa IndBetYzDaW"
                  >maximum</a
                >
                <a href="javascript:;" class="IndBetYzDa IndBetYzDaW tabAC1"
                  >{{state.active === 'tabA1' ? 'stake' : 'unstake'}}</a
                >
              </div>
            </div>
            <div class="IndBetYzH flexC fl-bet">
              <p>Bet in wallet</p>
              <span>0</span>
            </div>
            <div class="IndBetYzH flexC fl-bet">
              <p>Your stake amount</p>
              <span>0</span>
            </div>
          </div>
          <div class="IndBetYzN" style="display: none">
            <div class="IndBetYzK Huans flexC">
              <input type="text" name="name" />
              <div class="IndBetYzKSW flexC fl-bet">
                <a href="javascript:;" class="IndBetYzDa IndBetYzDaW"
                  >maximum</a
                >
                <a href="javascript:;" class="IndBetYzDa IndBetYzDaW tabAC2"
                  >stake</a
                >
              </div>
            </div>
            <div class="IndBetYzH">Bet in wallet</div>
            <div class="IndBetYzH flexC fl-bet">
              <p>Your stake amount</p>
              <span>0</span>
            </div>
          </div>
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
    const dropdownRef = ref();
    const state = reactive({
      isLogin: !!props.userInfo,
      visible: false,
      active: 'tabA1'
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
      // const _ref = dropdownRef.value;

      if (!state.visible) {
        $('#dropdownStake').slideDown(400);
      } else {
        $('#dropdownStake').slideUp(400);
      }
      state.visible = !state.visible;
    };

    return {
      state,
      dropdownRef,
      haddleToggleVisible,
    };
  },
});
</script>
