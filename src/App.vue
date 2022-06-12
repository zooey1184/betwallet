<template>
  <Web3Provider>
    <InitProvider>
      <Page />
    </InitProvider>
  </Web3Provider>
</template>

<script>
import { defineComponent } from 'vue'
import InitProvider from './components/init-provider.vue'
import Page from './page.vue'
import Web3Provider from './components/web3'

export default defineComponent({
  components: {
    InitProvider,
    Page,
    Web3Provider
  },
  setup(props) {
    
  }
})
</script>