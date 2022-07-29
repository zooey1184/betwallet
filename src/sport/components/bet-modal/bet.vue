<template>
  <div>
    <div
      class="active-color mt-24 font-size-20 font-weight-600 text-align-center"
    >
      PLACE BET
    </div>
    <div class="text-align-center my-16">BET</div>
    <div
      class="active-color flex items-center justify-between font-weight-600"
      style="font-size: 48px"
    >
      <div>$1000</div>
      <div>USDT</div>
    </div>
    <div class="active-color mt-8">
      <div class="line-height-16">2022-03-27 5:00</div>
      <div class="font-size-32 font-weight-600 line-height-32">CHN 3:0 FRA</div>
      <div class="line-height-16">PSG.LGD VS TEAM</div>
    </div>
    <div class="bet-pane primary-bg mt-8">
      <div class="flex items-center justify-between mb-8">
        <div>YOUR BET</div>
        <div>$1000000</div>
      </div>
      <div class="flex items-center justify-between mb-8">
        <div>POTENTIAL ODDS</div>
        <div>1.17</div>
      </div>
      <div class="flex items-center justify-between">
        <div>POTENTIAL WIN</div>
        <div class="active-color">117</div>
      </div>
    </div>
    <div class="mt-16 font-size-12 line-height-16">
      THE ODDS WILL BE ESTIMATED AND YOU WILL PLACE BETS WITH A MINIMUM OF XX
      (RELATED TO SLIPPAGE) AND A MAXIMUM OF XX. MINIMUM WIN IS XXX, MAXIMUM WIN
      IS XXX. THE BET WILL AUTOMATICALLY BE CANCELED IF SLIPPAGE BEYOND ITS
      RANGE
    </div>
    <div class="confirmBtn">PLACE BET</div>
  </div>
</template>

<style lang="less" scoped>
.bet-pane {
  border-radius: 8px;
  padding: 8px 16px;
  color: #fff;
}
.confirmBtn {
  font-size: 16px;
  font-weight: 600;
  height: 38px;
  line-height: 38px;
  background: var(--primary-main);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  margin-top: 24px;
  color: #fff;
  margin-bottom: 16px;
  &:active {
    opacity: 0.8;
  }
}
</style>
