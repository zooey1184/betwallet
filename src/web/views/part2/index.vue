<template>
  <Wrap :delay='500'>
    <template #default='data'>
      <div class="color-white gutter_col">
        <div style="min-height: 50px">
          <h2 :class="{fadein: data.show[1]}" class="fadeout title-lg pos-r linear-color text-align-center">Creating new sports betting experiences on Web3.0</h2>
        </div>
        
        <div class="fadeout" :class="{fadein: data.show[2]}">
          <p class="text-align-center mt-32 desc line-height-24">Betweb2.0's online sports betting market is already huge and mature. Nonetheless, with the advent of Betweb3.0, we are starting to see many drawbacks to traditional online sports betting platforms. </p>
          <p class="text-align-center desc line-height-24">Betweb3 creates the cleanest user experience, allowing users to connect their wallet to complete USDT betting and all interactive experience.</p>
        </div>
        
        <div style="height: 34vw" class="bg-gray-20 mt-48 flex items-center justify-center">
          Video
        </div>
      </div>
    </template>
  </Wrap>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Wrap from '@/web/components/wrap'

export default defineComponent({
  components: {
    Wrap
  },
  props: {},
  setup(props) {}
})
</script>

<style lang="less" scoped>
.fadeout {
  opacity: 0;
  transform: translateY(50px);
  transition: all 1000ms linear;
}
.fadein {
  opacity: 1;
  transform: translateY(0);
}
</style>