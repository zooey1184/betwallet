<template>
  <div>
    <div class="layout_header primary-bg flex items-center justify-between">
      <div class="flex items-center h-100p">
        <div class="mx-lg-show mr-16">
          <MenuIcon v-model:value="state.visibleNav" />
        </div>
        <!-- <img
          src="../images/zyq0425/logo.png"
          class="cursor-pointer"
          style="height: 40px; margin-right: 50px"
          @click="handleGoHome"
        /> -->
        <div
          class="h-70p mr-16 cursor-pointer overflow-hidden pos-r"
          @click="handleGoHome"
        >
          <!-- <div class="flash-bg"></div> -->
          <!-- <div class="flash"></div> -->
          <img style="height: 100%" src="../images/logo.png" />
        </div>
        <HeaderSportItem />
        <!-- <div class="start ml-24">START THE GAME</div> -->
        <div class="sm-hide ml-24 roomBtn">
          <RoomBtn />
        </div>
      </div>
      <div class="flex items-center sm-show">
        <div v-if="isLink">
          <Info
            :address="getAccounts"
            @info="state.infoVisible = !state.infoVisible"
          />
        </div>
        <div
          v-else
          class="items-center sellBtn active-color ml-24"
          @click="handleConnect"
        >
          <CloudUploadOutlined class="mr-8 cursor-pointer" />
          Wallet
        </div>
      </div>
    </div>

    <div class="body flex">
      <!-- >1560px 出现 表示弹性 -->
      <div
        class="sider flex-0 primary-bg"
        :style="{ width: state.collapse ? '60px' : '250px' }"
      ></div>
      <div class="sider-real-sm flex-0" style="width: 60px"></div>

      <!-- 真实侧边栏 -->
      <div
        class="sider-real primary-bg"
        :style="{ width: state.collapse ? '60px' : '250px', zIndex: 12 }"
      >
        <Sider :collapse="state.collapse" :options="slideOptions" />
        <div class="sider-bottom flex items-center justify-around">
          <img
            class="i18n-icon"
            v-if="!state.collapse"
            src="../images/zyq0425/qi01.png"
          />

          <Icons v-if="!state.collapse" />

          <Popover v-if="state.collapse">
            <template #content>
              <div class="flex flex-col">
                <Icons />
              </div>
            </template>
            <AppstoreOutlined />
          </Popover>

          <LeftOutlined
            :class="{ rotate: state.collapse }"
            class="trans"
            @click="handleToggleCollapse"
          />
        </div>
      </div>

      <!-- <div
        class="mask sider-real-sm"
        @click="state.collapse = true"
        v-if="!state.collapse"
      ></div> -->

      <!-- 内容区 -->
      <div class="content flex-1 imgBg" :class="{ 'bg-blur': !state.collapse }">
        <div class="w-100p color-white">
          <slot></slot>
        </div>

        <div style="height: 60px" class="btm-pane"></div>
      </div>
      <div
        class="right-sider rightBg overflow-x-hidden pos-r primary-bg flex-0"
      >
        <slot name="bet"></slot>
        <div
          class="mine-pane primary-bg rightBg"
          :style="{ right: !state.infoVisible ? '-100%' : 0 }"
        >
          <div class="mine-pane">
            <InfoPane @close="state.infoVisible = false" />
          </div>
        </div>
      </div>

      <div class="btm-nav color-black ff flex items-center justify-around">
        <div
          @click="handleChangeTab('match')"
          :class="{ 'active-color': !state.betVisible && !state.mineVisible }"
        >
          <div class="flex flex-col items-center justify-center">
            <VsIcon class="font-size-18" /> MATCH
          </div>
        </div>
        <div
          @click="handleChangeTab('bet')"
          :class="{ 'active-color': state.betVisible }"
        >
          <div class="flex flex-col items-center justify-center">
            <BetIcon class="font-size-18" /> BET
          </div>
        </div>
        <div
          @click="handleChangeTab('mine')"
          :class="{ 'active-color': state.mineVisible }"
        >
          <div class="flex flex-col items-center justify-center">
            <user-outlined class="font-size-18" />
            MINE
          </div>
        </div>
      </div>

      <transition name="slide-fade">
        <div class="tab-mask" v-if="state.betVisible">
          <BetPane height="calc(100vh - 320px)" />
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="tab-mask" v-if="state.mineVisible">
          <InfoPane @routerBet="state.mineVisible = false" />
        </div>
      </transition>

      <!-- 导航条的内容区域 -->
      <transition name="slide-down">
        <div class="tab-mask" v-if="state.visibleNav">
          <div style="height: 120px"></div>
          <NavContent @close="handleCloseNavMask" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  inject,
  computed,
  watch,
  provide,
} from "vue";
import RoomBtn from "../components/room/room-btn.vue";
import Sider from "./sider.vue";
import HeaderSportItem from "./headerSportItem.vue";
import {
  RightOutlined,
  CloudUploadOutlined,
  MenuOutlined,
  CloseOutlined,
  AppstoreOutlined,
  LeftOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { Popover, message } from "ant-design-vue";
import Info from "./info-btn.vue";
import MenuIcon from "./menu-icon.vue";
import InfoPane from "./info-pane.vue";
import { useRouter } from "vue-router";
import NavContent from "./m-nav-content.vue";
import VsIcon from "../components/vs-icon.vue";
import BetIcon from "../components/bet-icon.vue";
import BetPane from "../components/right-sider/bet-pane.vue";
import Icons from "../components/footer-pane/icons.vue";

export default defineComponent({
  components: {
    Sider,
    HeaderSportItem,
    AppstoreOutlined,
    Info,
    RoomBtn,
    LeftOutlined,
    RightOutlined,
    CloudUploadOutlined,
    MenuOutlined,
    CloseOutlined,
    MenuIcon,
    InfoPane,
    Popover,
    NavContent,
    VsIcon,
    BetIcon,
    UserOutlined,
    BetPane,
    Icons,
  },
  props: {
    slideOptions: {
      type: Array,
    },
  },
  setup(props) {
    const router = useRouter();
    const state = reactive({
      collapse: false,
      visible: false,
      visibleNav: false,
      infoVisible: false,
      height: "calc(100vh - 160px)",
      options: [],
      mineVisible: false,
      betVisible: false,
      methodsMap: {},
    });
    const ACCOUNTS = inject("ACCOUNTS");

    const getAccounts = computed(() => ACCOUNTS.accountHide.value);
    const isLink = computed(() => {
      return ACCOUNTS.isLink.value;
    });
    const COMPETITION_NAME = inject("COMPETITION_NAME", {
      value: [],
    });

    const SPORT_BET = inject("SPORT_BET");
    const getBetMap = computed(() => SPORT_BET.getBetList.value);

    watch(
      () => getBetMap.value,
      (n) => {
        state.infoVisible = false;
      }
    );
    const getCompetitionName = computed(() => COMPETITION_NAME.value);

    const handleToggleCollapse = () => {
      state.collapse = !state.collapse;
    };

    watch(
      () => state.collapse,
      (n) => {
        console.log("===", state.methodsMap);
        state.methodsMap?.swiperUpdateSize();
      }
    );
    const handleConnect = () => {
      ACCOUNTS.link();
    };
    const handleShowMask = () => {
      state.visible = true;
    };

    const handleShowNavmask = () => {
      state.visibleNav = true;
    };
    const handleCloseNavMask = () => {
      state.visibleNav = false;
    };
    const handleGoHome = () => {
      router.push({
        name: "main",
      });
    };

    const handleChangeTab = (e) => {
      state.mineVisible = false;
      if (e === "match") {
        state.betVisible = false;
        state.mineVisible = false;
      }
      if (e === "bet") {
        state.mineVisible = false;
        state.betVisible = !state.betVisible;
      }
      if (e === "mine") {
        state.betVisible = false;
        state.mineVisible = !state.mineVisible;
      }
    };

    const handleMessage = () => {
      message.info("Coming Soon");
    };
    provide("LAYOUT", {
      setMethods: (data) => {
        const d = state.methodsMap;
        for (let i in data) {
          d[i] = data[i];
        }
        state.methodsMap = d;
      },
    });

    return {
      state,
      getCompetitionName,
      handleToggleCollapse,
      handleShowMask,
      handleShowNavmask,
      handleCloseNavMask,
      getAccounts,
      isLink,
      handleGoHome,
      handleConnect,
      handleChangeTab,
      handleMessage,
    };
  },
});
</script>

<style lang="less" scoped>
@h: 80px;
@hmd: 60px;
@sider: 260px;
.layout_header {
  height: @h;
  width: 100%;
  position: relative;
  padding: 0 24px;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  z-index: 19;
  @media screen and (max-width: 1440px) {
    height: @hmd;
  }
}
.body {
  height: calc(100vh - @h);
  position: absolute;
  width: 100%;
  top: @h;
  left: 0;
  overflow: hidden;
  @media screen and (max-width: 1440px) {
    height: calc(100vh - @hmd);
    top: @hmd;
  }
  .sider {
    width: @sider;
    height: 100%;
    transition: all 250ms linear;
    position: relative;
    @media screen and (max-width: 1200px) {
      display: none;
    }
  }
  .sider-real-sm {
    display: none;
    // todo 1200 1560
    @media (min-width: 600px) and (max-width: 1200px) {
      display: block;
    }
  }
  .content {
    height: 100%;
    position: relative;
    overflow-y: auto;
  }
  .right-sider {
    width: 300px;
    height: 100%;
    overflow-y: auto;
    @media screen and (max-width: 700px) {
      display: none;
    }
  }
  .sider-bottom {
    position: absolute;
    z-index: 9;
    width: 90%;
    height: 38px;
    border-radius: 10px;
    padding: 8px;
    background: #fff;
    color: #333;
    bottom: 16px;
    left: 5%;
  }
  .sider-real {
    position: fixed;
    top: @h;
    left: 0;
    width: 250px;
    height: calc(100vh - @h);
    padding: 8px;
    padding-bottom: 0;
    transition: all 200ms linear;
    z-index: 5;
    background-image: url("../images/v2/lbg.png");
    background-repeat: no-repeat;
    background-size: cover;
    @media screen and (max-width: 1200px) {
      display: none;
    }
    @media screen and (min-width: 1200px) {
      display: block;
    }
  }
  .bg-blur {
    @media (min-width: 600px) and (max-width: 1200px) {
      // filter: blur(10px);
    }
  }
  .logo {
    width: 60px;
    height: 60px;
    border-radius: 40px;
  }
  .slide-h {
    width: 100%;
    overflow: auto;
    padding: 0 16px;
    padding-top: 16px;
    display: none;
    @media screen and (max-width: 1200px) {
      display: flex;
    }
  }
  .slider-h-wrap {
    width: 100px;
  }
  .btm-nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    left: 0;
    color: #fff;
    background: #2a333f;
    z-index: 99;
    @media screen and (min-width: 700px) {
      display: none;
    }
  }
  .btm-pane {
    display: block;
    @media screen and (min-width: 700px) {
      display: none;
    }
  }
  .slide-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 19;
    background: #000001;
  }
  .tab-mask {
    position: fixed;
    width: 100%;
    height: calc(100% - 60px);
    top: 0;
    left: 0;
    z-index: 19;
    background: #000001;
  }
  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(100vh);
    // opacity: 0.6;
  }
  .slide-down-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-down-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-down-enter-from,
  .slide-down-leave-to {
    transform: translateY(-100vh);
    // opacity: 0.6;
  }

  .fade-enter-active {
    transition: all 0.2s ease-out;
  }

  .fade--leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
.lg-show {
  display: none;
  @media screen and (min-width: 1200px) {
    display: flex;
  }
}
.md-show {
  display: none;
  @media screen and (min-width: 800px) {
    display: flex;
  }
}
.sm-show {
  display: none;
  @media screen and (min-width: 700px) {
    display: flex;
  }
}
.sm-hide {
  display: flex;
  @media screen and (max-width: 700px) {
    display: none;
  }
}
.mx-lg-show {
  display: block;
  @media screen and (min-width: 1200px) {
    display: none;
  }
}

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
@keyframes shane {
  0% {
    box-shadow: 0 0 10px #ff0083;
    opacity: 0.8;
  }
  50% {
    box-shadow: 0 0 15px #ff319c;
    opacity: 1;
  }
  100% {
    box-shadow: 0 0 10px #ff0083;
    opacity: 0.8;
  }
}
.sellBtn {
  padding: 4px 12px;
  background: #fff;
  border-radius: 10px;
  cursor: pointer;
}
.mine-pane {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 8;
  transition: all 200ms linear;
  overflow: hidden;
  top: 0;
}

.i18n-icon {
  height: 20px;
  border-radius: 4px;
}
.trans {
  transition: all 200ms linear;
}
.rotate {
  transform: rotate(180deg);
}
.mask {
  background: #0000010e;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 3;
}
.rightBg {
  background-image: url("../images/v2/rbg.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.imgBg {
  // background: url("../images/imgBg.png");
  background-image: url("https://s1.ax1x.com/2022/08/23/vc0pkD.png");
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}
.roomBtn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

@keyframes changeImg {
  from {
    left: -100%;
  }
  100% {
    left: 150%;
  }
}
.flash-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background: #fff;
  z-index: -1;
}
.flash {
  position: absolute;
  cursor: pointer;
  animation: changeImg 3s ease 0s;
  top: 0;
  width: 30%;
  height: 100%;
  content: "";
  z-index: -1;
  background: linear-gradient(
    to right,
    #ff00841b 0,
    #ff0084c6 50%,
    #ff00841a 0
  );
  transform: skewX(-45deg);
  animation-iteration-count: infinite;
}
</style>
