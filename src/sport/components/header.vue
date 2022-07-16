<template>
  <header class="zyqhd flexC Huans">
    <a href="javascript:;" class="wapNav" @click="handleShowNav"></a>
    <div class="zyqlogoK Huans flexC">
      <a href="javascript:;" class="zyqlogo flexC"
        ><img src="../images/zyq0425/logo.png"
      /></a>
    </div>
    <div class="hdNavK flexC">
      <a
        href="javascript:;"
        @click="handlePick(item)"
        v-for="item in options"
        :class="{ on: state.active === item.value }"
        class="hdNavA"
      >
        <i class="hdNavI" v-if="item.icon" :class="item.icon"></i>
        <p>{{ item.label }}</p>
      </a>
    </div>

    <div class="zyqhdR flexC">
      <div class="zyqhdwal flexC fl-bet">
        <div class="text-align-center w-100p" @click='handleShowMask'>激活房间号</div>
      </div>
      <!-- wallet -->
      <div class="zyqhdwal flexC fl-bet" v-if="isLink">
        <i class="zyqhdwalI"></i>
        <div class="qhdwalN flexC">
          <p>0</p>
          <span>$0</span>
        </div>
        <a href="javascript:;" class="zyqhdwala IndBac1">wallet</a>
      </div>
      <!-- info -->
      <div class="zyqhdXD" v-if="isLink">
        <a href="javascript:;" class="zyqhdId flexC fl-bet Huans">
          <div class="RightHdI"><img src="../images/zyq0425/pic01.jpg" /></div>
          <div class="RightHdN">
            <p>{{ getId }}</p>
            <div class="RightHdJ"></div>
          </div>
        </a>
      </div>

      <!-- not login  -->
      <a
        href="javascript:;"
        v-if="!ACCOUNTS.isLink"
        class="hdBut IndBac1"
        @click="handleConnect"
        >link wallet</a
      >
    </div>

    <Mask v-model:visible='state.visible'>
      <div>
        <RoomPool />
      </div>
    </Mask>
  </header>
</template>

<script>
import { computed, defineComponent, inject, reactive, ref, watch } from "vue";
import Mask from "@/sport/components/mask";
import RoomInit from './room-modal/init-modal.vue'
import RoomConfirmId from './room-modal/confirm-id.vue'
import RoomConfrimCreate from './room-modal/confirm-create.vue'
import RoomSubmitIng from './room-modal/submit-ing.vue'
import RoomPool from './room-modal/pool-pane.vue'

export default defineComponent({
  components: {
    Mask,
    RoomInit,
    RoomConfirmId,
    RoomConfrimCreate,
    RoomSubmitIng,
    RoomPool
  },
  props: {
    userInfo: {
      type: Object,
    },
    ID: {
      type: [String, Number],
    },
    active: {
      type: String,
    },
    options: {
      type: Array,
    },
  },
  emits: ["link", "update:active"],
  setup(props, { emit }) {
    const state = reactive({
      active: props.active,
      visible: false
    });

    const SPORTS = inject("SPORTS");

    const ACCOUNTS = inject("ACCOUNTS");
    const isLink = computed(() => {
      return ACCOUNTS.isLink.value;
    });

    watch(
      () => props.active,
      (n) => {
        state.active = n;
      },
      {
        immediate: true,
      }
    );
    watch(
      () => state.active,
      (n) => {
        emit("update:active", n);
      }
    );

    const getId = computed(() => ACCOUNTS.accountHide.value);

    const handlePick = (item) => {
      state.active = item.value;
    };

    const handleConnect = () => {
      emit("link");
    };

    const handleShowMask = () => {
      state.visible = true
    }

    const handleShowNav = () => {
      if (!$(".wapNav").hasClass("wapNavO")) {
        $(".wapNav").addClass("wapNavO");
        $(".wapMenu").slideDown(100);
      } else {
        $(".wapNav").removeClass("wapNavO");
        $(".wapMenu").slideUp(100);
      }
    };

    return {
      state,
      ACCOUNTS,
      handlePick,
      handleConnect,
      handleShowNav,
      getId,
      SPORTS,
      isLink,
      handleShowMask,
    };
  },
});
</script>
