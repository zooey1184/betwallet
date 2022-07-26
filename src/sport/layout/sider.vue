<template>
  <div
    :style="{
      overflow: 'auto',
      position: collapse ? 'absolute' : 'relative',
      height: 'calc(100vh - 120px)',
      overflowX: 'hidden',
      overflowY: 'auto',
    }"
  >
    <div
      class="leftItem flex items-center justify-between"
      v-for="(item, index) in state.options"
      :class="{ 'active-bg': state.active === item.value }"
      :style="{ width: collapse ? '40px' : '230px' }"
      @click="handlePick(item)"
    >
      <div class="flex items-center flex-1" style="max-width: 200px">
        <i class="leftIcon flex-0 LeftI1"></i>
        <p>{{ item.label }}0000000000000000000000</p>
      </div>
      <div class="count active-bg flex-0 flex items-center justify-center">
        8
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";

export default defineComponent({
  components: {},
  props: {
    collapse: {
      type: Boolean,
    },
  },
  setup(props) {
    const state = reactive({
      options: [
        {
          label: "我是1",
          value: "0",
        },
        {
          label: "我是1",
          value: "1",
        },
        {
          label: "我是1",
          value: "2",
        },
        {
          label: "我是1",
          value: "3",
        },
        {
          label: "我是1",
          value: "4",
        },
        {
          label: "我是1",
          value: "5",
        },
        {
          label: "我是1",
          value: "6",
        },
        {
          label: "我是1",
          value: "7",
        },
        {
          label: "我是1",
          value: "8",
        },
        {
          label: "我是1",
          value: "9",
        },
        {
          label: "我是1",
          value: "10",
        },
        {
          label: "我是1",
          value: "11",
        },
        {
          label: "我是1",
          value: "12",
        },
        {
          label: "我是1",
          value: "13",
        },
        {
          label: "我是1",
          value: "14",
        },
        {
          label: "我是1",
          value: "15",
        },
        {
          label: "我是1",
          value: "16",
        },
        {
          label: "我是1",
          value: "133",
        },
      ],
      active: "",
    });

    const handlePick = (e) => {
      state.active = e.value;
    };

    return {
      state,
      handlePick,
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
.leftItem {
  height: 38px;
  line-height: 38px;
  transition: all 200ms linear;
  overflow: hidden;
  border-radius: 10px;
  padding-right: 8px;
  position: relative;
  margin: 8px 0;
  padding-right: 8px;
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
.count {
  border-radius: 20px;
  width: 16px;
  height: 16px;
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
