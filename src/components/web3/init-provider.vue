<template>
  <div>
    <slot></slot>
  </div>
  <DownloadModal v-model:visible='state.downloadModalVisible' />
</template>

<script>
import { defineComponent, reactive, ref, provide, computed, watch } from 'vue'
import DownloadModal from '../download-modal.vue'

export default defineComponent({
  components: {
    DownloadModal
  },
  props: {},
  setup(props) {
    const state = reactive({
      accounts: undefined,
      id: undefined,
      downloadModalVisible: false,
      userInfo: undefined,
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
        return state.id.substring(0, 3) + '...' + state.id.substring(len-4)
      }
      return '**'
    })
    const isLink = computed(() => state.accounts?.length)
    const getAccounts = computed(() => state.accounts)

    provide('accounts', getAccounts)
    
    provide('ACCOUNTS', {
      accounts: getAccounts,
      id: getAccounts.value?.[0],
      accountHide: addressHide,
      isLink,
      link: handleConnect,
    })

    const init =  async () => {
      if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
        const accounts = await ethereum.request({ method: 'eth_accounts' })
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
          // TODO 初始化合约
          if (isLINK && isLINK === 'true') {
            state.userInfo = {
              _accounts: accounts
            }
            window.localStorage.setItem('isLINK', 'true')
            // TODO 获取余额
          }
        } else {
          console.log('未连接');
        }
      } else {
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      }
    }

    return {
      state
    }
  }
})
</script>