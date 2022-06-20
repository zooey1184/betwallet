<template>
  <div>
    <div class="text-align-center mb-8">Betweb3 is expanding to more blockchain networks</div>
    <div class="flex justify-center">
      <div class="title-lg linear-color text-align-center">Multi-chain technology and scaling</div>
    </div>
  </div>

  <div class="flex justify-center">
    <Circle :radius="300" :perRadius="35" :initR="20" :imgRadius="17" />
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