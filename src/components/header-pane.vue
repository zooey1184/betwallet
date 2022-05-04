<template>
  <section class="Indzhi Huans">
    <div class="IndzhiT wow fadeInLeft" data-wow-duration="1s">Stake BET to get WEB3BET profit share every day</div>
    <div class="IndzhiJ wow fadeInLeft" data-wow-duration="1.6s">Dividend pool today</div>
    <div class="IndzhiB flexE wow fadeInLeft" data-wow-duration="3s">
      <div class="IndzhiBP flexE InCjs">{{account}}</div>
      <div class="IndzhiBS">USDT</div>
    </div>
    <div class="IndzhiZ flex wow fadeInRight" data-wow-duration="1.5s">
      <a href="javascript:;" class="IndzhiZa Huans flexC fl-bet"><p>Buy BET</p><i class="IndzhiZ1"></i></a>
      <a href="javascript:;" class="IndzhiZa Huans flexC fl-bet"><p>Add to wallet</p><i class="IndzhiZ2"></i></a>
    </div>	
    <DescriptionDropdown />		
  </section>
</template>

<script>
import { defineComponent, ref } from 'vue'
import DescriptionDropdown from './description-dropdown.vue'

export default defineComponent({
  components: {
    DescriptionDropdown
  },
  props: {
    account: {
      type: [String, Number],
      default: '168.62'
    }
  },
  setup(props) {
    
  }
})
</script>