import {getConfig} from './api'
import { ABI, ERC_ABI } from './constant'

export const initWeb3 = async (pre, after) => {
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    pre && pre()
    const accounts = await ethereum.request({ method: 'eth_accounts' })
    after && after()
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
      const isLINK = window.localStorage.getItem('isLINK')
      
      if (isLINK && isLINK === 'true') {
        window.localStorage.setItem('isLINK', 'true')
        return {
          isLink: true,
          accounts
        }
      }
      return {
        isLink: false,
        accounts
      }
    } else {
      console.log('未连接');
    }
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  window.web3 = web3
  return {
    web3
  }
}

export const initContract = async() => {
  const res = await getConfig()
  const {bet_address, bonus_address, usdt_address} = res

  const abi = JSON.parse(JSON.stringify(ABI))

  const bonus_contract = new web3.eth.Contract(abi, '0x9e6aA4354A751991F0Bc28AE04eFcC8AD7b0A794');
  const bet_contract = new web3.eth.Contract(ERC_ABI.ERC20_ABI, bet_address);
  const usdt_contract = new web3.eth.Contract(ERC_ABI.ERC20_ABI, usdt_address);

  
  return {
    bonus: bonus_contract,
    bet: bet_contract,
    usdt: usdt_contract,
    bet_address,
    bonus_address,
    usdt_address,
  }
}

export const initInfo = async(address, contract) => {
  // // 用户编码
  // const userNo = await contract.methods.userToNumberMap(address).call()
  
  // // 获取最大提取本金金额  userTotalPledgeAmount[编号]
  // const maxUnStakeAmountFn = contract.methods.userTotalPledgeAmount(userNo).call
  // // 可提取分红
  // const rewardsFn = contract.methods.withdrawBonus(userNo).call
  // // 历史质押金额
  // const historyStakeAmountFn = contract.methods.addUpPledgeAmountMap(userNo).call
  // // 历史提取金额
  // const historyUnStakeAmountFn = contract.methods.addUpWithdrawAmountMap(userNo).call

  // const res = await Promise.all([maxUnStakeAmountFn(), rewardsFn(), historyStakeAmountFn(), historyUnStakeAmountFn()])
  // const [maxUnStakeAmount, rewards, historyStakeAmount, historyUnStakeAmount] = res
  // return {
  //   maxUnStakeAmount: maxUnStakeAmount || 0,
  //   rewards: rewards || 0,
  //   historyStakeAmount: historyStakeAmount || 0,
  //   historyUnStakeAmount: historyUnStakeAmount || 0
  // }

  
  const historyAmount = await contract.methods.userInfo(address).call()
  // 1、可提取分红， getPendingAmount(address _user)
  const canRewardAmount = await contract.methods.getPendingAmount(address).call()

  // allRewardAmount
  const allRewardAmount = historyAmount.addUpWithdrawBonusAmount + canRewardAmount

  // 累计质押总额
  const allStakeAmount = historyAmount.addUpPledgeAmount

  // 累计提取本金总额
  const allUnstakeAmount = historyAmount.addUpWithdrawPrincipal

  // 可提取本金最大额
  const maxUnstakeAmount = historyAmount.amount

  return {
    allRewardAmount,
    allStakeAmount,
    allUnstakeAmount,
    maxUnstakeAmount,
    canRewardAmount,
  }
}

export const getBalance = (account, unit='wei') => { // ether
  return new Promise((res) => {
    web3.eth.getBalance(account, (err, wei) => {
      const balance = web3.utils.fromWei(wei, unit)
      res(balance)
    })
  })
}

export const getBalanceOf = async(contract, account, unit = 'wei') => {
  const res = await contract.methods.balanceOf(account).call()
  return web3.utils.fromWei(res, unit)
}