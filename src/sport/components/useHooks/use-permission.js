import { computed, inject, onMounted } from "vue"
import {abi} from '@/sport/components/web3'
const usePermission = () => {
  const ADDRESS = inject('ADDRESS')
  const ACCOUNTS = inject('ACCOUNTS')
  const CONTRACT = inject('CONTRACT')
  const wallet_addr = computed(() => ACCOUNTS.accounts.value[0])
  // bet_address
  const usdt_address = computed(() => ADDRESS.value.usdt_address)

  const hasPermission = async() => {
    const bonus_addr = usdt_address.value
    console.log(wallet_addr.value, bonus_addr.value, CONTRACT.value.erc_contract.methods.allowance)
    const obj = await CONTRACT.value.erc_contract.methods.allowance(wallet_addr.value, bonus_addr).call()
    if (obj < 1e+28) {
      return false
    } else {
      return true
    }
  }
  const getPermission = async(callback, receipt, error) => {
    // const bet = CONTRACT.value.bet
    // const bonus_addr = ALL_ADDRESS.value.bonus
    // const bet_addr = ALL_ADDRESS.value.bet
    // const wallet_addr = accounts.value[0]
    // const amount = web3.utils.toHex('11579208923731619542357098500')
    // const block = await web3.eth.getBlock("latest")
    
    // const gasLimit = block.gasLimit
    // console.log('gasLimit: ', gasLimit);
    // const obj = bet.methods['approve'](bonus_addr, amount).encodeABI()
    // const gasPrice = await web3.eth.getGasPrice()
    // const params = {
    //   from: wallet_addr,
    //   to: bet_addr,
    //   gasPrice: gasPrice,
    //   gasLimit: 100000,
    //   data: obj,
    //   value: '0x00'
    // }
    // window.web3.eth.sendTransaction(params)
    // .on('transactionHash', (hash) => {
    //   callback && callback(hash, null, null)
    // })
    // .on('receipt', (r) => {
    //   receipt && receipt(null, r, null)
    // })
    // .on('error', (e) => {
    //   error && error(null, null, e)
    // })
  }

  onMounted(() => {
    console.log(CONTRACT.value.erc_contract.methods)
    
  })

  return {
    getPermission,
    hasPermission,
  }
}

export default usePermission