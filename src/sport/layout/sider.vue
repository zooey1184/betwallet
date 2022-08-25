<template>
  <div
    :style="{
      overflow: 'auto',
      position: collapse ? 'absolute' : 'relative',
      height: 'calc(100vh - 120px)',
      overflowX: 'hidden',
      overflowY: 'auto',
      zIndex: 9,
    }"
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
    <div class="t">
      <SideItem v-for="(item, index) in getRaceList">
        <template #title>
          <div
            class="leftItem flex items-center justify-between"
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
          </div>
        </template>
        <div class="overflow-y-auto">
          <div v-for='item in 50'>{{item}}</div>
        </div>
      </SideItem>
    </div>
    <SideItem v-for="(item, index) in getRaceList">
      <template #title>
        <div
          class="leftItem flex items-center justify-between"
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
        </div>
      </template>
      <div>
        <div v-for='item in 10'>{{item}}</div>
      </div>
    </SideItem>
  </div>
</template>

<script>
import { computed, defineComponent, inject, reactive } from "vue";
import { useRouter } from "vue-router";
import SideItem from './siderItem.vue'

export default defineComponent({
  components: {
    SideItem
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
    const SPORT_RACE = inject('SPORT_RACE')
    const getRaceList = computed(() => SPORT_RACE.races?.value || [])
    const COMPETITION_ACTIVE = computed(() => COMPETITION.active.value);

    const handlePick = (e) => {
      state.active = e.value;
      router.push("/");
      COMPETITION.setState({
        active: e.value,
      });
    };

    const handlePickRace = (item) => {
      SPORT_RACE.handleGetCompetitionName(item.id).then(res => {
        console.log(res)
      })
    }

    return {
      state,
      handlePick,
      getRaceList,
      handlePickRace,
      COMPETITION_ACTIVE,
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
</style>
