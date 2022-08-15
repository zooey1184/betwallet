<template>
  <div class="wrap primary-bg">
    <div class="win-logo ff active-color" v-if="info.win_amount > 0">WIN</div>
    <div class="win-logo ff" v-if="info.win_amount < 0">LOSE</div>
    <div class="bet-item-header flex items-center">
      <div class="betItemIcon">
        <div class="animat-circle"></div>
      </div>
      <div class="bet-item-title flex items-center">
        <div class="bet-item-left item" :title="getTeamInfo.home.name">
          {{ getTeamInfo.home.name }}
        </div>
        <span style="margin: 0 2px; line-height: 14px">vs</span>
        <div class="bet-item-right item" :title="getTeamInfo.away.name">
          {{ getTeamInfo.away.name }}
        </div>
      </div>
    </div>
    <div>
      <div class="ff font-size-18">
        {{ getTeamInfo.win.name }}
      </div>
      <div class="flex items-center justify-between">
        <div>Bet Amount</div>
        <div class="flex items-center">
          <img src="../../images/v2/coin-icon-grey.png" alt="" />
          {{ info.bet_amount }}
        </div>
      </div>
    </div>
    <div class="flex">
      <div>odds : {{ info.odds }}</div>
    </div>
    <div v-if="info.win_amount">Amount: {{ info.win_amount }}</div>

    <div
      v-if="info.win_amount > 0 && info.is_claimed === '0'"
      class="itembtn pos-r active-bg mt-8"
      @click="handleClaim(info)"
    >
      CLAIM
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive } from "vue";
import useMethods from "@/sport/hooks/use-claim";
import usePermission from "@/sport/hooks/use-methods";
import { message } from "ant-design-vue";
export default defineComponent({
  components: {},
  props: {
    info: {
      type: Object,
    },
  },
  setup(props) {
    const state = reactive({});

    const { handleMethods } = useMethods();

    const { getPermission, hasPermission } = usePermission();

    const getTeamInfo = computed(() => {
      const list = props.info?.selections;

      const home = list?.find((item) => item.type === "home") || {};
      const away = list?.find((item) => item.type === "away") || {};
      const bet_side = props.info.bet_side;
      // const side = bet_side === '0' ? 'home' : bet_side === '1' : 'away' : 'draw'
      const win =
        bet_side === "0" ? home : bet_side === "1" ? away : { name: "DRAW" };
      return {
        home,
        away,
        win,
      };
    });

    const handleClaim = async (item) => {
      const _hasPermission = await hasPermission();
      handleMethods({
        name: "claim",
        params: [item.market_id, item.bet_id],
        callback: (h, r, e) => {
          if (r) {
            message.success("success");
          }
          if (e) {
            console.log(e);
          }
        },
      });
    };
    return {
      state,
      handleClaim,
      getTeamInfo,
    };
  },
});
</script>

<style lang="less" scoped>
.wrap {
  padding: 16px;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  // height: 136px;
}
.win-logo {
  // width: 80px;
  // height: 80px;
  // border-radius: 50px;
  // font-size: 30px;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // color: rgb(197, 39, 150);
  // border: 2px solid #999;
  // transform: rotate(-40deg);
  // position: absolute;
  // right: -10px;
  // top: -20px;
  position: absolute;
  right: 10px;
  right: 8px;
}
.itembtn {
  width: 80px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  outline: none;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
}

.animat-circle {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 10px;
  background: rgba(234, 54, 54, 0.329);
  border: 1px solid #c40404;
  animation: bonce 2s linear 100ms infinite;
  bottom: -2px;
  right: -2px;
}
@keyframes bonce {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
.bet-wrap {
  margin: 4px;
  background: #1b222c;
  padding: 8px;
  border-radius: 8px;
  color: #6d819c;
  font-size: 13px;
}
.betItemIcon {
  width: 22px;
  height: 22px;
  border-radius: 4px;
  margin-right: 8px;
  background: #303b47;
  position: relative;
}
.bet-item-title {
  width: 76%;
}
.title {
  font-size: 14px;
  margin-top: 4px;
  color: #fff;
}
.desc {
  font-size: 13px;
}
.item {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 14px;
  width: 60px;
  font-size: 12px;
}
.input-title {
  color: #16bdf9;
  font-size: 14px;
  font-weight: 600;
}
</style>
