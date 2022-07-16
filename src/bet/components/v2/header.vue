<template>
  <section class="Indzhi Huans">
    <div class="IndzhiT wow fadeInLeft" data-wow-duration="1s">BET 奖励</div>
    <div class="IndzhiJ wow fadeInLeft" data-wow-duration="1.6s">创建USDT池或参与投注均可获得</div>
    <div class="IndzhiB flexE wow fadeInLeft" data-wow-duration="3s">
      <div class="IndzhiBP flexE InCjs">BET Token</div>
      <!-- <div class="IndzhiBS">USDT</div> -->
    </div>
    <div class="IndzhiZ flex wow fadeInRight" data-wow-duration="1.5s">
      <a href="javascript:;" class="IndzhiZa Huans flexC fl-bet"><p>Buy BET</p><i class="IndzhiZ1"></i></a>
      <a href="javascript:;" style="border: none" class="IndzhiZa Huans flexC fl-bet"><p>Add to wallet</p><i class="IndzhiZ2"></i></a>
    </div>	
    <!-- <DescriptionDropdown />		 -->
  </section>
</template>

<script>
import { defineComponent, ref } from 'vue'
// import DescriptionDropdown from './description-dropdown.vue'

export default defineComponent({
  components: {
    // DescriptionDropdown
  },
  props: {
    account: {
      type: [String, Number],
      default: '-'
    }
  },
  setup(props) {
    
  }
})
</script>