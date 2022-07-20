<template>
  <div
    class="flex justify-center"
    v-if="state.d >= 0 && state.h >= 0 && state.m >= 0"
  >
    <div class="time">
      <div class="leftcolor time_title">{{ state.d }}</div>
      <div class="time-desc">天</div>
    </div>
    <div class="spliteCode">:</div>
    <div class="time">
      <div class="linear-color time_title">{{ state.h }}</div>
      <div class="time-desc">小时</div>
    </div>
    <div class="spliteCode">:</div>
    <div class="time">
      <div class="rightcolor time_title">{{ state.m }}</div>
      <div class="time-desc">分钟</div>
    </div>
  </div>
  <div class="flex justify-center linear-color time_title" v-else>--</div>
</template>

<script>
import { defineComponent, onMounted, onUnmounted, reactive } from "vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default defineComponent({
  components: {},
  props: {
    time: {
      type: [String, Number],
    },
  },
  setup(props) {
    const state = reactive({
      d: 0,
      m: 0,
      h: 0,
      timer: undefined,
    });

    const getTime = () => {
      const D = dayjs(props.time).diff(dayjs(+new Date()), "day");
      const H = dayjs(props.time).diff(
        dayjs(+new Date() + D * 24 * 3600 * 1000),
        "hour"
      );
      const offsetM = D * 24 * 3600 * 1000 + H * 3600 * 1000;
      const m = dayjs(props.time).diff(dayjs(+new Date() + offsetM), "minute");
      return {
        d: D,
        h: H,
        m: m,
      };
    };

    const loop = () => {
      state.timer = setTimeout(() => {
        const t = getTime();
        state.d = t.d;
        state.m = t.m;
        state.h = t.h;
        if (t.d >= 0 && t.m >= 0 && t.h >= 0) {
          loop();
        } else {
          clearTimeout(state.timer);
          state.timer = null;
        }
      }, 1000 * 30);
    };

    onMounted(() => {
      const t = getTime();
      state.d = t.d;
      state.m = t.m;
      state.h = t.h;
      loop();
    });

    onUnmounted(() => {
      clearTimeout(state.timer);
      state.timer = null;
    });
    return {
      state,
    };
  },
});
</script>

<style lang="less" scoped>
.time {
  font-size: 32px;
  font-weight: 600;
  @media (max-width: 1440px) {
    font-size: 26px;
  }
}
.time_title {
  line-height: 32px;
  @media (max-width: 1440px) {
    line-height: 26px;
  }
}
.time-desc {
  font-size: 14px;
  text-align: center;
  color: #6c829d;
  font-weight: 400;
}
.spliteCode {
  font-size: 32px;
  line-height: 32px;
  color: #6c829d;
  margin: 0 12px;
  @media (max-width: 1440px) {
    margin: 0 2px;
    font-size: 24px;
    line-height: 24px;
  }
}
.leftcolor {
  color: var(--primary-main);
}
.rightcolor {
  color: var(--primary-sub);
}
</style>
