<template>
  <div class="wrap primary-bg pos-r">
    <img
      src="../../images/icons/betItem-bg.png"
      style="width: 100%; position: absolute; z-index: 0; left: -15%; top: 45px"
      alt=""
    />
    <div style="z-index: 1" class="pos-r">
      <div class="win-logo ff active-color" v-if="info.win_amount > 0">WIN</div>
      <div class="lose-title ff" v-if="info.win_amount < 0">LOSE</div>
      <div class="bet-item-header flex items-center">
        <div class="betItemIcon">
          <img
            src="../../images/icons/matchItem-icon-active.png"
            style="width: 20px"
            alt=""
          />
          <!-- <div class="animat-circle"></div> -->
        </div>
        <div class="betTitle gray-9">
          <div class="line-height-12">{{ info.bet_time }}</div>
          <div class="line-height-12" style="margin-top: 2px">
            Total revenue
          </div>
        </div>
      </div>
      <div>
        <div class="ff font-size-18">
          {{ getTeamInfo.win.name }}
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
        <!-- <div class="flex items-center justify-between">
          <div>Bet Amount</div>
          <div class="flex items-center">
            <UsdtIcon class="active-color mr-8 font-size-18" />
            {{ info.bet_amount }}
          </div>
        </div> -->
      </div>
      <div class="flex items-center">
        <img src="../../images/v2/amout-icon.png" class="mr-8" alt="" />
        <span class="active-color font-size-18 ff">{{ info.odds }}</span>
      </div>

      <div class="rightPane">
        <div class="f1 font-size-12 line-height-12 gray">Bet Amount</div>
        <div class="font-size-18 ff gray-9 flex items-center justify-end">
          <UsdtIcon />
          <Tooltip placement='left'>
            <template #title>
              <div>
                <div>Bet Amount</div>
                {{info.bet_amount}}
              </div>
            </template>
            <div class="ellipsis-1 " style="width: 80px" >
              {{ info.bet_amount }}
            </div>
          </Tooltip>
        </div>
        <div class="f1 font-size-12 grey line-height-14">Return</div>
        <div class="flex items-center font-size-18 ff justify-end">
          <UsdtIcon />
          <Tooltip placement='left'>
            <template #title>
              <div>
                <div>Return</div>
                {{info.isSettled ? info.win_amount : (info.bet_amount * info.odds)}}
              </div>
            </template>
            <div v-if="info.isSettled" class="ellipsis-1" style="width: 120px">{{ info.win_amount }}</div>
            <div v-else class="ellipsis-1" style="width: 120px" >{{ info.bet_amount * info.odds }}</div>
          </Tooltip>
        </div>
        <div
          v-if="info.win_amount > 0 && info.is_claimed === '0'"
          class="itembtn ff pos-r active-bg mt-8"
          @click="handleClaim(info)"
        >
          CLAIM
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, inject, reactive } from "vue";
import useMethods from "@/sport/hooks/use-claim";
import usePermission from "@/sport/hooks/use-methods";
import { message, Tooltip } from "ant-design-vue";
import UsdtIcon from "../usdt-icon.vue";

export default defineComponent({
  components: {
    UsdtIcon,
    Tooltip,
  },
  props: {
    info: {
      type: Object,
    },
  },
  setup(props) {
    const state = reactive({});

    const { handleMethods } = useMethods();

    const { getPermission, hasPermission } = usePermission();
    const methods = inject("methods");
    const RESULT = inject("RESULT");

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
            methods.handleGetMatchList();
            RESULT.handleGetResultList();
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
  width: 80px;
  height: 80px;
  border-radius: 50px;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(197, 39, 150);
  transform: rotate(-25deg);
  position: absolute;
  right: 10px;
  top: -34px;
  // position: absolute;
  // right: 10px;
  // right: 8px;
}
.lose-title {
  position: absolute;
  right: 8px;
  font-size: 20px;
}
.itembtn {
  padding: 2px 8px;
  text-align: center;
  outline: none;
  color: #fff;
  font-size: 13px;
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
  font-size: 12px;
  // background: #303b47;
  position: relative;
}
.betTitle {
  font-size: 12px;
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
.rightPane {
  position: absolute;
  right: 0;
  top: 15px;
  text-align: right;
}
.bk {
  word-break: break-all;
}
</style>
