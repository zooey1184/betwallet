<template>
  <div>
    <div class="color-gray font-size-18 font-weight-600">
      等待确认
      <question-circle-outlined class="font-size-16" />
    </div>
    <div class="mt-48 mb-16">
      <Circle>
        <img class="pos-a" style="top: 0; width: 160px; top: 0" src="../../images/zyq0425/zyqTcN01.png" />
      </Circle>
    </div>
    <div class="text-align-center color-gray">奖池将不再接受投注</div>
    <div class="text-align-center color-gray">同时完成所有进行的赛事后，</div>
    <div class="text-align-center color-gray">通过线上合约结算，资金自动回到地址</div>

    
    <div class="confirmBtn linear-bg mt-16 mb-32">
      确认取消
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