<template>
  <div class="flex lg-show headerPane">
    <div
      class="flex flex-col items-center cursor-pointer justify-center header_item active-bg ff header_active_item"
    >
      <img src="../images/v2/esport.png" class="icon" alt="" />
      <div style="margin-top: 4px">ELECTRONICS</div>
    </div>
    <div
      class="flex flex-col cursor-pointer items-center justify-center header_item"
      @click="handleSoon"
    >
      <Basketball class="font-size-20" />
      <p style="margin-top: 4px">Basketball</p>
    </div>
    <div
      class="flex flex-col items-center cursor-pointer justify-center header_item"
      @click="handleSoon"
    >
      <Football class="font-size-20" />
      <p style="margin-top: 4px">Football</p>
    </div>
  </div>
  <CommingSoon v-model:visible="state.visible" />
</template>

<script>
import { defineComponent, reactive } from "vue";
import Basketball from "@/sport/components/icons/basketball.vue";
import Football from "@/sport/components/icons/football.vue";
import CommingSoon from "../components/commingSoon.vue";

export default defineComponent({
  components: {
    Basketball,
    Football,
    CommingSoon,
  },
  props: {},
  setup(props) {
    const state = reactive({
      visible: false,
    });
    const handleSoon = () => {
      state.visible = true;
    };
    return {
      state,
      handleSoon,
    };
  },
});
</script>

<style lang="less" scoped>
.headerPane {
  height: 80px;
  @media screen and (max-width: 1440px) {
    height: 60px;
  }
}
.lg-show {
  display: none;
  @media screen and (min-width: 1200px) {
    display: flex;
  }
}
.header_item {
  padding: 10px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  font-weight: 600;
  height: 70px;
  width: 110px;
  color: #7c8ba3;
  transition: all 100ms linear;
  font-family: var(--f1);
  &:hover {
    background: #ff00846e;
    color: #fff;
    font-family: var(--ff);
  }
  .icon {
    height: 20px;
  }
  .icon-active {
    height: 32px;
  }
  @media screen and (max-width: 1440px) {
    height: 55px;
  }
}
.header_active_item {
  font-family: var(--ff);
  color: #fff;
}
</style>
