<template>
  <div style="width: 60%; min-width: 300px; margin: 0 auto">
    <div
      class="n-item header_active_item active-bg"
      @click="handleSport('electronics')"
    >
      <img src="../images/v2/esport.png" style="height: 40px" alt="" />
      Esports
    </div>
    <div class="n-item header_active_item" @click="handleSport('basketball')">
      <img src="../images/v2/basketball.png" style="height: 40px" alt="" />
      <p class="font-weight-400 text-color">Basketball</p>
    </div>
    <div class="n-item header_active_item" @click="handleSport('football')">
      <img src="../images/v2/football.png" style="height: 40px" alt="" />
      <p class="font-weight-400 text-color">Football</p>
    </div>

    <div class="mt-24 text-align-center">
      <RoomBtn />
    </div>

    <div class="mt-48">
      <div v-if="isLink">
        <InfoBtn :address="getAccounts" />
      </div>
      <div v-else class="start active-bg" @click="handleConnect">WALLET</div>
    </div>
    <div class="close-icon">
      <CloseCircleOutlined
        style="font-size: 24px"
        @click="handleCloseNavMask"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, inject, computed } from "vue";
import { CloseCircleOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import InfoBtn from "./info-btn.vue";
import RoomBtn from "@/sport/components/room/room-btn.vue";
import { TIP } from "@/sport/constant/tip";

export default defineComponent({
  components: {
    CloseCircleOutlined,
    InfoBtn,
    RoomBtn,
  },
  props: {},
  emits: ["close"],
  setup(props, { emit }) {
    const state = reactive({});
    const ACCOUNTS = inject("ACCOUNTS");
    const getAccounts = computed(() => ACCOUNTS.accountHide.value);
    const isLink = computed(() => {
      return ACCOUNTS.isLink.value;
    });
    const handleCloseNavMask = () => {
      emit("close");
    };

    const handleSport = (e) => {
      if (e !== "electronics") {
        message.info(TIP.commingSoon);
      }
    };

    const handleConnect = () => {
      ACCOUNTS.link();
    };

    return {
      state,
      handleCloseNavMask,
      handleConnect,
      handleSport,
      isLink,
      getAccounts,
    };
  },
});
</script>

<style lang="less" scoped>
.close-icon {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.n-item {
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: rgba(223, 21, 155, 0.327);
  }
}

.start {
  height: 42px;
  width: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-radius: 40px;
  font-weight: 600;
  box-shadow: 0 0 10px #ff0083;
  background-color: #ff008479;
  border-color: #ff0083 !important;
  border: 1px solid;
  color: #fff;
  animation: shane 2000ms linear infinite;
  &:hover {
    cursor: pointer;
    background: #ff0083 !important;
  }
}
@keyframes shane {
  0% {
    background-color: #ff00843d;
  }
  50% {
    background-color: #ff00848b;
  }
  100% {
    background-color: #ff00843d;
  }
}
</style>
