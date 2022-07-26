<template>
  <div>
    <div class="color-gray font-size-18 font-weight-600">
      正在提交
      <question-circle-outlined class="font-size-16" />
    </div>
    <div class="mt-48 mb-16">
      <Circle>
        <img class="pos-a" style="top: 0; width: 160px; top: 0" src="../../images/zyq0425/zyqTcN01.png" />
      </Circle>
    </div>
    <div class="text-align-center color-gray">Transcation Submitted</div>
    <div class="text-align-center color-link">view on etherscan</div>

    
    <div class="confirmBtn linear-bg mt-48 mb-32">
      关闭
    </div>
  </div>
</template>

<script>
  import { reactive, defineComponent } from 'vue'
  import { QuestionCircleOutlined, LoadingOutlined} from '@ant-design/icons-vue'
  import Circle from './circle.vue'

  export default defineComponent({
    components: {
      QuestionCircleOutlined,
      LoadingOutlined,
      Circle
    },
    setup() {
      const state = reactive({})

      

      return {
        state
      }
    }
  })
</script>


<style lang="less" scoped>
.spin {
	animation: loading 3s linear infinite;
}
@keyframes loading {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
.confirmBtn {
  height: 42px;
  width: 100%;
  text-align: center;
  line-height: 42px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 500;
}
</style>