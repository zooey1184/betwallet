<template>
  <slot></slot>
</template>

<script>
import { computed, defineComponent, provide, reactive, ref } from 'vue'

export default defineComponent({
  components: {},
  props: {},
  setup(props) {
    const state = reactive({
      betList: [],
      betMap: {}
    })

    const getBetList = computed(() => {
      const map = state.betMap
      const list = []
      // item => {active, activeValue, data}
      for(let i in map) {
        if (map[i]?.active) {
          list.push(map[i])
        }
      }
      return list
    })
    const getBetMap = computed(() => state.betMap)
    const handleDeleteItem = (item) => {
      const id = item?.data?.id
      if (id && state.betMap?.[id]) {
        state.betMap[id] = undefined
      }
    }

    provide('SPORT_BET', {
      getBetList: getBetList,
      getBetMap,
      getMap: () => {
        return state.betMap
      },
      setMap: (cb) => {
        cb && typeof cb === 'function' && cb(state.betMap)
      },
      addItem: (item) => {
        state.betList.push(item)
      },
      clear: () => {
        state.betMap = {}
      },
      delete: (item) => {
        handleDeleteItem(item)
      }
    })
  }
})
</script>