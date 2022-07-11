<template>
  <div class="m-item">
    <m-item></m-item>
  </div>
  <div class="p-item">
    <p-item></p-item>
  </div>
</template>

<script>
import {ref, defineComponent} from 'vue'
import MItem from './m-item.vue'
import PItem from './p-item.vue'

export default defineComponent({
  components: {
    'm-item': MItem,
    'p-item': PItem
  },
  setup() {
    
  }
})
</script>

<style lang="less" scoped>
.p-item {
  display: block;
  @media (max-width: 960px) {
    display: none;
  }
}

.m-item {
  display: none;
  @media (max-width: 960px) {
    display: block;
  }
}
</style>