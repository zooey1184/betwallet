<template>
  <div class="flexC">
    <a
      href="javascript:;"
      class="IndzhiFa flexC wow slideInUp"
      data-wow-duration="1s"
    >
      <p>How the dividend pool works</p>
      <div class="IndzhiFI IndzhiFI1" @click='handleTogglePane'>
        <img src="../images/icon03.png" />
        <div class="IndzhiFN Huans IndzhiFN1" id="dd">
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
              WEB3BET profit share every dayStake BET to get WEB3BET profit
              share every day
            </p>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  components: {},
  props: {},
  setup(props) {
    const state = reactive({
      visible: false
    })
    const handleTogglePane = () => {
      if (!state.visible) {
        $('#dd').slideDown(400);
      } else {
        $('#dd').slideUp(400);
      }
      state.visible = !state.visible
    };

    return {
      handleTogglePane
    }
  },
});
</script>
