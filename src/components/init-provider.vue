<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import { computed, defineComponent, onBeforeMount, onMounted, provide, reactive, ref } from 'vue'
import {getSports, getSportList} from '../api'

export default defineComponent({
  setup(props) {
    const state = reactive({
      sportsList: []
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
    

    onBeforeMount(() => {
      handleGetSports()
    })
  }
})
</script>