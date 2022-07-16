<template>
  <section class="Inddan">
    <div style="margin-bottom: 35px" class="flex items-center">
      <div class="select-wrap flex items-center">
        <div @click="handlePick('0')" class="item" :class="{ sactive: state.act === '0' }">奖励</div>
        <div @click="handlePick('1')" class="item" :class="{ sactive: state.act === '1' }">质押</div>
      </div>
    </div>
    <div class="Huans flex fl-bet">
      <div class="InddanN wow slideInUp" data-wow-duration="1s">
        <div class="desc">投注总额</div>
        <!-- <div class="InddanT"> The current total circulation of tokens</div> -->
        <div class="InddanB flexE">
          <div class="InddanZ flexE InCjs insetTitle">
            <span>70</span>
            832
          </div>
          <div class="InddanD">usdt</div>
        </div>
      </div>
      <div class="InddanN wow slideInUp" data-wow-duration="1.4s">
        <div class="desc">资金池被投注额</div>
        <!-- <div class="InddanT">The total amount of staked tokens currently in circulation</div> -->
        <div class="InddanB flexE">
          <div class="InddanZ flexE InCjs insetTitle">
            <span>70</span>
            832
          </div>
          <div class="InddanD">usdt</div>
        </div>
      </div>
      <div class="InddanN wow slideInUp" data-wow-duration="1.8s">
        <div class="desc">本轮奖励剩余</div>
        <!-- <div class="InddanT">stake rate</div> -->
        <div class="InddanB flexE">
          <div class="InddanZ flexE InCjs insetTitle">
            <span>70</span>
            832
          </div>
          <div class="InddanD">usdt</div>
        </div>
      </div>
    </div>

    <div class="gray">
      <div>本轮每投注1USDT可获得BET Token数量: 0.7</div>
      <div>本轮资金池被1USDT投注可获得BET Token数量: 0.3</div>
    </div>

    <div style="margin-top: 50px">
      <div style="margin-bottom: 8px">BET奖励</div>

      <div class="wrap">
        <div class="flex items-center justify-end">
          这是什么
          <Popover>
            <template #content>
              <p>Bet 奖励说明</p>
            </template>
            <question-circle-outlined style="font-size: 16px; margin-left: 4px" />
          </Popover>
        </div>
        <div class="input-wrap flex items-center justify-between">
          <div class="input">
            0 USDT
          </div>
          <div class="btn-input">
            领取
          </div>
        </div>

        <div style="font-size: 12px; margin-top: 8px; margin-bottom: 24px">本赛季奖励正在统计，即将开放统一领取</div>
        <div class="flex items-center justify-between">
          <div>奖励统计：</div>
          <div style='color: #fff'>USDT 0.0</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { reactive, defineComponent } from 'vue'
  import { QuestionCircleOutlined } from '@ant-design/icons-vue'
  import {Popover} from 'ant-design-vue'

  export default defineComponent({
    components: {
      QuestionCircleOutlined,
      Popover
    },
    setup() {
      const state = reactive({
        act: '0'
      })
      const handlePick = act => {
        state.act = act
      }

      return {
        state,
        handlePick
      }
    }
  })
</script>

<style lang="less" scoped>
  .desc {
    font-size: 16px;
    color: #fcfcfc;
  }
  .insetTitle {
    line-height: 140px;
    @media (min-width: 960px) and(max-width: 1560px) {
      line-height: 110px;
    }
    @media (min-width: 640px) and(max-width: 960px) {
      line-height: 80px;
    }
    @media (min-width: 480px) and(max-width: 640px) {
      line-height: 60px;
    }
    @media screen and (max-width: 480px) {
      line-height: 60px;
    }
  }
  .select-wrap {
    border: 1px solid #999;
    border-radius: 4px;
  }
  .item {
    width: 120px;
    height: 32px;
    color: #999;
    font-size: 15px;
    line-height: 32px;
    text-align: center;
    cursor: pointer;
  }
  .sactive {
    background: #1890ff;
    color: #fff;
  }

  .wrap {
    border-radius: 4px;
    padding: 8px;
    width: 380px;
    background: #24253b;
    color: #8889a0;
    @media screen and (max-width: 420px) {
      width: 100%
    }
  }

  .gray {
    color: #617199;
  }
  .grey {
    color: #849ebf;
  }
  .gray-9 {
    color: #98a8d2;
  }
  .gray-9d {
    color: #9d9ec1;
  }
  .input-wrap {
    background: #363652;
    border-radius: 4px;
    margin-top: 12px;
    overflow: hidden;
  }
  .input {
    padding: 0 16px;
    height: 32px;
    line-height: 32px;
    font-size: 18px;
    font-weight: 500;
    color: #fff;
  }
  .btn-input {
    background: #545472;
    height: 32px;
    line-height: 32px;
    padding: 0 16px;
    color: #fff;
  }
</style>
