<template>
  <!-- <div v-if='useA && !disabled'>
    <img class='w-100p pos-r img-animat' src="../../assets/part1-gif.gif" />
  </div>
  <div v-if='!useA && !disabled'>
    <transition name='fade'>
      <img v-show='state.visible' class='w-100p pos-r' src="../../assets/part1-gif.gif" />
    </transition>
  </div> -->
  <div v-if='disabled'>
    <LazyImg class='pos-r' :src='Logo' :cover='Logo' />
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, nextTick, watch } from 'vue'
// import Logo from '../../assets/part1_gif.gif'
import Logo from '../../assets/v-logo.png'
import LazyImg from '@/web/components/lazy-img'
import Part1Cover from '../../assets/part1_cover.jpg'

export default defineComponent({
  components: {
    LazyImg
  },
  props: {
    useA: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const state = reactive({
      visible: false,
      time: 0
    })

    watch(() => state.visible, (n) => {
      if (n) {
        if (state.time <= 300) {
          setTimeout(() => {
            state.visible = false
          }, 5600)
        }
      } else {
        setTimeout(() => {
          state.visible = true
          state.time++
        }, 1500)
      }
    })

    onMounted(() => {
      nextTick(() => {
        state.visible = true
      })
    })

    return {
      state,
      Logo,
      Part1Cover
    }
  }
})
</script>

<style lang="less" scoped>
.img-animat {
  transform: translate(0);
  animation: fade 6300ms linear infinite 150ms;
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.fade-enter-active {
  transition: opacity 800ms ease;
}

.fade-leave-active {
  transition: opacity 1100ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>