<template>
  <div class="flex justify-center">
          <div class="time">
            <div class="leftcolor time_title">01</div>
            <div class="time-desc">天</div>
          </div>
          <div class="spliteCode">:</div>
          <div class="time">
            <div class="linear-color time_title">20</div>
            <div class="time-desc">小时</div>
          </div>
          <div class="spliteCode">:</div>
          <div class="time">
            <div class="rightcolor time_title">50</div>
            <div class="time-desc">分钟</div>
          </div>
        </div>
</template>

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