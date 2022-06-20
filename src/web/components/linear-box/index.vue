<template>
  <div class="content">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {},
  props: {
    fill: {
      type: String,
      default: '#fff'
    }
  },
  setup(props) {
    return {
      fill: props.fill
    }
  }
})
</script>

<style lang="less" scoped>
.content {
  border: 1px solid transparent;
  border-radius: 2px;
  position: relative;
  background-clip: padding-box, border-box;
  color: #fff;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, var(--bg), var(--bg)), linear-gradient(90deg, #8F41E9, #578AEF);
  transition: all 200ms linear;
  cursor: pointer;
  
  // &:before {
  //   content: "";
  //   position: absolute;
  //   width: 100%;
  //   height: 0;
  //   background: linear-gradient(90deg, #8F41E9, #578AEF);
  //   transition: all 100ms linear;
  // }
  &:hover {
    background-image: linear-gradient(to right, var(--bg), var(--bg)), linear-gradient(90deg, #9e75ce, #b5ef57);
    // &:before {
    //   height: 100%;
    // }
  }
  &:active {
    background-image: linear-gradient(to right, #8F41E9, #578AEF), linear-gradient(90deg, #8F41E9, #578AEF);
  }
}
</style>