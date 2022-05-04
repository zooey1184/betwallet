<template>
  <div class="IndBetYzDtit flexC fl-end">
    <p>What is this</p>
    <div class="IndzhiFI IndzhiFI2" id="dd2">
      <img src="../images/icon03.png" />
      <div class="IndzhiFN Huans IndzhiFN2">
        <div class="IndzhiFNh">
          <div class="IndzhiFhP flex fl-bet">
            <p>LOOLS APR</p>
            <p>59.83%</p>
          </div>
          <div class="IndzhiFhP flex fl-bet">
            <p>LOOLS APR</p>
            <p>59.83%</p>
          </div>
          <div class="IndzhiFhP flex fl-bet">
            <p>LOOLS APR</p>
            <p>59.83%</p>
          </div>
          <div class="IndzhiFhP flex fl-bet">
            <p>LOOLS APR</p>
            <p>59.83%</p>
          </div>
        </div>
        <div class="IndzhiFNr">
          <h3>Stake to get Whare every day</h3>
          <p>
            Stake BET to getprofit share every dayStake BET to get profit
            sharWEB3BETe every dayStake BET to get WEB3BET profit share every
            day
          </p>
          <p>
            dayStake BET to get WEB3BET profit share every dayStake BET to get
            WEB3BET profit share every dayStake BET to get WEB3BET profit share
            every day
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  components: {},
  props: {},

  setup(props) {
    const state = reactive({
      visible: false,
    });
    const handleTogglePane = () => {
      if (!state.visible) {
        $("#dd2").slideDown(400);
      } else {
        $("#dd2").slideUp(400);
      }
      state.visible = !state.visible;
    };

    return {
      handleTogglePane,
    };
  },
});
</script>
