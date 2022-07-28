<template>
  <div class="start ml-24" v-if="!isLink" @click="handleConnect">
    START THE GAME
  </div>

  <div class="start ml-24" v-if="isLink" @click="handleInRoom">JOIN ROOM</div>

  <Mask v-model:visible="state.visible">
    <div>
      <UnableSwitch />
    </div>
  </Mask>
</template>

<script>
import { defineComponent, reactive, computed, inject } from "vue";
import Mask from "@/sport/components/mask";
import RoomInit from "./init-modal.vue";
import RoomConfirmId from "./confirm-id.vue";
import RoomConfrimCreate from "./confirm-create.vue";
import RoomSubmitIng from "./submit-ing.vue";
import RoomPool from "./pool-pane.vue";
import WaitConfirm from "./wait-confirm.vue";
import IntoRoom from "./into-room.vue";
import UnableSwitch from "./unable-switch.vue";

export default defineComponent({
  components: {
    Mask,
    RoomInit,
    RoomConfirmId,
    RoomConfrimCreate,
    RoomSubmitIng,
    RoomPool,
    WaitConfirm,
    IntoRoom,
    UnableSwitch,
  },
  emits: ["init"],
  setup(props, { emit }) {
    const state = reactive({
      visible: false,
    });
    const ACCOUNTS = inject("ACCOUNTS");
    const isLink = computed(() => {
      return ACCOUNTS.isLink.value;
    });
    const handleConnect = () => {
      ACCOUNTS.link();
    };

    const handleInRoom = () => {
      // emit("init");
      state.visible = true;
    };

    return {
      state,
      isLink,
      handleConnect,
      handleInRoom,
    };
  },
});
</script>

<style lang="less" scoped>
.start {
  padding: 4px 12px;
  border-radius: 12px;
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
</style>
