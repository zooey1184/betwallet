<template>
  <div>
    <div class="color-gray font-size-18 font-weight-600">
      确认创建
    </div>
    <div class="mt-24 mb-16 color-gray">
      奖池创建后，房主将自动开启所有投注，玩家通过ID识别号进入奖池，如房主将关闭房间，需在点击奖池ID按钮“取消投注”，奖池将不再接受投注，同时完成所有进行的赛事后，通过线上合约结算，资金自动回到地址
    </div>
    <div class="font-size-16 color-gray mt-32 mb-8">创建金额</div>
    <div class="input-wrap flex items-center">
      <input class="flex-1 input" placeholder="请输入金额" />
      <div class="roomConfirm">
        USDT
      </div>
    </div>
    <div class="color-gray mt-8">创建时金额将固定，中途不可增减。</div>


    <div class="confirmBtn linear-bg mt-48 mb-16">
      确认投注
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
.input-wrap {
  border-radius: 4px;
  overflow: hidden;
}
.input {
  background: #37375c;
  padding-left: 8px;
  height: 42px;
  border: none;
  outline: none;
  line-height: 42px;
  font-size: 18px;
}
.roomConfirm {
  padding: 0 24px;
  height: 42px;
  background: #545472;
  text-align: center;
  line-height: 42px;
  font-size: 18px;
  transition: all 300ms linear;
  &:hover {
    background: #1890ff;
    color: #fff;
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