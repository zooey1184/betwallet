<template>
  <a-spin :spinning='state.loading' :delay='500'>
    <slot></slot>
  </a-spin>
</template>

<script>
import { computed, defineComponent, onBeforeMount, onMounted, provide, reactive, ref } from 'vue'
import {getSports, getSportList} from '../api'
import {Spin} from 'ant-design-vue'

export default defineComponent({
  components: {
    'a-spin': Spin
  },
  setup(props) {
    const state = reactive({
      sportsList: [],
      sportsItemList: [],
      loading: false
    })
    const handleGetSports = async() => {
      const res = await getSports()
      const list = res.data
      const _list = []
      const icons = {
        'footerball': 'hdNavI1',
        '足球': 'hdNavI1',
        'soccer': 'hdNavI1',
        'basketball': 'hdNavI2',
        '篮球': 'hdNavI2',
        'Esports': 'hdNavI3',
        '电竞': 'hdNavI3'
      }
      list.forEach(item => {
        _list.push({
          label: item.name,
          value: item.id,
          icon: icons[item.name] || '',
          ...item,
        })
      });
      state.sportsList = _list
    }
    const getSportsList = computed(() => {
      return [...state.sportsList, {
        label: 'official website',
        value: 'website',
        icon: 'hdNavI4'
      }]
    })

    provide('SPORTS', getSportsList)


    const getSportItemListFn = async(id) => {
      state.loading = true
      const {data} = await getSportList(id)
      state.loading = false
      const _data = []
      data.forEach(item => {
        _data.push({
          ...item,
          label: item.name,
          value: item.id,
          icon: 'LeftI1'
        })
      });
      state.sportsItemList = _data
    }
    const getSportItemList = computed(() => state.sportsItemList)
    provide('SPORTS_ITEM_LIST', getSportItemList)

    provide('methods', {
      handleGetSportItemList: getSportItemListFn,
      setLoading: (e) => {
        state.loading = e
      }
    })


    onMounted(() => {
      handleGetSports()
    })

    return {
      state
    }
  }
})
</script>
