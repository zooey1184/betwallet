<template>
  <div>
    <div class="info-title active-bg mt-24 flex ff items-center">
      {{ accountHide }}
      <CopyIcon :text="getWalletAddress" />
    </div>
    <div class="m-8 p-16 primary-dark-bg rounded-4">
      <div class="flex items-center f5 justify-between">
        <div class="flex items-center">
          <img
            src="../images/icons/eth.png"
            class="mr-8"
            style="width: 14px"
            alt=""
          />
          ETH
        </div>
        <div class="active-color">{{ getEth }}</div>
      </div>
      <div class="flex items-center f5 mt-16 justify-between">
        <div class="flex items-center">
          <img
            src="../images/icons/USDT.png"
            class="mr-8"
            style="width: 14px"
            alt=""
          />
          USDT
        </div>
        <div class="active-color">{{ getUsdt }}</div>
      </div>
      <div class="flex items-center f5 mt-16 justify-between">
        <div class="flex items-center">
          <img
            src="../images/icons/USDT.png"
            class="mr-8"
            style="width: 14px"
            alt=""
          />
          BET
        </div>
        <div class="active-color">{{ getBet }}</div>
      </div>
    </div>
    <div class="info-title active-bg ff flex items-center" style="left: 0">
      DASHBOARD
      <img
        style="width: 16px"
        class="ml-8"
        src="../images/icons/dashboard.png"
        alt=""
      />
    </div>

    <div class="m-8 p-16 primary-dark-bg rounded-4 flex justify-between">
      <div class="info-itempane primary-bg">
        <div class="circle-wrap" style="margin: 0 auto">
          <img
            src="../images/v2/coin-icon-gray.png"
            style="width: 70px"
            alt=""
          />
        </div>
        <div class="flex items-center mt-16">
          <img src="../images/icons/doc.png" alt="" />
          <div>{{ accountHide }}</div>
        </div>
      </div>
      <div class="info-itempane flex-0 primary-bg"></div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, inject, reactive } from "vue";
import CopyIcon from "@/sport/components/copy";

export default defineComponent({
  components: {
    CopyIcon,
  },
  props: {},
  setup(props) {
    const state = reactive({});
    const ACCOUNTS = inject("ACCOUNTS");

    const accountHide = computed(() => ACCOUNTS.accountHide.value);
    const getWalletAddress = computed(() => ACCOUNTS.accounts.value?.[0]);
    const getEth = computed(() => ACCOUNTS.eth.value);
    const getBet = computed(() => ACCOUNTS.bet.value);
    const getUsdt = computed(() => ACCOUNTS.usdt.value);
    return {
      state,
      accountHide,
      getWalletAddress,
      getEth,
      getBet,
      getUsdt,
    };
  },
});
</script>

<style lang="less" scoped>
.info-title {
  width: 140px;
  padding: 8px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}
.info-itempane {
  height: 150px;
  border-radius: 4px;
  padding: 16px 8px;
  width: 120px;
}
.circle-wrap {
  border-radius: 50px;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
</style>
