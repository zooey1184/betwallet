<template>
  <div class="back01">
	
	<article class="IndBak Huans">
		<section class="ward">
			<HeaderPane :account="state.total_bet_today" />

			<ValueDescription />
		</section>
	</article>	
	<Footer />
</div>
</template>

<script>
import { computed, defineComponent, onMounted, provide, reactive, ref } from 'vue'
import Footer from '../components/footer.vue'
import ValueDescription from '../components/value-description.vue'
import HeaderPane from '../components/header-pane.vue'
import {getBonusInfo} from '../api'
import {message} from 'ant-design-vue'

export default defineComponent({
  components: {
    Footer,
    ValueDescription,
    HeaderPane,
  },
  props: {},
  setup(props) {
    const state = reactive({
      web3: undefined,
      downloadModalVisible: false,
      userInfo: undefined,
      accounts: undefined,
      id: undefined,
      total_bet_today: 0
    })
    

    const getBonusInfoFn = () => {
      getBonusInfo().then(res => {
        const {total_bet_today} = res
        state.total_bet_today = total_bet_today
      })
    }

    onMounted(() => {
      getBonusInfoFn()
    })

    return {
      state,
    }
  }
})
</script>