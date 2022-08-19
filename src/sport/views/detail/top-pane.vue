<template>
  <div class="arrow flex items-center mt-8">
    <LeftOutlined
      class="primary"
      style="font-size: 24px; font-weight: 600"
      @click="handleGoBack"
    />
    <div class="logo" style="margin-left: 8px"></div>
  </div>
  <div class="top-pane flex items-center justify-between bg-item">
    <div class="flex items-center">
      <div class="logo"></div>
      <div class="flex items-center flex-wrap">
        <div class="gutter">
          {{ address }}
        </div>
        <div class="flex items-center gutter" v-if="getTime">
          <img
            style="margin-right: 8px; width: 18px"
            src="../../images/zyq0425/IconTime01.png"
          />
          {{ getTime }}
        </div>
      </div>
    </div>
    <div class="info active-color">{{ TIP.betBanner }}</div>
    <div class="active-bg shadow"></div>
  </div>
</template>

<script>
import { ref, defineComponent, computed } from "vue";
import { LeftOutlined } from "@ant-design/icons-vue";
import dayjs from "dayjs";
import { useRouter } from "vue-router";
import { TIP } from "@/sport/constant/tip";
export default defineComponent({
  components: {
    LeftOutlined,
  },
  props: {
    address: {
      type: String,
    },
    time: {
      type: [String, Number],
    },
  },
  setup(props) {
    const getTime = computed(() => {
      return props.time ? dayjs(props.time).format("MM-DD HH:mm") : undefined;
    });
    const router = useRouter();
    const handleGoBack = () => {
      router.back();
    };
    // const {state, showTime} = useTime()

    return {
      getTime,
      handleGoBack,
      TIP,
      // state, showTime
    };
  },
});
</script>

<style lang="less" scoped>
.logo {
  width: 32px;
  height: 32px;
  background: #999;
}
.arrow {
  display: none;
}
.top-pane {
  margin: 20px auto;
  margin-bottom: 0;
  padding: 12px 24px;
  position: relative;
  .shadow {
    width: calc(100% + 2px);
    height: 100%;
    position: absolute;
    top: 2px;
    left: 0;
    z-index: -1;
  }
  .info {
    margin-right: 40px;
    font-size: 16px;
    font-weight: 600;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      bottom: -17px;
      width: 100%;
      height: 6px;
      left: 0;
      background: var(--primary-main);
    }
  }
  .gutter {
    margin-left: 48px;
  }

  @media (max-width: 960px) {
    margin-top: 8px;
    padding: 12px 12px;
    .logo {
      display: none;
    }
    .gutter {
      margin-left: 8px;
    }
    .info {
      margin-right: 0;
    }
  }
}
@media (max-width: 960px) {
  .arrow {
    display: flex;
    .logo {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
