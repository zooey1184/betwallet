<template>
  <div class="subTitle trans" :style="{fontSize: state.visible ? '24px' : null}"  :class="{'color-blue': state.visible }">{{title}}</div>
  <div class="desc" v-if='desc' :style="{maxHeight: `${state.height}px`}">
    <div ref='contentRef'>
      <template v-if='typeof desc === "string"'>
        <div class="desc_item" :class="{'desc_item_dot': align==='right'}">{{desc}}</div>
      </template>
      <template v-if='typeof desc === "object"'>
        <div v-for='ii in desc' class="desc_item mb-8" :class="{'desc_item_dot': align==='right'}">{{ii}}</div>
      </template>
    </div>
  </div>
</template>

<script>
import { defineComponent, nextTick, onMounted, reactive, ref, watch } from 'vue'

export default defineComponent({
  components: {},
  props: {
    visible: Boolean,
    desc: {
      type: [String, Array]
    },
    title: String,
    slotName: {
      type: String,
    },
    maxHeight: {
      type: [String]
    },
    align: {
      type: String,
      default: 'right'
    }
  },
  emits: ['update:visible'],
  setup(props, {expose, emit}) {
    const contentRef = ref()
    const state = reactive({
      visible: props.visible,
      height: 0
    })
    watch(() => props.visible, (n) => state.visible = n, {
      immediate: true
    })
    watch(() => state.visible, (n) => {
      emit('update:visible', n)
      if (n) {
        nextTick(() => {
          getRect()
        })
      } else {
        state.height = 0
      }
    }, {
      immediate: true
    })

    const getRect = () => {
      const ref = contentRef.value
      if (ref) {
        const rect = ref.getBoundingClientRect()
        state.height = rect.height
      }
    }

    return {
      state,
      contentRef
    }
  }
})
</script>

<style lang="less" scoped>
.desc {
  max-height: 0;
  transition: all 150ms linear;
  overflow: hidden;
}
.desc_act {
  max-height: 20px;
}
.desc_item_dot {
  &:after {
    content: "";
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 7px;
    background: #fff;
    top: 8px;
    right: 0;
  }
}
.desc_item {
  position: relative;
  padding-right: 18px;
  
}
</style>