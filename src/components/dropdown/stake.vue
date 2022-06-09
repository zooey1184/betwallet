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

          <!-- stake -->
          <div class="IndBetYzN" v-if='state.active==="tabA1"'>
            <div class="IndBetYzK Huans flexC">
              <input type="text" v-model='state.stake' autocomplete="off" />
              <div class="IndBetYzKSW flexC fl-bet">
                <a href="javascript:;" class="IndBetYzDa IndBetYzDaW" @click="handleGetMaxStake"
                  >maximum</a
                >
                <a-button
                  class="IndBetYzDa IndBetYzDaW tabAC1"
                  style="height: 38px; background: #55557b; color: #c6c6de"
                  type='link'
                  :loading='state.stakeLoading'
                  @click='handleStake'
                >
                  stake
                </a-button>
              </div>
            </div>
            <div class="errorMsg" v-if='stakeErrMsg'>{{stakeErrMsg}}</div>
            <div class="IndBetYzH flexC fl-bet">
              <p>Bet in wallet</p>
              <a-statistic :valueStyle="{color: '#8989a2', fontSize: '14px'}" :value='getMaxStake' />
            </div>
            <div class="IndBetYzH flexC fl-bet">
              <p>Your stake amount</p>
              <a-statistic :valueStyle="{color: '#8989a2', fontSize: '14px'}" :value='AMOUNT.allStakeAmount' />
            </div>
          </div>

          <!-- unstake -->
          <div class="IndBetYzN" v-if='state.active==="tabA2"'>
            <div class="IndBetYzK Huans flexC">
              <input type="text" v-model='state.unstake' autocomplete="off" />
              <div class="IndBetYzKSW flexC fl-bet">
                <a 
                  href="javascript:;"
                  class="IndBetYzDa IndBetYzDaW"
                  @click="handleGetMaxUnstakeAmount"
                >
                  maximum
                </a>
                <a-button
                  class="IndBetYzDa IndBetYzDaW tabAC1"
                  style="height: 38px; background: #55557b; color: #c6c6de"
                  @click="handleUnstake"
                  :loading='state.unstakeLoading'
                  type='link'>
                  unstake
                </a-button>
              </div>
            </div>
            <div class="errorMsg" v-if='unstakeErrMsg'>{{unstakeErrMsg}}</div>
            <div class="IndBetYzH">Bet in wallet</div>
            <div class="IndBetYzH flexC fl-bet">
              <p>Your unstake amount</p>
              <a-statistic :valueStyle="{color: '#8989a2', fontSize: '14px'}" :value='AMOUNT.allUnstakeAmount' />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, message, Statistic } from "ant-design-vue";
import { computed, defineComponent, inject, reactive, ref, watch } from "vue";
import LinkWallet from './link-wallet.vue'

export default defineComponent({
  components: {
    LinkWallet,
    'a-button': Button,
    'a-statistic': Statistic
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
      active: 'tabA1',
      stake: '',
      unstake: '',
      unstakeMsg: '',
      stakeMsg: '',
      stakeLoading: false,
      unstakeLoading: false
    });

    watch(
      () => props.userInfo,
      (n) => {
        if (n) {
          state.isLogin = true;
        }
      }
    );

    const AMOUNT = inject('AMOUNT')
    const accounts = inject('accounts')
    const CONTRACT = inject('CONTRACT')
    const ALL_ADDRESS = inject('ALL_ADDRESS')

    const ALL_CONTRACT = inject('ALL_CONTRACT')
    const getMaxUnStake = computed(() => AMOUNT.value?.maxUnStakeAmount)
    const getMaxStake = computed(() => AMOUNT.value?.bet.value)

    const unstakeErrMsg = computed(() => {
      if (state.unstake) {
        if (!state.unstake.match(/^\d+\.?\d*$/)) {
          return 'Invalid amount'
        }
        if (parseFloat(state.unstake) > getMaxUnStake.value) {
          return 'Maximum exceeded'
        }
      }
      return state.unstakeMsg
    })
    const stakeErrMsg = computed(() => {
      if (state.stake) {
        if (!state.stake.match(/^\d+\.?\d*$/)) {
          return 'Invalid amount'
        }
        if (parseFloat(state.stake) > getMaxStake.value) {
          return 'Maximum exceeded'
        }
      }
      return state.stakeMsg
    })
    const haddleToggleVisible = () => {
      if (!state.visible) {
        $('#dropdownStake').slideDown(400);
      } else {
        $('#dropdownStake').slideUp(400);
      }
      state.visible = !state.visible;
    };

    const handleGetMaxStake = () => {
      const max = getMaxStake.value
      state.stake = max
    }

    watch(() => state.stake, (n) => {
      if (n?.length) {
        state.stakeMsg = ''
      }
    })
    watch(() => state.unstake, (n) => {
      if (n?.length) {
        state.unstakeMsg = ''
      }
    })

    const hasPermission = async() => {
      const bet = ALL_CONTRACT.value.bet
      const bonus_addr = ALL_ADDRESS.value.bonus
      const wallet_addr = accounts.value[0]
      const obj = await bet.methods.allowance(wallet_addr, bonus_addr).call()
      if (obj < 1e+30) {
        return false
      } else {
        return true
      }
    }
    const getPermission = async(callback) => {
      const bet = ALL_CONTRACT.value.bet
      const bonus_addr = ALL_ADDRESS.value.bonus
      const wallet_addr = accounts.value[0]
      const amount = web3.utils.toHex('11579208923731619542357098500')
      const obj = bet.methods['approve'](bonus_addr, amount).encodeABI()
      const gasPrice = await web3.eth.getGasPrice()

      const params = {
        from: wallet_addr,
        to: bonus_addr,
        gasPrice: gasPrice,
        // data: obj,
        value: '0x00'
      }

      window.web3.eth.sendTransaction(params)
      .on('transactionHash', (hash) => {
        callback && callback(hash, null, null)
      })
      .on('receipt', (r) => {
        callback(null, r, null)
      })
      .on('error', (e) => {
        callback(null, null, e)
      })
    }

    const stake = () => {
      const val = web3.utils.toWei(state.stake, 'wei')
      if (!stakeErrMsg?.length) {
        state.stakeLoading = true
        if (val) {
          const a = CONTRACT.value?.methods.deposit(val).call({
            from: accounts.value[0],
            to: CONTRACT.value._address,
          }).then(res => {
            console.log(res);
          }).catch((e) => {
            const msg = e.message?.split('{')?.[0] || 'Error: Transaction failed'
            message.error(msg)
          }).finally(() => {
            state.stakeLoading = false
          })
        } else {
          message.warning('WARNING: Please enter an amount greater than 0')
        }
      }
    }
    const handleStake = async() => {
      state.stakeLoading = true
      if (state.stake) {
        // const val = web3.utils.toHex(state.stake)
        const t = await hasPermission()
        console.log(t);
        state.stakeLoading = false
        if (t) {
          stake()
        } else {
          const p = await getPermission((h, r, e) => {
            if (h) {
              stake()
            }
          })
        }
        
      } else {
        state.stakeMsg = 'Amount Not Allow Empty'
        return
      }
    }

    const handleGetMaxUnstakeAmount = () => {
      const max = AMOUNT.value.maxUnStakeAmount
      state.unstake = max
    }
    const handleUnstake = () => {
      if (!state.unstake) {
        state.unstakeMsg = 'Amount Not Allow Empty'
        return
      }
      if (!unstakeErrMsg?.length) {
        const t = parseFloat(state.unstake)
        if (t && t > 0) {
          state.unstakeLoading = true
          CONTRACT.value?.methods?.withdrawPrincipal(state.unstake).call({
            to: accounts.value[0],
          }).then(res => {
            // 提取本金
          }).catch((e) => {
            const msg = e.message?.split('{')?.[0] || 'Error: Transaction failed'
            message.error(msg)
          }).finally(() => {
            state.unstakeLoading = false
          })
        } else {
          message.warning('WARNING: Please enter an amount greater than 0')
        }
      }
    }
    
    return {
      state,
      dropdownRef,
      AMOUNT,
      unstakeErrMsg,
      stakeErrMsg,
      haddleToggleVisible,
      handleStake,
      handleGetMaxUnstakeAmount,
      handleUnstake,
      handleGetMaxStake,
      getMaxStake
    };
  },
});
</script>

<style lang="less" scoped>
.errorMsg {
  font-size: 12px;
  margin-bottom: 4px;
  color: #d43f33;
}
@media screen and (max-width: 1279px) and (min-width: 960px) {
  .IndBetYzK {
    margin-bottom: 4px;
  }
}
</style>