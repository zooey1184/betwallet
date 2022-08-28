<template>
  <section class="Inddan">
    <div style="margin-bottom: 35px" class="flex items-center">
      <div class="select-wrap active-border flex items-center">
        <div
          @click="handlePick('0')"
          class="item"
          :class="{ sactive: state.act === '0' }"
        >
          Rewards
        </div>
        <div class="item" :class="{ sactive: state.act === '1' }">Staking</div>
      </div>
    </div>
    <div class="Huans betPageNumItem flex fl-bet">
      <div class="InddanN wow slideInUp" data-wow-duration="1s">
        <div class="desc">your bets amount</div>
        <div class="InddanB flexE">
          <div class="InddanZ ff flex items-end insetTitle active-color">
            <span>{{ getTotalBetC[0] }}</span>
            <div style="line-height: 1.9">{{ getTotalBetC[1] }}</div>
          </div>
          <div class="InddanD f1">usdt</div>
        </div>
      </div>
      <div class="InddanN wow slideInUp" data-wow-duration="1.4s">
        <div class="desc">bets in your pool</div>
        <div class="InddanB flexE">
          <div class="InddanZ ff flex items-end insetTitle active-color">
            <span>{{ getPoolsCalc[0] }}</span>
            <div style="line-height: 1.9">{{ getPoolsCalc[1] }}</div>
          </div>
          <div class="InddanD f1">usdt</div>
        </div>
      </div>
      <div class="InddanN wow slideInUp" data-wow-duration="1.8s">
        <div class="desc">BET remain this round</div>
        <div class="InddanB flexE">
          <div class="InddanZ ff flex items-end insetTitle active-color">
            <span>{{ getRewardCalc[0] }}</span>
            <div style="line-height: 1.9">{{ getRewardCalc[1] }}</div>
          </div>
          <div class="InddanD f1">BET</div>
        </div>
      </div>
    </div>

    <div class="gray-9">
      <div>BET Token available per bet of 1USDT this round: 0.8</div>
      <div>
        BET Token available for each USDT bet in the pool this round: 0.2
      </div>
    </div>

    <div style="margin-top: 50px">
      <div style="margin-bottom: 8px">BET Rewards</div>

      <div class="wrap">
        <!-- <div class="flex items-center justify-end">
          这是什么
          <Popover>
            <template #content>
              <p>Bet 奖励说明</p>
            </template>
            <question-circle-outlined
              style="font-size: 16px; margin-left: 4px"
            />
          </Popover>
        </div> -->
        <div class="input-wrap flex items-center justify-between">
          <div class="input">{{ getRemindBet.left }} BET</div>
          <div class="btn-input">CLAIM</div>
        </div>

        <div class="mb-16 mt-8 font-size-12">
          Unified claim will be opened soon
        </div>
        <div class="flex items-center gray-5 justify-between">
          <div>Total Reward:</div>
          <div class="f5 color-white">BET {{ getRemindBet.all }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { reactive, defineComponent, inject, computed, watch } from "vue";
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import { Popover } from "ant-design-vue";

export default defineComponent({
  components: {
    QuestionCircleOutlined,
    Popover,
  },
  setup() {
    const state = reactive({
      act: "0",
    });
    const RESULT = inject("RESULT");
    const POOLS = inject("POOLS");

    const getTotalBet = computed(() => RESULT?.totalBet?.value || 0);
    const getPools = computed(() => POOLS.pools?.value);
    const getRewards = computed(() => POOLS.rewards?.value);

    const handleChangeUnit = (amount, t, unit) => {
      const a = parseFloat(
        (parseFloat(amount) / parseInt(t)).toFixed(2)
      )?.toString();
      return [a.substr(0, 2), `${a.substr(2)}(${unit})`];
    };

    const handleDealNum = (amount) => {
      const str = amount?.toString();
      if (str.length > 9) {
        return handleChangeUnit(str, 1e9, "b");
      }
      if (str.length > 6) {
        return handleChangeUnit(str, 1e6, "m");
      }
      if (str?.length > 3) {
        if (str.length > 5) {
          return handleChangeUnit(str, 1000, "k");
        } else {
          return [str.substr(0, 2), str.substr(2)];
        }
      } else {
        return [str, ""];
      }
    };

    const getTotalBetC = computed(() => {
      if (getTotalBet.value) {
        return handleDealNum(getTotalBet.value);
      }
      return ["0", ""];
    });

    const getPoolsCalc = computed(() => {
      if (getPools?.value?.initAmount) {
        const val = getPools.value;
        const init = web3.utils.fromWei(`${val.initAmount}`, "mwei") || 0;
        const bet = web3.utils.fromWei(`${val.betTotalAmount}`, "mwei") || 0;
        const pay = web3.utils.fromWei(`${val.payForTotalAmount}`, "mwei") || 0;

        const t = parseInt(init) + parseInt(bet) - parseInt(pay);
        return handleDealNum(t);
      }
      return ["0", ""];
    });

    const getRewardCalc = computed(() => {
      const val = getRewards.value;
      if (val && val?.totalRewards) {
        const claim = web3.utils.fromWei(`${val.totalClaimed}`, "ether") || 0;
        const Reward = web3.utils.fromWei(`${val.totalRewards}`, "ether") || 0;
        const t = parseFloat(Reward) - parseFloat(claim);
        return handleDealNum(t);
      } else {
        return ["0", ""];
      }
    });

    const getRemindBet = computed(() => {
      const val = getRewards?.value;
      if (val && val?.totalRewards) {
        const claim = web3.utils.fromWei(`${val.totalClaimed}`, "ether") || 0;
        const Reward = web3.utils.fromWei(`${val.totalRewards}`, "ether") || 0;
        const left = parseFloat(Reward) - parseFloat(claim);
        return {
          total: parseFloat(Reward),
          left: left,
        };
      } else {
        return {
          total: 0,
          left: 0,
        };
      }
    });

    const handlePick = (act) => {
      state.act = act;
    };

    return {
      state,
      handlePick,
      getTotalBet,
      getPools,
      getRewards,
      getTotalBetC,
      getPoolsCalc,
      getRewardCalc,
      getRemindBet,
    };
  },
});
</script>

<style lang="less" scoped>
.desc {
  font-size: 16px;
  color: #fcfcfc;
  line-height: 1.2;
  height: 32px;
  color: #545472;
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
  background: var(--primary-main);
  color: #fff;
}

.wrap {
  border-radius: 4px;
  padding: 16px;
  width: 380px;
  background: #24253b;
  color: #8889a0;
  @media screen and (max-width: 420px) {
    width: 100%;
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
.betPageNumItem {
  @media screen and (max-width: 600px) {
    display: block;
  }
}
</style>
