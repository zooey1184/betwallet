<template>
  <div
    class="flex justify-between"
    v-if="time.d >= 0 && time.h >= 0 && time.m >= 0"
  >
    <div class="time">
      <div class="time_title ff">{{ time.d }}</div>
      <div class="time-desc f1">Days</div>
    </div>
    <div class="spliteCode">:</div>
    <div class="time">
      <div class="time_title ff">{{ time.h }}</div>
      <div class="time-desc f1">Hours</div>
    </div>
    <div class="spliteCode">:</div>
    <div class="time">
      <div class="time_title ff">{{ time.m }}</div>
      <div class="time-desc f1">Minutes</div>
    </div>
  </div>
  <div class="flex justify-center linear-color time_title" v-else>--</div>
  <div>
    <slot></slot>
  </div>
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
      type: Object,
    },
  },
  setup(props) {},
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
  line-height: 48px;
  font-size: 48px;
  @media (min-width: 1000px) and (max-width: 1560px) {
    line-height: 32px;
    font-size: 32px;
  }
  @media screen and (max-width: 1000px) {
    line-height: 26px;
    font-size: 26px;
  }
}
.time-desc {
  font-size: 12px;
  text-align: center;
  color: #6c829d;
  font-weight: 400;
}
.spliteCode {
  font-size: 48px;
  line-height: 40px;
  color: #fff;
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
