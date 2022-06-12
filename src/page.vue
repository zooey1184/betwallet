<template>
  <div>
    <Header v-model:active='state.active' :options="state.sports" @link="handleConnect" />
    <MNav v-model:active='state.active' :options="state.sports" />

    <LeftSider :options='state.sportItemList' v-model:active='state.schedule' />

    <RightSider @walletVisible="handleWalletVisible" />

    <Content />

    <WalletPane v-model:visible="state.walletVisible" />
  </div>
</template>

<script>
import { defineComponent, ref, provide, computed, watch, reactive, onMounted, inject } from 'vue'
import Header from './components/header.vue'
import LeftSider from './components/left-sider.vue'
import RightSider from './components/right-sider.vue'
import Content from './components/content.vue'
import WalletPane from './components/wallet-pane.vue'
import MNav from './components/m-nav.vue'
import InitProvider from './components/init-provider.vue'
import {getSportTournament} from './api'

export default defineComponent({
  components: {
    Header,
    LeftSider,
    RightSider,
    Content,
    WalletPane,
    MNav,
    InitProvider
  },
  props: {},
  setup(props) {
    const state = reactive({
      walletVisible: false,
      active: '', // footer , baskatball ...,
      list: [],
      betType: 'single', // combo
      sports: [],
      sportItemList: [],
      schedule: undefined
    })

    const SPORTS = inject('SPORTS')

    const methods = inject('methods')
    const SPORTS_ITEM_LIST = inject('SPORTS_ITEM_LIST')
    
    watch(() => SPORTS?.value, (n) => {
      console.log(n);
      if (n?.length) {
        state.sports = n
        state.active = n[0].id
      }
    })
    watch(() =>SPORTS_ITEM_LIST.value, (n)=> {
      if (n?.length) {
        state.sportItemList = n
        console.log('===', state.sportItemList);
      }
    })

    watch(() => state.active, (n) => {
      methods.handleGetSportItemList(n)
    })

    

    watch(() => state.schedule, (n) => {
      getSportTournament(n, {
        scheduled: '2022-06-11',
        status: 'closed'
      }).then(res => {
        console.log(res);
      })
    })

    

    const handleWalletVisible = () => {
      state.walletVisible = true
    }
    // 投注方式
    const getBetType = computed(() => state.betType)
    const getBetInfo = computed(() => ({
      betType: state.betType,
      changeBetType: (e) => {
        state.betType = e
      }
    }))
    provide('BET', getBetInfo)

    onMounted(() => {
      $(window).resize(function () {          //当浏览器大小变化时
        if($('body').width()>959){$('.wapNav').removeClass('wapNavO');$('.wapMenu').slideUp(100);}
      });
    })

    return {
      state,
      handleWalletVisible,
    }
  }
})
</script>