<template>
  <!-- left -->
  <div class="flex justify-between title_color" style="margin-bottom: 8px">
    <div class="flex items-center">
      <div class="icon"></div>
      <div>{{leftTitle}}</div>
    </div>
    <div>
      <input
        type="text"
        :value="leftValue"
        @click='handlePick("left")'
        class="zyqulNI" 
        :class="{'active': state.active==='left'}"
        readonly
      />
    </div>
  </div>
  <!-- middle -->
  <div class="flex justify-between title_color" style="margin-bottom: 8px" v-if='middleValue'>
    <div class="flex items-center">
      <div class="icon" style="background: transparent"></div>
      <div class="default_color">Draw</div>
    </div>
    <div>
      <input
        type="text"
        :value="middleValue"
        @click='handlePick("middle")'
        class="zyqulNI" 
        :class="{'active': state.active==='middle'}"
        readonly
      />
    </div>
  </div>
  <!-- right -->
  <div class="flex justify-between title_color">
    <div class="flex items-center">
      <div class="icon"></div>
      <div>{{rightTitle}}</div>
    </div>
    <div>
      <input
        type="text"
        :value="rightValue"
        @click='handlePick("right")'
        class="zyqulNI" 
        :class="{'active': state.active==='right'}"
        readonly
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, watch } from 'vue'

export default defineComponent({
  components: {},
  props: {
    leftTitle: {
      type: String,
    },
    leftValue: {
      type: String
    },
    rightTitle: {
      type: String
    },
    rightValue: {
      type: String
    },
    middleValue: {
      type: String
    },
    active: {
      type: [String, Number]
    }
  },
  emits: ['change', 'update:active'],
  setup(props, {emit}) {
    const state  = reactive({
      active: props.active
    })
    watch(() => props.active, (n) => {
      state.active = n
    }, {
      immediate: true
    })
    watch(() => state.active, (n) => {
      emit('update:active', n)
    })
    const handlePick = (e) => {
      if (e === state.active) {
        state.active =''
      } else {
        state.active = e
      }
      emit('change', e)
    }

    return {
      state,
      handlePick
    }
  }
})
</script>

<style lang="less" scoped>
.icon {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: rgba(108,130,157,.4);
  border: 1px solid transparent;
  margin-right: 8px;
}
</style>