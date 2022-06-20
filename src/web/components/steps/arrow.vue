<template>
  <div class="arrow">
    <img class="w-100p cursor-pointer" v-if='!disabled && dir==="down"' src="../../assets/arrow-active.png" alt="">
    <img class="w-100p rotate cursor-pointer" v-if='!disabled && dir==="up"' src="../../assets/arrow-active.png" alt="">
    <img class="w-100p cursor-pointer" v-if='disabled && dir==="up"' src="../../assets/arrow-disabled.png" alt="">
    <img class="w-100p rotate cursor-pointer" v-if='disabled && dir==="down"' src="../../assets/arrow-disabled.png" alt="">
    
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {},
  props: {
    dir: {
      type: String,
      default: 'up'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {}
})
</script>

<style lang="less" scoped>
.arrow {
  width: 60px;
  height: 60px;
  overflow: hidden;
}
.rotate {
  transform: rotateZ(180deg);
}
</style>