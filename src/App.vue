<template>
  <div>
    <Header v-model:active='state.active' @link="handleConnect" />
    <MNav v-model:active='state.active' />

    <LeftSider />

    <RightSider @walletVisible="handleWalletVisible" />

    <Content />

    <WalletPane v-model:visible="state.walletVisible" />
    <DownloadModal v-model:visible='state.downloadModalVisible' />
  </div>
</template>

<script>
import { defineComponent, ref, provide, computed, watch, reactive, onMounted } from 'vue'
import Header from './components/header.vue'
import LeftSider from './components/left-sider.vue'
import RightSider from './components/right-sider.vue'
import Content from './components/content.vue'
import WalletPane from './components/wallet-pane.vue'
import {toast} from './components/toast'
import MNav from './components/m-nav.vue'
import DownloadModal from './components/download-modal.vue'

export default defineComponent({
  components: {
    Header,
    LeftSider,
    RightSider,
    Content,
    WalletPane,
    MNav,
    DownloadModal
  },
  props: {},
  setup(props) {
    const state = reactive({
      downloadModalVisible: false,
      userInfo: undefined,
      accounts: undefined,
      id: undefined,
      walletVisible: false,
      active: '', // footer , baskatball ...,
      list: []
    })

    // 点击连接钱包
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
        console.log(state.id.substring(0, 3) + '...' + state.id.substring(len-4));
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
      // const abi = JSON.parse(JSON.stringify(ABI.abi))
      // var myContract = new web3.eth.Contract(abi, ADDRESS, {
      //   from: currentAccount, // default from address
      //   gasPrice: `${UNIT*0.001}` // default gas price in wei
      // });
    }

    const handleWalletVisible = () => {
      state.walletVisible = true
    }

    const getAccounts = computed(() => state.accounts)


    provide('accounts', getAccounts)
    const isLink = computed(() => state.accounts?.length)
    provide('ACCOUNTS', {
      accounts: getAccounts,
      id: getAccounts.value?.[0],
      accountHide: addressHide,
      isLink,
      link: handleConnect,

    })

    onMounted(() => {
      init()
      $(window).resize(function () {          //当浏览器大小变化时
        if($('body').width()>959){$('.wapNav').removeClass('wapNavO');$('.wapMenu').slideUp(100);}
      });
    })

    return {
      state,
      handleWalletVisible,
      handleConnect
    }
  }
})
</script>