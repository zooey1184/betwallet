<template>
  <div ref="wrapRef">
    <div class="hidden">
      <div ref='contentRef' class="pos-r">
        <slot name='hide'></slot>
      </div>
    </div>
    <slot v-bind='state.rect'></slot>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, nextTick } from 'vue'

export default defineComponent({
  components: {},
  props: {},
  setup(props) {
    const wrapRef = ref()
    const contentRef = ref()
    const state = reactive({
      rect: {}
    })

    onMounted(() => {
      setTimeout(() => {
        const r = contentRef.value
        if (r) {
          const rect = r.getBoundingClientRect()
          state.rect = rect
          console.log(rect)
        }
      }, 200)
    })

    return {
      wrapRef,
      state,
      contentRef
    }
  }
})
</script>

<style lang="less" scoped>
.hidden {
  position: absolute;
  overflow: hidden;
  z-index: -1;
  opacity: 0;
  width: 1px;
  height: 1px;
}
</style>