<template>
  <div class="back01">
	<Header @connect="handleConnect" :ID='addressHide' :userInfo="state.userInfo" @showNav='handleShowNav' />
	<NavPane :userInfo="state.userInfo" :ID='addressHide' :ETH="state.userInfo?.ETH" />

	<div class="TcB"></div>
	
	<article class="IndBak Huans">
		<section class="ward">
			<HeaderPane :userInfo="state.userInfo" />

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
// import ABI from './constant/abi.json'

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
    DownloadModal
  },
  props: {},
  setup(props) {
    const state = reactive({
      downloadModalVisible: false,
      userInfo: undefined,
      accounts: undefined,
      id: undefined
    })
    const handleShowNav = () => {
      $('.TcB').fadeIn(0);
		  $('.nav').addClass("navO");
    }

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

    // 获取余额
    const getBalance = () => {
      web3.eth.getBalance(state.id, (err, wei) => {
        const balance = web3.utils.fromWei(wei, 'ether')
        console.log(balance);
        
        web3.eth.getGasPrice((err, res) => {
          console.log(err, res);
        })
        state.userInfo = {
          _accounts: state.accounts,
          _balance: balance,
          ETH: balance
        }
      })
    }
    
    const init =  async () => {
      if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
        const accounts = await ethereum.request({ method: 'eth_accounts' })
        console.log(accounts);
        setTimeout(() => {
          web3.givenProvider.on("accountsChanged", (accounts) => {
            window.location.reload()
          });
          web3.givenProvider.on("chainChanged", (chainId) => {
            window.location.reload()
          });
          web3.givenProvider.on("disconnect", (code, reason) => {
            window.location.reload()
          });

          setTimeout(() => {
            // const provider = new web3.providers.HttpProvider('https://ropsten.infura.io/v3/');
            // web3.setProvider(provider)

            // const provider = new Web3.providers.WebsocketProvider('wss://infura_ws_url');
            // provider.on('error', e => console.error('WS Error', e));
            // provider.on('end', e => console.error('WS End', e));

            // web3.eth.disconnect()
            // ethereum.close()
            // window.location.reload()
          }, 2000)
        })
        if (accounts?.length) {
          state.accounts = accounts
          state.id = accounts[0]
          const isLINK = window.localStorage.getItem('isLINK')
          initContract(state.accounts[0])
          if (isLINK && isLINK === 'true') {
            state.userInfo = {
              _accounts: accounts
            }
            window.localStorage.setItem('isLINK', 'true')
            
            getBalance()
          }
        } else {
          console.log('未连接');
        }
      } else {
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      }
    }

    const initContract = (currentAccount) => {
      // 定义合约
      const UNIT = 1000000000
      const abi = JSON.parse(JSON.stringify(ABI))
      
      var myContract = new web3.eth.Contract(abi, ADDRESS, {
        from: currentAccount, // default from address
        gasPrice: `${UNIT*0.001}` // default gas price in wei
      });
    }

    const getAccounts = computed(() => state.accounts)
    provide('accounts', getAccounts)

    onMounted(() => {
      // 滚动动态添加样式
      $(window).scroll(function(){
        if($(window).scrollTop() >0){
          $('header').addClass("IndHC");
        }else{
          $('header').removeClass("IndHC");
        } 
      });

      init()
    })

    return {
      state,
      addressHide,
      handleConnect,
      handleShowNav
    }
  }
})
</script>