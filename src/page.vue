<template>
  <div>
    <Header v-model:active='state.active' :options="state.sports" @link="handleConnect" />
    <MNav v-model:active='state.active' :options="state.sports" />

    <LeftSider :options='state.sportItemList' v-model:active='state.schedule' />

    <RightSider @walletVisible="handleWalletVisible" />

    <Content />

    <WalletPane v-model:visible="state.walletVisible" />

    <BetModal v-model:visible='state.visible' />
  </div>
</template>

<script>
import { defineComponent, ref, provide, computed, watch, reactive, onMounted, inject } from 'vue'
import Header from './components/header.vue'
import LeftSider from './components/left-sider.vue'
import RightSider from './components/right-sider/index.vue'
import Content from './components/content.vue'
import WalletPane from './components/wallet-pane.vue'
import MNav from './components/m-nav.vue'
import InitProvider from './components/init-provider.vue'
import {getSportTournament} from './api'
import { message } from 'ant-design-vue'
import BetModal from './components/transaction'

export default defineComponent({
  components: {
    Header,
    LeftSider,
    RightSider,
    Content,
    WalletPane,
    MNav,
    InitProvider,
    BetModal
  },
  props: {},
  setup(props) {
    const state = reactive({
      walletVisible: false,
      active: '', // footer , baskatball ...,
      sports: [],
      sportItemList: [],
      schedule: undefined,
      scheduleList: [],
      visible: false
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
      }
    })

    watch(() => state.active, (n) => {
      if (n === 'website') {
        // window.open('')
        message.info('这个是要跳转的链接')
      } else {
        methods.handleGetSportItemList(n)
      }
    })

    

    watch(() => state.schedule, (n) => {
      getSportTournament(n, {
        // scheduled: '2022-06-11',
        status: 'not_started'
      }).then(res => {
        if (res.data) {
          state.scheduleList = res.data
        }
      })
    })
    const getSchedule = computed(() => state.schedule)
    const getScheduleItem = computed(() => {
      const val = state.schedule
      const list = state.sportItemList
      const item = list.find(ii => ii.id === val)
      return item
    })
    const getScheduleList = computed(() => state.scheduleList)

    provide('SCHEDULE', {
      getSchedule,
      getScheduleList,
      getScheduleItem,
    })
    // provide('BET_MODAL', {
    //   visible: (n) => {
    //     state.visible = n
    //   }
    // })

    

    const handleWalletVisible = () => {
      state.walletVisible = true
    }
    return {
      state,
      handleWalletVisible,
    }
  }
})
</script>