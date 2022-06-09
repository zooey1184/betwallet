<template>
  <div>
    <div class="bet-item-header flex items-center">
      <div class="betItemIcon"></div>
      <div class="bet-item-title flex items-center">
        <div class="bet-item-left">left</div>
        <span>vs</span>
        <div class="bet-item-right">right</div>
      </div>
      <div>X</div>
    </div>
    <div>
      <div>info</div>
      <div>description</div>
    </div>
    <div>
      <bet-input v-model:value='state.value'>
        <div class="input-title">
          1.02
        </div>
      </bet-input>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, watch } from 'vue'
import betInput from './bet-input.vue'

export default defineComponent({
  components: {
    betInput
  },
  props: {
    value: {
      type: [String, Number],
    }
  },
  emits: ['update:value'],
  setup(props, {emit}) {
    const state = reactive({
      value: props.value
    })
    watch(() => props.value, (n) => {
      state.value = n
    }, {
      immediate: true
    })
    watch(() => state.value, (n) => {
      emit('update:value', n)
    })

    return {
      state
    }
  }
})
</script>

<style lang="less" scoped>
.betItemIcon {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: #303b47;
}
.bet-item-title {
  width: 160px;
  font-size: 14px;
}
.bet-item-left {
  width: 70px;
}
.bet-item-right {
  width: 70px
}
</style>