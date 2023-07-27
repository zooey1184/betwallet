// 智能合约的方法
import { message } from 'ant-design-vue'
import { computed, inject, reactive } from 'vue'
import { TIP } from '@/sport/constant/tip'

const usePermission = () => {
  const state = reactive({
    createLoading: false,
    permissionLoading: false
  })
  const ADDRESS = inject('ADDRESS')
  const ACCOUNTS = inject('ACCOUNTS')
  const CONTRACT = inject('CONTRACT')
  const UTILS = inject('UTILS')
  const wallet_addr = computed(() => ACCOUNTS.accounts.value[0])
  // bet_address  usdt_address: 下注合约地址
  const usdt_address = computed(() => ADDRESS.value.usdt_address)

  // 是否授权
  const hasPermission = async () => {
    console.log('=====进入授权=====')
    const obj = await CONTRACT.value.erc_contract?.methods
      ?.allowance(wallet_addr.value, ADDRESS.value.bet_address)
      .call()
    console.log(wallet_addr.value, ADDRESS.value.bet_address, '\n', obj, obj > 0 ? '已授权' : '未授权')
    if (obj > 0) {
      return true
    } else {
      return false
    }
  }

  // 创建奖池
  const createPool = async (amout, callback) => {
    state.createLoading = true
    const gasPrice = await web3.eth.getGasPrice()
    // const AMOUNT = web3.utils.toWei(`${amout}`, 'mwei')
    const AMOUNT = UTILS.decimals(amout)
    console.log(AMOUNT, '==========AMOUNT')
    const t = await CONTRACT.value.football_contract?.methods.createFundPool(AMOUNT).encodeABI()
    const params = {
      from: wallet_addr.value,
      to: ADDRESS.value.bet_address,
      gasPrice: gasPrice,
      gasLimit: 1000000,
      data: t,
      value: '0x00'
    }

    window.web3.eth
      .sendTransaction(params)
      .on('transactionHash', hash => {
        setTimeout(() => {
          message.info(TIP.sentT)
          callback && callback(hash, null, null)
        }, 200)
      })
      .on('receipt', r => {
        setTimeout(() => {
          state.createLoading = false
          message.success(TIP.successT)
          callback && callback(null, r, null)
        }, 200)
      })
      .on('error', e => {
        message.error(TIP.failT)
        state.createLoading = false
        callback && callback(null, null, e)
      })
    return t
  }
  // 授权
  const getPermission = async callback => {
    const erc_contract = CONTRACT.value.erc_contract
    const amount = web3.utils.toHex('10000000000000000000000000')
    // const block = await web3.eth.getBlock("latest")
    // const gasLimit = block.gasLimit
    const obj = erc_contract.methods['approve'](ADDRESS.value.bet_address, amount).encodeABI()
    state.permissionLoading = true
    const gasPrice = await web3.eth.getGasPrice()
    const params = {
      from: wallet_addr.value,
      to: usdt_address.value,
      gasPrice: gasPrice,
      gasLimit: 1000000,
      data: obj,
      value: '0x00'
    }
    window.web3.eth
      .sendTransaction(params)
      .on('transactionHash', hash => {
        setTimeout(() => {
          message.info(TIP.sentT)
          callback && callback(hash, null, null)
        }, 200)
      })
      .on('receipt', r => {
        setTimeout(() => {
          state.permissionLoading = false
          message.success(TIP.successT)
          callback && callback(null, r, null)
        }, 200)
      })
      .on('error', e => {
        message.error(TIP.failT)
        state.permissionLoading = false
        callback && callback(null, null, e)
      })
  }
  const createPoolLoading = computed(() => state.createLoading)
  const authLoading = computed(() => state.permissionLoading)

  const handleAuth = async (cb, err) => {
    const _hasPermission = await hasPermission()
    if (_hasPermission) {
      cb && cb()
    } else {
      getPermission(async (h, r, e) => {
        if (r) {
          message.success(TIP.authSuccess)
          cb && cb()
        }
        if (e) {
          err && err()
        }
      })
    }
  }

  return {
    getPermission,
    hasPermission,
    handleAuth,
    createPool,
    createPoolLoading,
    authLoading
  }
}

export const useBet = () => {
  const state = reactive({
    loading: false
  })
  const CONTRACT = inject('CONTRACT')
  const ADDRESS = inject('ADDRESS')
  const ACCOUNTS = inject('ACCOUNTS')
  const wallet_addr = computed(() => ACCOUNTS.accounts.value[0])
  const ROOM = inject('ROOM')

  const handleBet = async (params, callback) => {
    state.loading = true
    const gasPrice = await web3.eth.getGasPrice()
    const { marketId, tenant, amount, betSide, minOdds } = params
    
    const t = await CONTRACT.value.football_contract?.methods
      .bet(marketId, ROOM?.roomAddress?.value, amount, `${betSide}`, `${minOdds}`)
      .encodeABI()
    const PARAMS = {
      from: wallet_addr.value,
      to: ADDRESS.value.bet_address,
      gasPrice: gasPrice,
      gasLimit: 1000000,
      data: t,
      value: '0x00'
    }
    console.log({ marketId, tenant, amount, betSide, minOdds, ...PARAMS })
    window.web3.eth
      .sendTransaction(PARAMS)
      .on('transactionHash', hash => {
        setTimeout(() => {
          message.info(TIP.sentT)
          callback && callback(hash, null, null)
        }, 200)
      })
      .on('receipt', r => {
        setTimeout(() => {
          state.loading = false
          // message.success('Successfully linked')
          callback && callback(null, r, null)
        }, 200)
      })
      .on('error', e => {
        message.error(TIP.failT)
        state.loading = false
        console.log(e)
        callback && callback(null, null, e)
      })
    return t
  }

  const getLoading = computed(() => state.loading)
  return {
    handleBet,
    getLoading
  }
}

export const stopPool = () => {
  const state = reactive({
    loading: false
  })
  const CONTRACT = inject('CONTRACT')
  const ADDRESS = inject('ADDRESS')
  const ACCOUNTS = inject('ACCOUNTS')
  const wallet_addr = computed(() => ACCOUNTS.accounts.value[0])
  const ROOM = inject('ROOM')

  const handleBet = async (params, callback) => {
    state.loading = true
    const gasPrice = await web3.eth.getGasPrice()
    const { marketId, tenant, amount, betSide, minOdds } = params
    console.log(marketId, tenant, amount, betSide, minOdds)

    const t = await CONTRACT.value.football_contract?.methods
      .bet(marketId, ROOM?.roomAddress?.value, amount, `${betSide}`, `${minOdds}`)
      .encodeABI()
    const PARAMS = {
      from: wallet_addr.value,
      to: ADDRESS.value.bet_address,
      gasPrice: gasPrice,
      gasLimit: 1000000,
      data: t,
      value: '0x00'
    }

    window.web3.eth
      .sendTransaction(PARAMS)
      .on('transactionHash', hash => {
        setTimeout(() => {
          message.info(TIP.sentT)
          callback && callback(hash, null, null)
        }, 200)
      })
      .on('receipt', r => {
        setTimeout(() => {
          state.loading = false
          message.success(TIP.successT)
          callback && callback(null, r, null)
        }, 200)
      })
      .on('error', e => {
        message.error(TIP.failT)
        state.loading = false
        console.log(e)
        callback && callback(null, null, e)
      })
    return t
  }

  const getLoading = computed(() => state.loading)
  return {
    handleBet,
    getLoading
  }
}

export default usePermission
