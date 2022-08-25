<template>
  <div class="flex items-center justify-between pc-show">
    <div class="flex items-center gray">
      <ArrowLeftOutlined
        class="color-white font-size-24 mr-16"
        @click="$router.back()"
      />
      <div class="flex items-center gray">
        <div v-for="(item, index) in getRoutes">
          <span>{{ item }}</span>
          <span v-if="index < getRoutes.length - 1" style="padding: 0 2px"
            >/</span
          >
        </div>
      </div>
    </div>
    <div class="flex items-center">
      <img
        style="height: 16px; margin-right: 4px"
        src="../../images/icons/matchItem-icon-active.png"
        alt=""
      />
      {{ getTime }}
    </div>
  </div>

  <div class="flex items-center justify-between mobile-show">
    <div class="flex items-center">
      <ArrowLeftOutlined @click="$router.back()" class="font-size-18 mr-16" />
      <img
        style="height: 16px; margin-right: 4px"
        src="../../images/icons/matchItem-icon-active.png"
        alt=""
      />
      {{ getTime }}
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, computed, inject } from "vue";
import dayjs from "dayjs";
import { ArrowLeftOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    ArrowLeftOutlined,
  },
  props: {
    time: {
      type: [String, Number],
    },
  },
  setup(props) {
    const state = reactive({
      list: ["ELECTRONICS", "yingxiongliangmeng", "LCP", "vspane"],
    });
    const SPORT_RACE = inject("SPORT_RACE");
    const detail = window.sessionStorage.getItem("sportDetail");
    const getRoutes = computed(() => {
      if (detail?.length) {
        const t = JSON.parse(detail);
        return ["ELECTRONICS", t.competition_name, t.name];
      } else {
        return [];
      }
    });

    const getTime = computed(() => {
      return props.time ? dayjs(props.time).format("MM-DD HH:mm") : undefined;
    });

    return {
      state,
      getTime,
      getRoutes,
    };
  },
});
</script>

<style lang="less" scoped>
.pc-show {
  display: flex;
  @media screen and (max-width: 960px) {
    display: none;
  }
}
.mobile-show {
  display: flex;
  @media screen and (min-width: 960px) {
    display: none;
  }
}
</style>
