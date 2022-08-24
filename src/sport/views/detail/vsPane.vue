<template>
  <div>
    <div v-if="showTime">
      <div class="countdown text-align-center ff">{{ TIP.countDownStart }}</div>
      <div class="flex items-center justify-center">
        <img
          style="width: 18px"
          class="m-8"
          src="../../images/icons/clock-icon.png"
          alt=""
        />
      </div>
    </div>

    <div class="flex items-center justify-around">
      <div class="home flex items-center justify-center" style="width: 30%">
        <img
          class="h-100p pc-show"
          src="../../images/icons/detailHome-icon.png"
          alt=""
        />
      </div>
      <div class="vsPane flex-0">
        <TimePane :time="timeState" />
        <div class="flex items-center justify-between mobile-show mt-16">
          <img
            src="../../images/icons/detailHome-icon.png"
            alt=""
            style="height: 50px"
          />

          <img
            src="../../images/icons/detailAway-icon.png"
            alt=""
            style="height: 50px"
          />
        </div>
        <div class="flex items-center justify-between mt-8">
          <div>
            <div class="name ff">{{ homeInfo.name }}</div>
          </div>

          <div>
            <div class="name ff">{{ awayInfo.name }}</div>
          </div>
        </div>
        <div class="flex items-center justify-between mt-8">
          <div>
            <div
              style="float: right"
              class="bet-pane ff bg-item"
              @click="handlePickItem('home')"
              :class="{ active: getBetActive === 'home' }"
            >
              {{ homeInfo.odds }}
            </div>
          </div>
          <div class="ff">VS</div>
          <div>
            <div
              class="bet-pane ff bg-item"
              @click="handlePickItem('away')"
              :class="{ active: getBetActive === 'away' }"
            >
              {{ awayInfo.odds }}
            </div>
          </div>
        </div>
      </div>
      <div class="away flex items-center justify-center" style="width: 30%">
        <img
          style="height: 160px"
          class="pc-show"
          src="../../images/icons/detailAway-icon.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, reactive, onMounted } from "vue";
import TimePane from "./timePane.vue";
import useActive from "@/sport/components/useHooks/use-active";
import useTime from "./use-time";
import { TIP } from "@/sport/constant/tip";

export default defineComponent({
  components: {
    TimePane,
  },
  props: {
    leftValue: {
      type: [String, Number],
      default: "1.72",
    },
    time: {
      type: [String, Number],
    },
    oddsId: {
      type: [String, Number],
    },
    homeInfo: {
      type: Object,
    },
    awayInfo: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const params = reactive({
      w: 1920,
      isMobile: false,
    });

    const { timeState, showTime } = useTime(props.time);

    const { getBetActive, state, setState } = useActive(
      props,
      { id: props.oddsId, homeInfo: props.homeInfo, awayInfo: props.awayInfo },
      {
        emit,
      }
    );
    const handlePickItem = (e) => {
      if (state.active === e) {
        // state.active = "";
        setState({ active: "" });
      } else {
        // state.active = e;
        setState({ active: e });
      }
    };
    onMounted(() => {
      const w = window.innerWidth;
      if (w >= 600) {
        params.isMobile = false;
      } else {
        params.isMobile = true;
      }
      console.log(w);
    });

    return {
      state,
      params,
      getBetActive,
      handlePickItem,
      timeState,
      showTime,
      TIP,
    };
  },
});
</script>

<style lang="less" scoped>
.vsPane {
  width: 288px;
}
.countdown {
  font-size: 18px;
  font-weight: 600;
  margin-top: 16px;
}
.bet-pane {
  width: 82px;
  height: 34px;
  line-height: 34px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
  @media (max-width: 1440px) {
    width: 64px;
  }
}
.pc-show {
  display: block;
  @media screen and (max-width: 960px) {
    display: none;
  }
}
.mobile-show {
  display: flex;
  @media screen and (min-width: 960px) {
    display: none;
  }
}
</style>
