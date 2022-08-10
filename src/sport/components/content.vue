<template>
  <div>
    <slot name="headerExtra"></slot>
    <Swiper />

    <section class="zyqTD zyqTDall">
      <!-- <div class="zyqTit flexC fl-bet">
        <div class="zyqTitH">{{ getScheduleItem?.name || "ALL" }}</div>
        <div class="zyqTitR flexC">
          <div class="zyqTitRS flexC">
            <img src="../images/zyq0425/IconTime01.png" />
            <p>start time</p>
          </div>
          <div class="zyqTitRS flexC">
            <img src="../images/zyq0425/IconTime02.png" />
            <p>real time</p>
          </div>
          <div class="zyqsearch flexC fl-bet">
            <a href="javascript:;" class="zyqseaA"></a>
            <input
              type="text"
              placeholder="search for a game, team or event"
              class="zyqseaI Huans"
            />
          </div>
        </div>
      </div>
      <div class="zyqTis">即将开始</div> -->
      <div class="flex flex-wrap items-center justify-between mb-16">
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
            <input placeholder="搜索队伍名称" v-model='state.keyword' class="searchInput primary-bg" />
            <search-outlined class="searchIcon" />
          </div>
        </div>
      </div>
      <ul>
        <sport-item
          v-for="item in getMatchList[state.active]"
          :info="item"
        ></sport-item>
      </ul>
    </section>
  </div>
</template>

<script>
import { computed, defineComponent, inject, reactive, ref } from "vue";
import Swiper from "./swiper.vue";
import SportItem from "./sport-item/index.vue";
import { SearchOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    Swiper,
    SportItem,
    SearchOutlined,
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
    const state = reactive({
      sportsList: [],
      active: "ALL",
      keyword: ''
    });

    const handleSetActive = (e) => {
      state.active = e;
    };
    return {
      state,
      getScheduleItem,
      getScheduleList,
      getMatchList,
      handleSetActive,
      COMPETITION_ACTIVE,
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
  max-width: 300px;
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
</style>
