<template>
  <div class="IndBetN IndBetW wow slideInUp" data-wow-duration="2s">
    <div class="IndBetNH flexC fl-bet">
      <p>Rewards to be claimed</p>
      <a href="javascript:;" class="IndBetI" @click="haddleToggleVisible"></a>
    </div>
    <div class="IndBetNk" id="rewardClaimed">
      <!--未登录-展开-->
      <LinkWallet v-if="!state.isLogin" />
      <!--已登录-展开-->
      <div class="IndBetYDK" v-else>
        <div class="IndBetYz Huans">
          <DescriptionDropdown2 />
          <div class="IndBetYzD flexC fl-bet">
            <a href="javascript:;" class="IndBetYzDN">{{canRewardAmount}} USDT</a>
            <a href="javascript:;" class="IndBetYzDa" @click='handleReceive'>Receive</a>
          </div>
          <div class="IndBetYzH flexC fl-bet" v-if='false'>
            <p>Amount earned today</p>
            <div class="IndBetYzsub">USDT 0.0</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, inject, reactive, ref, watch } from "vue";
import LinkWallet from './link-wallet.vue'
// import {toast} from '../toast'
import {message} from 'ant-design-vue'

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

    const AMOUNT = inject('AMOUNT')
    const canRewardAmount = computed(() => AMOUNT.value.canRewardAmount || 0)
    watch(
      () => props.userInfo,
      (n) => {
        if (n) {
          state.isLogin = true;
        }
      }
    );

    const CONTRACT = inject('CONTRACT')

    const haddleToggleVisible = () => {
      if (!state.visible) {
        $("#rewardClaimed").slideDown(400);
      } else {
        $("#rewardClaimed").slideUp(400);
      }
      state.visible = !state.visible;
    };

    const handleReceive = () => {
      if (parseFloat(canRewardAmount.value)) {
        CONTRACT.value?.methods?.claim().call().then((res) => {
          AMOUNT.value?.getInfo()
        })
      } else {
        // toast('No Rewards to be claimed!')
        message.error('No Rewards to be claimed!')
      }
    }

    return {
      state,
      AMOUNT,
      haddleToggleVisible,
      canRewardAmount,
      handleReceive,
    };
  },
});
</script>
