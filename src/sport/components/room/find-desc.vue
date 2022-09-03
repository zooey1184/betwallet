<template>
  <div class="pc">
    <div class="font-size-12 my-8 text-align-center line-height-16 color-black">
      <div>ENTER THE EIGHT-DIGIT CASINO NUMBER</div>
      <div>AND YOU WILL BE TAKEN TO A PRIVATE</div>
      <div>CASINO WHERE YOU CAN PLACE ANY BETS.</div>
    </div>
    <div class="title font-size-12 text-align-center line-height-16 color-gray">
      <div>EVERY BET WILL BRING A LARGE</div>
      <div>AMOUNT OF TOKEN REWARDS.</div>
    </div>
    <div style="height: 48px"></div>
  </div>

  <div class="mobile">
    <div class="font-size-12 my-8 text-align-center line-height-16 color-black">
      <div>
        ENTER THE EIGHT-DIGIT CASINO NUMBER AND YOU WILL BE TAKEN TO A PRIVATE
        CASINO WHERE YOU CAN PLACE ANY BETS.
      </div>
    </div>
    <div class="title font-size-12 text-align-center line-height-16 color-gray">
      <div>EVERY BET WILL BRING A LARGE AMOUNT OF TOKEN REWARDS.</div>
      <div></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.pc {
  display: block;
  @media screen and (max-width: 700px) {
    display: none;
  }
}

.mobile {
  display: none;
  @media screen and (max-width: 700px) {
    display: block;
  }
}
</style>
