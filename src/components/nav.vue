<template>
  <div class="nav Huans">
		<a href="javascript:;" class="navclose close" @click='handleClose'><img src="../images/close.png"></a>
		<a href="javascript:;" class="navHead flexC">
			<div class="navHeadI"></div>
			<div class="navHeadP">ID: {{ID}}</div>
			<div class="navHeadJ"><img src="../images/navJiao.png"></div>
		</a>
		<div class="navNk">
			<div class="navTit flexC fl-bet">
				<h3>Your wallet</h3>
				<div class="navTita Huans flexC fl-bet">
					<button class="btn" data-clipboard-action="copy" @click='handleCopy' data-clipboard-target="#target" id="copy_btn"></button>  
					<p id="target">{{ID}}</p> <img src="../images/navEit.png">
					<div class="tips">Copy successful</div>
				</div>
			</div>
			<div class="navNR Huans">
				<div class="navNH flexC">
					<img src="../images/navI01.png">
					<p>ETH</p>
					<div class="navNu">{{getBalance.eth}}</div>
				</div>
				<div class="navNH flexC">
					<img src="../images/navI02.png">
					<p>USDT</p>
					<div class="navNu">{{state.usdt}}</div>
				</div>
				<div class="navNH flexC">
					<img src="../images/navI03.png">
					<p>BET</p>
					<div class="navNu">{{state.bet}}</div>
				</div>
			</div>
			<div class="navTit flexC fl-bet">
				<h3>Stake & Rewards</h3>
			</div>
			<div class="navNR Huans">
				<div class="navNH flexC">
					<p>BET to be claimed</p>
					<div class="navNu">0</div>
				</div>
				<div class="navNH flexC">
					<p>Staked BET</p>
					<div class="navNu">0</div>
				</div>
			</div>
			
			<a href="javascript:;" class="navBut close flexC fl-cen " @click="handleDisconnect">
        <img src="../images/Baekw.png">
        <p>disconnect</p>
      </a>
		</div>
	</div>
</template>


<script>
import { computed, defineComponent, inject, onMounted, reactive, ref, watch } from "vue";


export default defineComponent({
  components: {
    
  },
  props: {
    userInfo: {
      type: Object,
    },
    ID: {
      type: [String, Number]
    },
  },
  setup(props) {
    const state = reactive({
      isLogin: !!props.userInfo,
      visible: false,
      clipboard: undefined,
      eth: 0,
      bet: 0,
      ustd: 0
    });
    const accounts = inject('accounts')
    const CONTRACT = inject('CONTRACT')
    const AMOUNT = inject('AMOUNT')
    const getAmount = computed(() => AMOUNT.value)


    watch(
      () => props.userInfo,
      (n) => {
        if (n) {
          state.isLogin = true;
        }
      }
    );

    const getBalance = computed(() => {
      return {
        eth: getAmount.value?.ethBalance.value
      }
    })

    // watch(() => CONTRACT.value, (n) => {
    //   if (n) {
    //     n.methods.usdt().call().then(e => {
    //       web3.eth.getBalance(e, (err, wei) => {
    //         const balance = web3.utils.fromWei(wei, 'wei')
    //         state.usdt = balance
    //       })
    //     })
    //     n.methods.betCoin().call().then(e => {
    //       web3.eth.getBalance(e, (err, wei) => {
    //         const balance = web3.utils.fromWei(wei, 'wei')
    //         state.bet = balance
    //       })
    //     })
    //   }
    // })

    const haddleToggleVisible = () => {
      state.visible = !state.visible;
    };

    const handleClose = () => {
      $('.TcB').fadeOut(0);
		  $('.nav').removeClass("navO");
    }

    const handleCopy = (e, text) => {
      state.clipboard.on('success', e => {
        $('.tips').show();
        setTimeout(function(){
          $('.tips').hide();
        }, 1000);
      })
    }

    watch(() => accounts.value, (n) => {
      if (n?.length) {
        state.clipboard = new Clipboard('#copy_btn', { text: () => accounts.value?.[0] })
      }
    })

    const handleDisconnect = () => {
      window.localStorage.removeItem('isLINK')
      setTimeout(() => {
        window.location.reload()
      })
    }
    

    return {
      state,
      accounts,
      haddleToggleVisible,
      handleDisconnect,
      handleClose,
      handleCopy,
      getBalance
    };
  },
});
</script>


<style lang="less" scoped>
#copy_target {
  position: absolute;
  opacity: 0;
  z-index: -1;
  width: 0;
  height: 0;
  overflow: hidden;
}
</style>