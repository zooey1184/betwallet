<template>
  <Pc v-if='!isMobile' />
  <Mobile v-else />
</template>

<script>
import { defineComponent, inject, ref } from 'vue'
import Pc from './pc.vue'
import Mobile from './mobile.vue'

export default defineComponent({
  components: {
    Pc,
    Mobile
  },
  props: {},
  setup(props) {
    const isMobile = inject('isMobile')
    return {
      isMobile
    }
  }
})
</script>