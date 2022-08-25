<template>
  <div class="overflow-auto">
    <div class="p-16">
      <Swiper />
      <slot name="headerExtra"></slot>
    </div>
    <section>
      <div class="flex sticky-header flex-wrap items-center justify-between">
        <div class="flex items-center mr-24">
          <div
            class="item ff"
            @click="handleSetActive('ALL')"
            :class="{ 'active-bg': state.active === 'ALL' }"
          >
            {{ COMPETITION_ACTIVE || "ALL" }}
            <span class="ml-8">{{ getMatchList.ALL?.length || "" }}</span>
          </div>
          <div
            class="item ff"
            @click="handleSetActive('UPCOMING')"
            :class="{ 'active-bg': state.active === 'UPCOMING' }"
          >
            UPCOMING
            <span class="ml-8">{{ getMatchList.UPCOMING?.length || "" }}</span>
          </div>
          <div
            class="item ff"
            @click="handleSetActive('LIVE')"
            :class="{ 'active-bg': state.active === 'LIVE' }"
          >
            LIVE
            <span class="ml-8">{{ getMatchList.LIVE?.length || "" }}</span>
          </div>
        </div>
        <div class="flex-1 flex justify-end">
          <div class="searchPane">
            <input
              placeholder="Search"
              @change="handleChangeKeyWord"
              v-model="state.keyword"
              class="searchInput primary-bg"
            />
            <search-outlined class="searchIcon" />
          </div>
        </div>
      </div>
      <ul class="p-16 shadow">
        <div v-if="getCommingList?.length">
          <div class="ff mb-8">UPCOMING</div>
          <sport-item v-for="item in getCommingList" :info="item"></sport-item>
        </div>
        <div v-if="getLiveList?.length">
          <div class="ff mb-8">LIVE IN PLAY</div>
          <sport-item v-for="item in getLiveList" :info="item"></sport-item>
        </div>
        <div style="height: 10vh"></div>
      </ul>
    </section>

    <div style="background: #000" class="p-16">
      <FooterContent />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, inject, reactive, ref } from "vue";
import Swiper from "./swiper.vue";
import SportItem from "./sport-item/index.vue";
import { SearchOutlined } from "@ant-design/icons-vue";
import FooterContent from "./footer-pane/index.vue";

export default defineComponent({
  components: {
    Swiper,
    SportItem,
    SearchOutlined,
    FooterContent,
  },
  props: {},
  setup(props) {
    const SPORT_BET = inject("SPORT_BET");
    const SCHEDULE = inject("SCHEDULE");
    const COMPETITION = inject("COMPETITION");
    const getScheduleItem = computed(() => SCHEDULE.getScheduleItem.value);
    const getScheduleList = computed(() => SCHEDULE.getScheduleList.value);

    const COMPETITION_ACTIVE = computed(() => COMPETITION.active.value);
    const MATCH_LIST = inject("MATCH_LIST", {
      value: [],
    });
    const getMatchList = computed(() => {
      const list = MATCH_LIST.value;
      const active = state.active;
      const name = COMPETITION_ACTIVE.value;
      const ALL = name
        ? list.filter((item) => item.competition_name === name)
        : list;
      const UPCOMING = ALL.filter((item) => !item.isLive);
      const LIVE = ALL.filter((item) => item.isLive);
      return {
        ALL,
        UPCOMING,
        LIVE,
      };
    });

    const getSportList = computed(() => {
      const list = getMatchList.value[state.active];
      const keyword = state.keyword;
      if (keyword) {
        const reg = new RegExp(keyword, "ig");
        const _list = list.filter((item) => {
          return (
            item.team_away_name.match(reg) || item.team_home_name.match(reg)
          );
        });
        return _list;
      }
      return list;
    });

    const getCommingList = computed(() => {
      const list = getSportList.value;
      return list.filter((item) => !item.isLive);
    });
    const getLiveList = computed(() => {
      const list = getSportList.value;
      return list.filter((item) => !!item.isLive);
    });
    const state = reactive({
      sportsList: [],
      active: "ALL",
      keyword: "",
    });

    const handleSetActive = (e) => {
      state.active = e;
      state.keyword = undefined;
    };

    const debounce = (fn, wait = 300) => {
      let timer = undefined;
      return () => {
        clearTimeout(timer);
        timer = null;
        timer = setTimeout(() => {
          fn();
        }, wait);
      };
    };

    const handleChangeKeyWord = debounce(() => {
      const key = state.keyword;
    });
    return {
      state,
      getScheduleItem,
      getScheduleList,
      getMatchList,
      handleSetActive,
      COMPETITION_ACTIVE,
      getSportList,
      getCommingList,
      getLiveList,
    };
  },
});
</script>

<style lang="less" scoped>
.item {
  padding: 4px 16px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  min-width: 80px;
  text-align: center;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.7;
  }
}
.searchPane {
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 330px;
}
.searchInput {
  outline: none;
  color: #fff;
  padding: 8px 8px;
  border: none;
  border-radius: 8px;
  width: 100%;
}
.searchIcon {
  position: absolute;
  top: 10px;
  right: 8px;
  font-size: 18px;
  color: #999;
  &:hover {
    color: var(--primary-main);
  }
}
.sticky-header {
  position: sticky;
  top: 60px;
  z-index: 9;
  padding: 16px;
}
.shadow {
  box-shadow: 0 -10px 20px #0000005f;
  // background: rgba(0, 0, 0, 0.24);
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 1)
  );
}
</style>
