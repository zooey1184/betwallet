<template>
  <div class="back01">
	<Header @connect="handleConnect" :ID='addressHide' :showBtn='state.visible' :userInfo="state.userInfo" />
	<NavPane :userInfo="state.userInfo" :ID='addressHide' :ETH="state.userInfo?.ETH" />

	<div class="TcB"></div>
	
	<article class="IndBak Huans">
		<section class="ward">
			<HeaderPane :userInfo="state.userInfo" :account="state.total_bet_today" />

			<section class="IndBet Huans flex fl-bet">
				<div class="IndBetT wow slideInUp flexC IndBetW" data-wow-duration="1s">
					<div class="IndBetTI IndBac1"><img src="./images/icon04.png"></div>
					<div class="IndBetTN">
						<div class="IndBetTNh">Stake BET</div>
						<div class="IndBetTNs">Stake <a href="javascript:;">BET</a>&emsp;|&emsp;USDT  Earn dividend pool USDT</div>
					</div>
				</div>

        <DropdownState :userInfo="state.userInfo" />
				<DropdownReward :userInfo="state.userInfo" />
				<DropdownRewardClaimed :userInfo="state.userInfo" />
			</section>

			<ValueDescription />
		</section>
	</article>	
	<Footer />
  <DownloadModal v-model:visible="state.downloadModalVisible" />
</div>
</template>

<script>
import { computed, defineComponent, onMounted, provide, reactive, ref } from 'vue'
import Footer from './components/footer.vue'
import ValueDescription from './components/value-description.vue'
import HeaderPane from './components/header-pane.vue'
import DescriptionDropdown2 from './components/description-dropdown2.vue'
import Header from './components/header.vue'
import DropdownState from './components/dropdown/stake.vue'
import DropdownReward from './components/dropdown/reward.vue'
import DropdownRewardClaimed from './components/dropdown/reward-claimed.vue'
import NavPane from './components/nav.vue'
import DownloadModal from './components/downloadModal.vue'
import {toast} from './components/toast'
import {ADDRESS, ABI} from './constant'
import {initWeb3, initContract, getBalance, getBalanceOf, initInfo} from './setup'
import {getBonusInfo} from './api'
import {message} from 'ant-design-vue'

export default defineComponent({
  components: {
    Footer,
    ValueDescription,
    HeaderPane,
    DescriptionDropdown2,
    Header,
    DropdownState,
    DropdownReward,
    DropdownRewardClaimed,
    NavPane,
    DownloadModal,
  },
  props: {},
  setup(props) {
    const state = reactive({
      web3: undefined,
      downloadModalVisible: false,
      userInfo: undefined,
      accounts: undefined,
      id: undefined,
      contract: undefined,
      rewards: 0,
      allRewardAmount: 0,
      allStakeAmount: 0,
      allUnstakeAmount: 0,
      max_unstake: undefined,
      canRewardAmount: 0,
      eth: 0,
      bet: 0,
      usdt: 0,
      address: [],
      bonusContract: undefined,
      usdtContract: undefined,
      betContract: undefined
    })
    
    const handleConnect = () => {
      if (typeof window.ethereum !== 'undefined') {
        if (!state.accounts?.length) {
          ethereum.request({ method: 'eth_requestAccounts' })
          .then(res => {
            state.accounts = res
            window.location.reload()
            window.localStorage.setItem('isLINK', 'true')
          })
          .catch((e) => {
            // not login
            // toast(e.message)
            message.error(e.message)
            window.localStorage.setItem('isLINK', 'false')
          });
        } else {
          window.localStorage.setItem('isLINK', 'true')
          window.location.reload()
        }
      } else {
        state.downloadModalVisible = true
      }
    }

    const addressHide = computed(() => {
      if (state.id) {
        const len = state.id.length
        return state.id.substring(0, 3) + '...' + state.id.substring(len-4)
      }
      return '**'
    })

    const getInfo = async (before, after) => {
      before && before()
      const {bonus, bet, usdt, usdt_address, bonus_address, bet_address} = await initContract()
      state.contract = bonus

      state.bonusContract = bonus
      state.betContract = bet
      state.usdtContract = usdt
      
      state.address = [bonus_address, bet_address, usdt_address]
      Promise.all([
        getBalance(state.id, 'ether'),
        getBalanceOf(bet, state.id, 'ether'),
        getBalanceOf(usdt, state.id, 'mwei')
      ]).then(res => {
        state.eth = res[0]
        state.bet = res[1]
        state.usdt = res[2]
      })
      const info = await initInfo(state.id, bonus)
      state.allRewardAmount = info.allRewardAmount
      state.allStakeAmount = info.allStakeAmount
      state.allUnstakeAmount = info.allUnstakeAmount
      state.max_unstake = info.maxUnstakeAmount
      state.canRewardAmount = info.canRewardAmount
      after && after()
    }

    const init_web3 = async() => {
      const res = await initWeb3()
      if (res) {
        if (res.accounts?.length) {
          state.accounts = res.accounts
          state.id = res.accounts[0]
          getInfo()
        }
        if(res.isLink) {
          state.userInfo = {
            _accounts: res.accounts
          }
        }
      }
    }

    const getAccounts = computed(() => state.accounts)
    const getContract = computed(() => state.contract)
    const getEth = computed(() => state.eth)
    const getBet = computed(() => state.bet)
    const getUsdt = computed(() => state.usdt)
    const getMaxUnStakeAmount = computed(() => state.max_unstake)
    const getAmount = computed(() => {
      return {
        eth: getEth,
        bet: getBet,
        usdt: getUsdt,
        allRewardAmount: state.allRewardAmount,
        allStakeAmount: state.allStakeAmount,
        allUnstakeAmount: state.allUnstakeAmount,
        maxUnStakeAmount: state.max_unstake,
        canRewardAmount: state.canRewardAmount,
        getInfo: getInfo
      }
    })
    const getAddress = computed(() => state.address)
    const getAllAddress = computed(() => ({
      bonus: getAddress.value[0],
      bet: getAddress.value[1],
      usdt: getAddress.value[2]
    }))
    const getAllContract = computed(() => ({
      bonus: state.bonusContract,
      bet: state.betContract,
      usdt: state.usdtContract
    }))
    provide('accounts', getAccounts)
    provide('CONTRACT', getContract)
    provide('AMOUNT', getAmount)
    provide('ADDRESS', getAddress)
    provide('ALL_CONTRACT', getAllContract)
    provide('ALL_ADDRESS', getAllAddress)

    const getBonusInfoFn = () => {
      getBonusInfo().then(res => {
        const {total_bet_today} = res
        state.total_bet_today = total_bet_today
      })
    }

    onMounted(() => {
      state.web3 = init_web3(() => {
        state.visible = false
      }, () => {
        state.visible = true
      })
      getBonusInfoFn()
    })

    return {
      state,
      addressHide,
      handleConnect,
    }
  }
})
</script>