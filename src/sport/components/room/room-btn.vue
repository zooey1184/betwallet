<template>
  <div
    class="ff bubble-button"
    style="padding: 4px 8px"
    v-if="!isLink"
    @click="handleConnect"
  >
    START THE GAME
  </div>

  <div class="start" v-if="isLink">
    <div v-if="getCode" class="flex items-center">
      <div class="flex items-center cursor-pointer item-pane">
        <Icon v-if="isMineRoom">
          <template #component="svgProps">
            <svg
              t="1659105446797"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="16832"
              width="128"
              height="128"
              v-bind="svgProps"
            >
              <path
                d="M448 456V96q0-12.992 9.504-22.496T480 64h192q14.016 0 23.008 8.992T704 96t-8.992 23.008T672 128h-160v128h160q14.016 0 23.008 8.992T704 288t-8.992 23.008T672 320h-160v128q104 2.016 175.008 69.504t80 170.496q4 104-58.496 179.488T544 957.984q-104 11.008-183.008-46.496T260 752q-16.992-102.016 35.488-184.992T448 456zM512 896q82.016-2.016 136-56T704 704q-2.016-82.016-56-136T512 512q-82.016 2.016-136 56T320 704q2.016 82.016 56 136T512 896z"
                p-id="16833"
              ></path>
            </svg>
          </template>
        </Icon>
        <span class="ff" v-else>ROOM: </span>
        <span @click="handleCloseCasino" class="ff cursor-pointer">{{
          getCode
        }}</span>
        <Copy :text="getCode" id="room" v-if="isMineRoom" />
      </div>
      <span v-if="!isMineRoom">|</span>

      <!-- switch -->
      <span
        class="item-pane cursor-pointer"
        v-if="!isMineRoom"
        @click="handleSwitch"
      >
        SWITCH
        <QuestionCircleOutlined style="margin-left: 4px" />
      </span>
    </div>

    <div v-else @click="handleInRoom" style="padding: 4px 8px">JOIN ROOM</div>
    <!-- <div @click="testfn">test</div> -->
  </div>

  <Mask v-model:visible="state.visible">
    <div>
      <RoomInit
        v-if="state.status === 'init'"
        :type="state.type"
        @next="state.status = 'confirmCreate'"
        @ok="state.visible = false"
      />
      <!-- <RoomConfrimCreate
        v-if="state.status === 'confirmCreate'"
        @next="handleNextConfirmCreate"
      /> -->
      <RoomConfrimCreate
        v-if="state.status === 'confirmCreate'"
        @next="handleNextConfirmIng"
      />
      <RoomConfirmId
        v-if="state.status === 'loading'"
        @pre="state.status = 'confirmCreate'"
        :amount="state.amount"
        @next="handleNextConfirmCreate"
      />
      <RoomSubmitIng v-if="state.status === 'submit'" @close="handleClose" />
      <PoolPane v-if="state.status === 'close'" @ok="handleClose" />
      <!-- <UnableSwitch /> -->
    </div>
  </Mask>
</template>

<script>
import { defineComponent, reactive, computed, inject, onMounted } from "vue";
import Mask from "@/sport/components/mask";
import RoomInit from "./init-modal.vue";
import RoomConfirmId from "./confirm-id.vue";
import RoomConfrimCreate from "./confirm-create.vue";
import RoomSubmitIng from "./submit-ing.vue";
import RoomPool from "./pool-pane.vue";
import WaitConfirm from "./wait-confirm.vue";
import IntoRoom from "./into-room.vue";
import UnableSwitch from "./unable-switch.vue";
import Icon, { QuestionCircleOutlined } from "@ant-design/icons-vue";
import { message, Typography } from "ant-design-vue";
import Copy from "@/sport/components/copy";
import PoolPane from "./pool-pane.vue";

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
    Icon,
    Copy,
    QuestionCircleOutlined,
    PoolPane,
  },
  emits: ["init"],
  setup(props, { emit }) {
    const state = reactive({
      visible: false,
      status: "init",
      type: "create",
      amount: "",
    });
    const ACCOUNTS = inject("ACCOUNTS");
    const ROOM = inject("ROOM");
    const getCode = computed(() => ROOM.code.value);
    const isLink = computed(() => {
      return ACCOUNTS.isLink.value;
    });
    const handleConnect = () => {
      ACCOUNTS.link();
    };

    const getStatus = computed(() => {
      if (getCode.value) {
        return "in-room";
      }
      return "init";
    });

    const handleInRoom = () => {
      if (!getCode?.value) {
        state.type = "create";
        state.status = "init";
        state.visible = true;
      }
    };

    const handleSwitch = () => {
      state.type = "other";
      state.status = "init";
      state.visible = true;
    };

    const handleNextConfirmIng = (e) => {
      state.status = "loading";
      state.amount = e;
    };

    const handleNextConfirmCreate = () => {
      state.status = "submit";
      ROOM.handleGetCode();
    };

    const handleClose = () => {
      state.visible = false;
      ROOM.handleGetCode();
    };

    const isMineRoom = computed(() => {
      const roomAddress = ROOM.roomAddress.value;
      const id = ACCOUNTS.accounts.value[0];
      return id === roomAddress;
    });

    const handleCloseCasino = () => {
      const roomAddress = ROOM.roomAddress.value;
      const id = ACCOUNTS.accounts.value[0];

      if (id === roomAddress) {
        state.status = "close";
        state.visible = true;
      }
    };

    const testfn = () => {
      state.status = "confirmCreate";
      state.visible = true;
    };

    return {
      state,
      isLink,
      handleConnect,
      handleInRoom,
      getCode,
      getStatus,
      handleSwitch,
      testfn,
      handleClose,
      handleNextConfirmCreate,
      handleCloseCasino,
      isMineRoom,
      handleNextConfirmIng,
    };
  },
});
</script>

<style lang="less" scoped>
.start {
  // padding: 4px 12px;
  border-radius: 10px;
  font-weight: 600;
  box-shadow: 0 0 10px #ff0083;
  background-color: #ff008479;
  border-color: #ff0083 !important;
  border: 1px solid;
  color: #fff;
  animation: shane 2000ms linear infinite;
  cursor: pointer;
  overflow: hidden;
  // &:hover {
  //   cursor: pointer;
  //   background: #ff0083 !important;
  // }
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

.item-pane {
  padding: 4px 8px;
  cursor: pointer;
  &:hover {
    background: #ff0083 !important;
  }
}

.bubble-button {
  display: inline-block;
  padding: 1em 2em;
  background-color: #ff0081;
  /* background-color: transparent; */
  color: #fff;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  position: relative;
  box-shadow: 0 2px 25px rgba(233, 30, 99, 0.5);
  outline: 0;
  transition: transform ease-in 0.1s, background-color ease-in 0.1s,
    box-shadow ease-in 0.25s;
}

.bubble-button::before {
  position: absolute;
  content: "";
  left: -2em;
  right: -2em;
  top: -2em;
  bottom: -2em;
  pointer-events: none;
  transition: ease-in-out 0.5s;
  background-repeat: no-repeat;
  background-image: radial-gradient(circle, #ff0081 20%, transparent 20%),
    radial-gradient(circle, #ff0081 20%, transparent 20%),
    radial-gradient(circle, #ff0081 20%, transparent 20%),
    radial-gradient(circle, #ff0081 20%, transparent 20%),
    radial-gradient(circle, #ff0081 20%, transparent 20%),
    radial-gradient(circle, #ff0081 20%, transparent 20%),
    radial-gradient(circle, #ff0081 20%, transparent 20%),
    radial-gradient(circle, #ff0081 20%, transparent 20%),
    radial-gradient(circle, #ff0081 20%, transparent 20%),
    /*  */ radial-gradient(circle, #ff0081 20%, transparent 20%),
    radial-gradient(circle, #ff0081 20%, transparent 20%),
    radial-gradient(circle, #ff0081 20%, transparent 20%),
    radial-gradient(circle, #ff0081 20%, transparent 20%),
    radial-gradient(circle, #ff0081 20%, transparent 20%),
    radial-gradient(circle, #ff0081 20%, transparent 20%),
    radial-gradient(circle, #ff0081 20%, transparent 20%);
  background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%,
    10% 10%, 18% 18%, 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%,
    20% 20%;
  background-position: 18% 40%, 20% 31%, 30% 30%, 40% 30%, 50% 30%, 57% 30%,
    65% 30%, 80% 32%, 15% 60%, 83% 60%, 18% 70%, 25% 70%, 41% 70%, 50% 70%,
    64% 70%, 80% 71%;
  animation: bubbles ease-in-out 0.75s forwards;
}

.bubble-button:active {
  transform: scale(0.95);
  background-color: #f3037c;
  box-shadow: 0 2px 25px rgba(233, 30, 99, 0.5);
}
.bubble-button:active::before {
  animation: none;
  background-size: 0;
}
@keyframes bubbles {
  0% {
    background-position: 18% 40%, 20% 31%, 30% 30%, 40% 30%, 50% 30%, 57% 30%,
      65% 30%, 80% 32%, 15% 60%, 83% 60%, 18% 70%, 25% 70%, 41% 70%, 50% 70%,
      64% 70%, 80% 71%;
  }
  50% {
    background-position: 10% 44%, 0% 20%, 15% 5%, 30% 0%, 42% 0%, 62% -2%,
      75% 0%, 95% -2%, 0% 80%, 95% 55%, 7% 100%, 24% 100%, 41% 100%, 55% 95%,
      68% 96%, 95% 100%;
  }
  100% {
    background-position: 5% 44%, -5% 20%, 7% 5%, 23% 0%, 37% 0, 58% -2%, 80% 0%,
      100% -2%, -5% 80%, 100% 55%, 2% 100%, 23% 100%, 42% 100%, 60% 95%, 70% 96%,
      100% 100%;
    background-size: 0% 0%;
  }
}
</style>
