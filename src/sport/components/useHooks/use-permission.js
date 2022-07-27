import { computed, inject } from "vue"

const usePermission = () => {
  const ADDRESS = inject('ADDRESS')
  const ACCOUNTS = inject('ACCOUNTS')
  const CONTRACT = inject('CONTRACT')
  const wallet_addr = computed(() => ACCOUNTS.accounts.value[0])
  // bet_address  usdt_address: 下注合约地址
  const usdt_address = computed(() => ADDRESS.value.usdt_address)

  const hasPermission = async() => {
    console.log('permission', usdt_address.value, CONTRACT.value.erc_contract?.methods)
    const amount = web3.utils.toHex('10000000000000000000000000')
    const obj = await CONTRACT.value.erc_contract?.methods?.allowance(wallet_addr.value, ADDRESS.value.bet_address).call()
    console.log('permission: ', obj)
    if (obj < 1e+25) {
      // getPermission()
      return false
    } else {
      
      return true
    }
  }

  const createPool = async(amout) => {
    const AMOUNT = web3.utils.toHex('10000000000000000000000000')
    const obj = CONTRACT.value.erc_contract.methods['approve'](ADDRESS.value.bet_address, AMOUNT).encodeABI()
    const gasPrice = await web3.eth.getGasPrice()
    const t = await CONTRACT.value.football_contract?.methods.createFundPool(amout).call({
      from: wallet_addr.value,
      to: ADDRESS.value.bet_address.value,
      gasPrice: gasPrice,
      gasLimit: 100000,
      data: obj,
      value: '0x00'
    })
    return t
  }
  const getPermission = async({callback, receipt, error}) => {
    const erc_contract = CONTRACT.value.erc_contract
    const amount = web3.utils.toHex('10000000000000000000000000')
    // const block = await web3.eth.getBlock("latest")
    
    // const gasLimit = block.gasLimit
    const obj = erc_contract.methods['approve'](ADDRESS.value.bet_address, amount).encodeABI()
    const gasPrice = await web3.eth.getGasPrice()
    const params = {
      from: wallet_addr.value,
      to: usdt_address.value,
      gasPrice: gasPrice,
      gasLimit: 100000,
      data: obj,
      value: '0x00'
    }
    window.web3.eth.sendTransaction(params)
    .on('transactionHash', (hash) => {
      callback && callback(hash, null, null)
    })
    .on('receipt', (r) => {
      receipt && receipt(null, r, null)
    })
    .on('error', (e) => {
      error && error(null, null, e)
    })
  }
  
  return {
    getPermission,
    hasPermission,
    createPool,
  }
}

export default usePermission