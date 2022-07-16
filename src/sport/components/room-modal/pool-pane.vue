<template>
  <div>
    <div class="color-gray font-size-18 font-weight-600">奖池赛事</div>
    <div class="color-gray mt-16">奖池所有资金</div>
    <div class="flex mt-8" style="align-items: end">
      <div style="font-size: 28px; line-height: 28px; margin-right: 4px">$10000</div>
      <div class="font-size-14">(USDT)</div>
    </div>

    <div class="flex items-center justify-between my-24">
      <div
        class="roombtn"
        :class="{ ' linear-bg': state.active === '0' }"
        @click="handlePick('0')"
        :style="{ border: state.active === '1' ? '1px solid #999' : 'none' }"
      >
        赛事进行中
      </div>
      <div
        class="roombtn"
        :class="{ ' linear-bg': state.active === '1' }"
        @click="handlePick('1')"
        :style="{ border: state.active === '0' ? '1px solid #999' : 'none' }"
      >
        历史赛事
      </div>
    </div>
    <div class="content scrollbar overflow-auto bg">
      <div class="gray-9 font-size-14" v-for="item in 10">
        <div class="flex items-center">
          <div style="width: 40%">EDG VS LGD</div>
          <div style="width: 20%" class="text-align-center">1.17</div>
          <div style="width: 40%" class="text-align-right">11.06 5:00AM</div>
        </div>
        
        <div class="flex items-center justify-between">
          <div class="color-blue">投注金额</div>
          <div>800 USDT</div>
        </div>
      </div>
    </div>

    <div class="confirmBtn linear-bg mt-16 mb-8">取消投注</div>
  </div>
</template>

<script>
  import { reactive, defineComponent } from 'vue'
  import { QuestionCircleOutlined, LoadingOutlined } from '@ant-design/icons-vue'
  import Circle from './circle.vue'

  export default defineComponent({
    components: {
      QuestionCircleOutlined,
      LoadingOutlined,
      Circle
    },
    setup() {
      const state = reactive({
        active: '0'
      })

      const handlePick = e => {
        state.active = e
      }

      return {
        state,
        handlePick
      }
    }
  })
</script>

<style lang="less" scoped>
  .roombtn {
    height: 42px;
    border-radius: 50px;
    line-height: 42px;
    text-align: center;
    width: 45%;
    border: 1px solid #eee;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
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
  .content {
    max-height: 250px;
    padding: 8px;
    border-radius: 8px;
  }
</style>
