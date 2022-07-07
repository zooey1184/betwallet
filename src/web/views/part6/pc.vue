<template>
  <div>
    <div class=" text-align-center">Betweb3 is expanding to more blockchain networks</div>
    <div class="flex justify-center">
      <div class="title-lg linear-color">Multi-chain technology and scaling</div>
    </div>
  </div>

  <div class="flex justify-center">
    <Circle />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Circle from '../../components/circle'

export default defineComponent({
  components: {
    Circle
  },
  props: {},
  setup(props) {}
})
</script>