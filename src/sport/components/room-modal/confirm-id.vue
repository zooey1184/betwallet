<template>
  <div>
    <div class="color-gray font-size-18 font-weight-600">
      需要确认身份
      <question-circle-outlined class="font-size-16" />
    </div>
    <div class="mt-48 mb-16">
      <Circle>
        <img class="pos-a" style="top: 0; width: 160px; top: 0" src="../../images/zyq0425/zyqTcN01.png" />
      </Circle>
    </div>
    <div class="text-align-center color-gray">您必须前往钱包确认身份验证才能确认创建</div>

    <div class="flex items-center justify-center mt-48 mb-48">
      <img class="spin" src="../../images/zyq0425/zyqTcNs.png">
      <div class="font-size-18 font-weight-600 ml-16">签名请求</div>
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
</style>