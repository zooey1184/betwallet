<template>
  <div>
    <div class="active-color ff mt50 text-align-center">
      IDENTITY
      <div>CONFIRMATION REQUIRED</div>
    </div>
    <div class="mt-8 mb-16 flex justify-center mt50">
      <img style="width: 200px" src="../../images/v2/room-wallet.png" />
    </div>
    <div class="text-align-center mt-24 line-height-18">
      CREATING REQUIRES
      <div>YOU TO VERIFY AUTHENTICATION IN YOUR WALLET</div>
    </div>

    <div class="flex items-center justify-center mt50 m-24">
      <img
        class="spin"
        style="width: 50px"
        src="../../images/v2/room-loading.png"
      />
    </div>
  </div>
</template>

<script>
import { reactive, defineComponent, onMounted } from "vue";
import { message } from "ant-design-vue";
import { TIP } from "@/sport/constant/tip";

export default defineComponent({
  setup(props, { emit }) {
    const state = reactive({});
  },
});
</script>

<style lang="less" scoped>
.title {
  font-size: 22px;
  @media screen and (max-width: 600px) {
    font-size: 15px;
  }
}
.mt50 {
  margin-top: 50px;
  @media screen and (max-width: 600px) {
    margin-top: 24px;
  }
}
.spin {
  animation: loading 3s linear infinite;
}
@keyframes loading {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0);
  }
}
</style>
