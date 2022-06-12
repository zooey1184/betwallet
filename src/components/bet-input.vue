<template>
  <div style="padding: 8px" class="flex items-center justify-between">
    <div>
      <slot name='title'></slot>
    </div>
    <div v-if='showInput'>
      <input class="bet-input" ref='inputRef' placeholder="Your bet" @focus="handleFocus" @blur="handleBlur" v-model='state.value' />
    </div>
  </div>

  <div class="collapse-wrap flex items-center justify-between" :class="{'collapse-show': state.visible}">
    <div class="collapse-item" :class="{'gutter': index !== 0, 'active': state.value === item.value}" @click="handlePickItem(item)" v-for="(item, index) in options">
      {{item.label}}
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, watch } from 'vue'

export default defineComponent({
  components: {},
  props: {
    value: {
      type: [String, Number]
    },
    options: {
      type: Array,
      default: () => ([
        {
          label: '2500',
          value: '2500'
        },
        {
          label: '2300',
          value: '2300'
        },
        {
          label: '500',
          value: '500'
        }
      ])
    },
    showInput: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:value', 'change'],
  setup(props, {emit}) {
    const inputRef = ref()
    const state = reactive({
      value: props.value,
      visible: false,
      isPickItem: false
    })

    watch(() => props.value, (n) => {
      state.value = n
    }, {
      immediate: true
    })

    watch(() => state.value, (n) => {
      emit('update:value', n)
    })

    const handleFocus = () => {
      console.log('focus');
      state.isPickItem = true
      if (props.options?.length) {
        state.visible = true
      }
    }

    const handlePickItem  = (item) => {
      state.isPickItem = true
      setTimeout(() => {
        state.isPickItem = false
      }, 100)
      state.visible = true
      state.value = item.value
      inputRef.value.focus()
    }

    const handleBlur = () => {
      if (!state.isPickItem) {
        state.visible = false
      }
    }

    return {
      state,
      inputRef,
      handleBlur,
      handleFocus,
      handlePickItem
    }
  }
})
</script>

<style lang="less" scoped>
.collapse-wrap {
  overflow: hidden;
  position: relative;
  max-height: 0;
  padding: 0 6px;
  transition: all 200ms linear;
}
.collapse-item {
  height: 32px;
  text-align: center;
  background: #303b47;
  color: #fff;
  line-height: 32px;
  font-weight: 500;
  font-size: 14px;
  flex-grow: 1;
  cursor: pointer;
  border: 1px solid #303b47;
  border-radius: 4px;
}
.gutter {
  margin-left: 4px;
}
.collapse-show {
  max-height: 38px;
}
.bet-input {
  background: #303b47;
  color: #fff;
  // border: none;
  border: 1px solid #303b47;
  height: 32px;
  border-radius: 4px;
  outline: none;
  text-align: center;
  width: 80px;
  font-weight: 600;
  &:focus {
    border: 1px solid #16bdf9;
  }
}

</style>