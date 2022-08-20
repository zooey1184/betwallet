<template>
  <a-spin :spinning="state.loading" :delay="500">
    <slot></slot>
  </a-spin>
</template>

<script>
import {
  computed,
  defineComponent,
  onBeforeMount,
  onMounted,
  provide,
  reactive,
  ref,
} from "vue";
// import { getSports, getSportList } from "../apis";
import { getSportList } from "@/sport/api";
import { Spin } from "ant-design-vue";
import { queryCompetitionName, queryMatches } from "@/sport/api/index.js";

export default defineComponent({
  components: {
    "a-spin": Spin,
  },
  setup(props) {
    const state = reactive({
      sportsList: [],
      sportsItemList: [],
      loading: false,
      betType: "single",
      competitionList: [], // 举办方信息
      matchList: [], // 所有比赛
    });

    const competition = reactive({
      list: [],
      active: "",
    });

    const getSportsList = computed(() => {
      return [
        ...state.sportsList,
        {
          label: "official website",
          value: "website",
          icon: "hdNavI4",
        },
      ];
    });

    provide("SPORTS", getSportsList);

    const getSportItemListFn = async (id) => {
      state.loading = true;
      const data = await getSportList(id);
      state.loading = false;
      const _data = [];
      data.forEach((item) => {
        _data.push({
          ...item,
          label: item.name,
          value: item.id,
          icon: "LeftI1",
        });
      });
      state.sportsItemList = _data;
    };
    const getSportItemList = computed(() => state.sportsItemList);
    provide("SPORTS_ITEM_LIST", getSportItemList);

    // 投注方式
    const getBetType = computed(() => state.betType);
    const getBetInfo = computed(() => ({
      betType: state.betType,
      changeBetType: (e) => {
        state.betType = e;
      },
    }));
    provide("BET", getBetInfo);

    // 获取举办方信息
    const getCompetitionName = () => {
      queryCompetitionName().then((res) => {
        state.competitionList = res.map((item, index) => {
          item.label = item.competition_name;
          item.value = item.competition_name;
          item.icon = `LeftI${index + 1}`;
          return item;
        });
        competition.list = state.competitionList;
      });
    };

    const getCompetitionNameComputed = computed(() => {
      return competition.list;
    });

    provide("COMPETITION_NAME", getCompetitionNameComputed);
    const getCompetitionActive = computed(() => competition.active);
    provide("COMPETITION", {
      list: getCompetitionNameComputed,
      active: getCompetitionActive,
      setState: (data) => {
        for (let i in data) {
          competition[i] = data[i];
        }
      },
    });

    const handleGetMatchList = () => {
      queryMatches().then((res) => {
        state.matchList = res;
      });
    };

    const handleInLoop = () => {
      handleGetMatchList();
      setTimeout(() => {
        handleInLoop();
      }, 60 * 1000 * 10); // 10分钟轮询
    };

    const getMatchList = computed(() => state.matchList);
    provide("MATCH_LIST", getMatchList);

    provide("methods", {
      handleGetSportItemList: getSportItemListFn,
      setLoading: (e) => {
        state.loading = e;
      },
      betType: (e) => {
        if (typeof e === "undefined") {
          return state.betType;
        } else {
          state.betType = e;
        }
      },
      // 获取赛事信息
      handleGetMatchList: handleGetMatchList,
    });

    onMounted(() => {
      getCompetitionName();
      // handleGetMatchList();
      handleInLoop();
    });

    return {
      state,
    };
  },
});
</script>

<style lang="less" scoped>
.body {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
}
</style>
