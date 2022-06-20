<template>
  <div class="IndBetWdK">
    <div class="IndBetWd Huans flexC fl-bet">
      <div class="IndBetWdI Huans">Link wallet to View</div>
      <a href="javascript:;" class="hdBut IndBac1" @click='handleConnect'>Link wallet</a>
    </div>
  </div>
  <DownloadModal v-model:visible="state.visible" />
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import DownloadModal from '../downloadModal.vue'

export default defineComponent({
  components: {
    DownloadModal
  },
  props: {},
  setup(props) {
    const state = reactive({
      visible: false
    })
    const handleConnect = () => {
      if (typeof window.ethereum !== 'undefined') {
        if (!state.accounts?.length) {
          ethereum.request({ method: 'eth_requestAccounts' })
          .then(res => {
            window.location.reload()
            window.localStorage.setItem('isLINK', 'true')
          })
          .catch((e) => {
            window.localStorage.setItem('isLINK', 'false')
          });
        } else {
          window.localStorage.setItem('isLINK', 'true')
          window.location.reload()
        }
      } else {
        state.visible = true
      }
    }

    return {
      handleConnect,
      state
    }
  }
})
</script>