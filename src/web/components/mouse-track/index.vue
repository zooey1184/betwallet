<template>
  <div class="inline-block trans" ref='wrapRef' :style="{transform: `translate(${state.x}px, ${state.y}px)`}">
    <slot>

    </slot>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue'

export default defineComponent({
  components: {},
  props: {
    delay: {
      type: Number,
      default: 0
    },
  },
  setup(props) {
    const wrapRef = ref()
    const state = reactive({
      x: 0,
      y: 0,
      h: document.documentElement.clientHeight,
      w: document.documentElement.clientWidth
    })

    const throttleFn = (fn, wait) => {
      let timer = null;
      let timeStamp = +new Date()
      const self = this
      return function (...e) {
        if (+new Date() - timeStamp > wait) {
          timeStamp = + new Date()
          timer = setTimeout(() => {
            fn(...e)
          }, wait)
        }
      }
    }

    const trackPos = (mx, my) => {
      if (wrapRef.value && mx && my) {
        const rect = wrapRef.value.getBoundingClientRect()
        
        let x = 0
        let y = 0
        if (mx-rect.x > 0) {
          if (mx - (rect.x+rect.width) > 0) {
            // 右边
            x= mx - (rect.x+rect.width)
          } else {
            x = 0 // 中间
          }
        } else  {
          x = mx - rect.x
        }

        if (my-rect.y > 0) {
          if (my - (rect.y+rect.height) > 0) {
            // 下边
            y = my - (rect.y+rect.height)
          } else {
            y = 0 // 中间
          }
        } else  {
          y = my - rect.y
        }
        
        state.x = x/20 > 60 ? 60 : x/20
        state.y = y/20 > 60 ? 60 : y/20
      }
    }
    onMounted(() => {
      if (!('ontouchstart' in document)) {
        window.addEventListener('mousemove', throttleFn((e) => {
          trackPos(e.x, e.y)
        }, props.delay))
      }
    })

    return {
      wrapRef,
      state
    }
  }
})
</script>

<style lang="less" scoped>
.a {
  transform: translate();
}
</style>