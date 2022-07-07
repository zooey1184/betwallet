<template>
  <div class="back01">
	<Header @connect="handleConnect" :ID='addressHide' :userInfo="state.userInfo" />
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
import {initWeb3, initContract, getBalance} from './setup'
import {getBonusInfo} from './api'

export default defineComponent({
  components: {
    InitProvider,
    Page,
    Web3Provider,
    SportProvider
  },
  setup(props) {
<<<<<<< HEAD
    const state = reactive({
      downloadModalVisible: false,
      userInfo: undefined,
      accounts: undefined,
      id: undefined,
      contract: undefined,
      maxUnStakeAmount: 0,
      rewards: 0,
      historyStakeAmount: 0,
      historyUnStakeAmount: 0,
      eth: 0,
      bet: 0,
      usdt: 0
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
            console.log('not login: ', e);
            toast(e.message)
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

    const init_web3 = async() => {
      const res = await initWeb3()
      if (res) {
        if (res.accounts?.length) {
          state.accounts = res.accounts
          state.id = res.accounts[0]
          const {bonus, bet, usdt, usdt_address, bonus_address} = await initContract()

          console.log(bonus);
        }
        if(res.isLink) {
          state.userInfo = {
            _accounts: res.accounts
          }
          state.eth = await getBalance(res.accounts[0], 'ether')
        }
      }
    }

    const getAccounts = computed(() => state.accounts)
    const getContract = computed(() => state.contract)
    const getEth = computed(() => state.eth)
    const getAmount = computed(() => {
      return {
        maxUnStakeAmount: state.maxUnStakeAmount,
        rewards: state.rewards,
        historyStakeAmount: state.historyStakeAmount,
        historyUnStakeAmount: state.historyUnStakeAmount,
        ethBalance: getEth
      }
    })
    provide('accounts', getAccounts)
    provide('CONTRACT', getContract)
    provide('AMOUNT', getAmount)

    const getBonusInfoFn = () => {
      getBonusInfo().then(res => {
        console.log(res);
        const {total_bet_today} = res
        state.total_bet_today = total_bet_today
      })
    }

    onMounted(() => {
      init_web3()
      getBonusInfoFn()
    })

    return {
      state,
      addressHide,
      handleConnect,
    }
=======
    onMounted(() => {
      $(window).resize(function () {          //当浏览器大小变化时
        if($('body').width()>959){$('.wapNav').removeClass('wapNavO');$('.wapMenu').slideUp(100);}
      });
    })
>>>>>>> a9ec1c615ad6ccac108b35998329ea69d49845a1
  }
})
</script>