<template>
  <div>
    <div v-if="state.active === 'create'">
      <div class="flex items-center justify-center">
        <img src="../../images/room/init.png" class="logo" alt="" />
      </div>
      <div
        class="font-size-20 text-align-center mt-24 mb-16 font-weight-600 active-color"
      >
        CREAT CASINO
      </div>
      <InitDesc />
    </div>

    <div v-else>
      <div class="roomTitle f4">FIND CASINO</div>
      <div class="mt-8 mb-16 flex justify-center">
        <img src="../../images/room/gate.png" class="gatelogo" alt="" />
      </div>
      <FindDesc />
    </div>

    <div class="flex items-center justify-between my-24">
      <div
        class="roombtn active-border-2 f4 font-size-18"
        v-for="item in state.btns"
        @click="handlePick(item)"
        :class="{
          'bg-white': state.active !== item.value,
          'color-white': state.active === item.value,
          'active-color': state.active !== item.value,
          'active-bg': state.active === item.value,
        }"
      >
        {{ item.label }}
      </div>
    </div>

    <div class="input-wrap active-border-2 flex items-center">
      <input
        class="flex-1 input"
        v-model="state.code"
        :placeholder="
          state.active === 'create'
            ? 'Set the 8-digit casino number'
            : 'Please enter the 8-digit casino number'
        "
        :maxlength="8"
      />
      <Button
        type="primary"
        :loading="state.loading"
        class="roomConfirm active-bg color-white"
        style="background: #ff0083"
        @click="handleConfirm"
      >
        <span class="cursor-pointer">{{
          state.active === "create" ? "CREATE" : "FIND"
        }}</span>
      </Button>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  reactive,
  inject,
  computed,
  watch,
} from "vue";
import usePermission from "@/sport/components/useHooks/use-permission";
import { message } from "ant-design-vue";
import { createTenant, saveTenant } from "@/sport/api/index";
import { Spin, Button } from "ant-design-vue";
import { TIP } from "@/sport/constant/tip";
import InitDesc from "./init-desc.vue";
import FindDesc from "./find-desc.vue";

export default defineComponent({
  components: {
    Spin,
    Button,
    InitDesc,
    FindDesc,
  },
  props: {
    type: {
      type: String,
    },
  },
  emits: ["next", "ok"],
  setup(props, { emit }) {
    const state = reactive({
      active: "create",
      code: "",
      btns: [
        {
          label: "LOOK FOR CASINO",
          value: "other",
        },
        {
          label: "CREAT CASINO",
          value: "create",
        },
      ],
      loading: false,
    });

    watch(
      () => props.type,
      (n) => {
        if (n) {
          state.active = n;
        }
      },
      {
        immediate: true,
      }
    );
    const ACCOUNTS = inject("ACCOUNTS");
    const ROOM = inject("ROOM");
    const accounts = computed(() => ACCOUNTS.accounts.value);
    const handleCreate = (roomId) => {
      state.loading = true;
      createTenant({
        wallet: accounts.value[0],
        tenant: roomId,
      })
        .then((res) => {
          console.log(res);
          emit("next");
        })
        .finally(() => {
          state.loading = false;
        });
    };

    const handleJoinOther = (roomId) => {
      state.loading = true;
      saveTenant({
        wallet: accounts.value[0],
        tenant: roomId,
      })
        .then((res) => {
          console.log(res);
          if (res) {
            // ROOM.setState({
            //   otherCode: roomId,
            // });
            // 第一期暂时这样
            if (res) {
              ROOM.setState({
                code: roomId,
              });
            }
          }
          emit("ok", state.active);
        })
        .finally(() => {
          state.loading = false;
        });
    };
    const handlePick = (item) => {
      state.active = item.value;
    };

    const { hasPermission, getPermission } = usePermission();
    const handleConfirm = async () => {
      if (state.code?.match(/^\d{8}$/g)) {
        if (state.active === "create") {
          handleCreate(state.code);
        } else if (state.active == "other") {
          handleJoinOther(state.code);
        }
      } else {
        message.warning(TIP.roomNumberTip);
      }
    };

    const handleInit = async () => {
      const hasP = await hasPermission();
      if (!hasP) {
        getPermission({
          callback: () => {
            message.info(
              "Permission verification sent Success, Please wait link"
            );
          },
          receipt: () => {
            message.success("Successfully linked");
            emit("next");
          },
          error: (e) => {
            const msg = e.message?.split("{")?.[0] || "Verification failed";
            message.error(msg);
          },
        });
      }
    };

    onMounted(() => {
      // handleInit();
    });

    return {
      state,
      handlePick,
      hasPermission,
      handleConfirm,
      TIP,
    };
  },
});
</script>

<style lang="less" scoped>
.pane {
  padding: 16px;
  border-radius: 12px;
}
.roombtn {
  height: 42px;
  border-radius: 10px;
  line-height: 40px;
  text-align: center;
  width: 45%;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  @media screen and (max-width: 700px) {
    font-size: 12px;
  }
}
.input-wrap {
  border-radius: 8px;
  overflow: hidden;
}
.input {
  padding-left: 8px;
  height: 42px;
  border: none;
  outline: none;
  line-height: 42px;
  font-size: 18px;
}
.roomConfirm {
  padding: 0 8px;
  height: 42px;
  min-width: 100px;
  text-align: center;
  line-height: 42px;
  font-size: 18px;
  border-radius: 4px;
  transition: all 300ms linear;
  cursor: pointer !important;
  border: none;
  background: #ff0083 !important;
  &:hover {
    color: #fff;
    background: #ff0083 !important;
  }
  @media screen and (max-width: 700px) {
    font-size: 12px;
  }
}
.importBtn {
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    color: #1890ff;
  }
}
.logo {
  width: 200px;
  margin-top: 40px;
  @media screen and (max-width: 1560px) {
    margin-top: 10px;
  }
  @media screen and (max-width: 700px) {
    width: 120px;
  }
}

.gatelogo {
  width: 200px;
  @media screen and (max-width: 700px) {
    width: 120px;
  }
}
.font14-12 {
  font-size: 14px;
  @media screen and (max-width: 700px) {
    font-size: 12px;
  }
}
.roomTitle {
  font-size: 20px;
  text-align: center;
  margin-top: 56px;
  @media screen and (max-width: 1560px) {
    margin-top: 26px;
  }
  color: var(--primary-main);
}
</style>
