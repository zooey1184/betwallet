<template>
  <div
    :style="{
      overflow: 'auto',
      position: collapse ? 'absolute' : 'relative',
      overflowX: 'hidden',
      overflowY: 'auto',
      zIndex: 9,
    }"
    class="siderPane"
  >
    <!-- <div
      class="leftItem flex items-center justify-between"
      v-for="(item, index) in getRaceList"
      :class="{ 'active-bg': COMPETITION_ACTIVE === item.value }"
      :style="{ width: collapse ? '40px' : '230px' }"
      @click="handlePickRace(item)"
    >
      <div class="flex items-center flex-1" style="max-width: 200px">
        <i class="leftIcon flex-0 LeftI2"></i>
        <p>{{ item.label }}</p>
      </div>
      <div class="count active-bg flex-0 flex items-center justify-center">
        {{ item.count }}
      </div>
    </div> -->
    <div
      class="t cursor-pointer"
      v-for="(item, index) in getRaceList"
      :style="{ width: collapse ? '40px' : '230px' }"
    >
      <SideItem :visible="item.id === state.active" :collapseable="!collapse">
        <template #title>
          <div
            class="leftItem flex ff items-center justify-between slideItemTitle"
            :class="{ 'active-bg': state.active === item.id }"
            @click="handlePickRace(item)"
          >
            <div class="flex items-center flex-1" style="max-width: 200px">
              <img
                src="../images/icons/matchItem-icon-active.png"
                style="padding: 9px"
                v-if="item.id === state.active"
                alt=""
              />
              <img
                src="../images/icons/matchItem-icon.png"
                style="padding: 9px; width: 40px"
                v-else
                alt=""
              />
              <p
                class="ml-8"
                :class="{ 'font-weight-600': item.id === state.active }"
              >
                {{ item.label }}
              </p>
            </div>
            <div
              class="count active-bg flex-0 flex items-center justify-center"
            >
              {{ item.count }}
            </div>
          </div>
        </template>
        <div class="overflow-y-auto">
          <div
            v-for="item in getCompetitionMap[item.id]"
            @click="handlePick(item)"
            :class="{ activeItem: COMPETITION_ACTIVE === item.value }"
            class="competitionItem flex items-center justify-between f1"
          >
            <div
              class="flex items-center flex-1 ellipsis-1"
              style="max-width: 200px"
            >
              {{ item.label }}
            </div>
            <div
              class="flex-0 flex items-center count active-bg color-white justify-center"
            >
              {{ item.count }}
            </div>
          </div>
        </div>
      </SideItem>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, inject, reactive } from "vue";
import { useRouter } from "vue-router";
import SideItem from "./siderItem.vue";

export default defineComponent({
  components: {
    SideItem,
  },
  props: {
    collapse: {
      type: Boolean,
    },
    options: {
      type: Array,
    },
  },
  setup(props) {
    const router = useRouter();
    const state = reactive({
      options: [],
      active: "",
    });
    const COMPETITION = inject("COMPETITION");
    const SPORT_RACE = inject("SPORT_RACE");
    const getRaceList = computed(() => SPORT_RACE.races?.value || []);
    const COMPETITION_ACTIVE = computed(() => COMPETITION.active.value);
    const getCompetitionMap = computed(() => SPORT_RACE.competitionMap.value);

    const handlePick = (e) => {
      router.push("/");
      COMPETITION.setState({
        active: e.value,
      });
    };

    const handlePickRace = (item) => {
      if (state.active === item.id) {
        state.active = "";
      } else {
        state.active = item.id;
        SPORT_RACE.handleGetCompetitionName(item.id).then((res) => {
          console.log(res);
        });
      }
    };

    return {
      state,
      handlePick,
      getRaceList,
      handlePickRace,
      COMPETITION_ACTIVE,
      getCompetitionMap,
    };
  },
});
</script>

<style lang="less" scoped>
.item {
  height: 42px;
  line-height: 42px;
  &:hover {
    width: 100%;
  }
}
.leftIcon {
  width: 28px;
  height: 28px;
  background-size: 28px;
  margin: 0 8px;
  background-repeat: no-repeat;
}
.t {
  transition: all 200ms linear;
  position: relative;
  border-radius: 8px;
  // overflow: hidden;
  &:hover {
    background: #ff0083;
    width: 230px !important;
  }
  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.leftItem {
  height: 38px;
  line-height: 38px;
  transition: all 200ms linear;
  overflow: hidden;
  border-radius: 10px;
  padding-right: 8px;
  position: relative;
  padding-right: 8px;
  // &:hover {
  //   background: #ff0083;
  //   width: 230px !important;
  // }
  // p {
  //   overflow: hidden;
  //   white-space: nowrap;
  //   text-overflow: ellipsis;
  // }
}
.count {
  border-radius: 20px;
  width: 20px;
  height: 20px;
}

.pane {
  position: absolute;
  left: 100px;
  width: 200px;
  height: 40px;
  background: #ff0083;
  color: #fff;
  top: 0;
}
.competitionItem {
  height: 38px;
  line-height: 38px;
  padding: 0 16px;
  color: #e9e9e9;
  transition: all 100ms linear;
  &:hover {
    background: #ff00844a;
    font-family: var(--f5);
    // font-weight: 600;
    color: #fff;
  }
}
.activeItem {
  border-left: 4px solid var(--primary-main);
  color: #ff0083 !important;
  font-family: var(--ff);
}
.slideItemTitle {
  font-weight: 400;
  &:hover {
    font-weight: 600;
  }
}
.siderPane {
  height: calc(100vh - 120px);
  @media screen and (max-width: 1440px) {
    height: calc(100vh - 130px);
  }
}
</style>
