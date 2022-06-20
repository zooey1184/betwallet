<template>
  <div ref='wrap' class="pos-r">
    <slot v-bind='{visible: state.visible, show: showList}'></slot>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, watch, inject, computed, nextTick, onMounted } from 'vue'


export default defineComponent({
  components: {},
  props: {
    vLen: {
      type: Number,
      default: 15
    },
    once: {
      type: Boolean,
      default: true
    },
    delay: {
      type: Number,
      default: 0
    },
    offset: {
      type: Number,
      default: 300
    }
  },
  setup(props) {
    const scrollTop = inject('scrollTop')
    const wrap = ref()
    const state = reactive({
      visible: false,
      account: 0
    })

    const showList = reactive({})

    

    const setVisibleList = (flag, time=400, i = 0) => {
      const len = props.vLen
      if (i<len) {
        setTimeout(() => {
          showList[i] = flag
          i++
          setVisibleList(flag, time, i)
        }, time)
      }
    }

    watch(() => scrollTop.value, (n) => {
      nextTick(() => {
        const wrapRef = wrap.value
        if (wrapRef) {
          const rect = wrapRef.getBoundingClientRect()
          const H = document.documentElement.clientHeight
          const OFFSET_Y = props.offset
          if (rect.y-H<OFFSET_Y && rect.y + rect.height + OFFSET_Y > 0 ) {
            setTimeout(() => {
              setVisibleList(true)
              setTimeout(() => {
                state.visible = true
              }, 200)
            }, props.delay)
          } else {
            if (!props.once) {
              state.visible = false
              setVisibleList(false, 100)
            }
          }
        }
      })
    }, {
      immediate: true
    })

    onMounted(() => {
      const len = props.vLen
      for(let i=0; i<len; i++) {
        showList[i] = false
      }
    })

    return {
      wrap,
      state,
      showList,
    }
  }
})
</script>