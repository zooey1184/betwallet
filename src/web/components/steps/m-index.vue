<template>
  <div ref="container">
    <div class="line">
      <div
        class="bar"
        :style="{ left: state.left + 'px', width: state.width + 'px' }"
      ></div>
      <div class="flex items-center">
        <div
          class="item"
          :ref="refMap[item.value]"
          :class="{ 'color-gold': state.active === index }"
          @click="handlePickItem(item, index)"
          v-for="(item, index) in options"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="mt-16">
        <template v-if='options[state.active].desc'>
          <div v-if='typeof options[state.active].desc ==="string"'>{{options[state.active].desc}}</div>
          <template v-if='typeof options[state.active].desc ==="object"'>
            <div class="desc grey mt-8 desc_item" v-for='item in options[state.active].desc'>
              {{item}}
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";

export default defineComponent({
  components: {},
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    active: {
      type: Number,
      default: 0,
    },
  },
  emits: ["update:active", "change"],
  setup(props, { emit }) {
    const state = reactive({
      active: props.active,
      left: 16,
      width: 42,
    });

    watch(
      () => props.active,
      (n) => {
        state.active = n;
        const _contaier = container.value;
        const item = props.options[n];
        const rect = _contaier.getBoundingClientRect();
        const _item = refMap.value[item.value].value[0];
        const _itemR = _item.getBoundingClientRect();
        const _left = _itemR.x - rect.x;
        state.width = _itemR.width;

        state.left = _left;
      }
    );

    watch(
      () => state.active,
      (n) => {
        emit("update:active", n);
        emit("change", n);
      }
    );

    const container = ref();

    const rect = reactive({});
    const refMap = computed(() => {
      const m = {};
      props.options.forEach((item) => {
        m[item.value] = ref();
      });
      return m;
    });

    const handlePickItem = (item, index) => {
      const _contaier = container.value;
      const rect = _contaier.getBoundingClientRect();
      const _item = refMap.value[item.value].value[0];
      const _itemR = _item.getBoundingClientRect();
      const _left = _itemR.x - rect.x;
      state.active = index;
      state.width = _itemR.width;

      state.left = _left;
    };

    onMounted(() => {});

    return {
      state,
      refMap,
      container,
      handlePickItem,
    };
  },
});
</script>

<style lang="less" scoped>
.line {
  position: relative;
  padding: 16px;
  border-top: 1px solid #fff;
}
.bar {
  height: 6px;
  position: absolute;
  left: 16px;
  top: -3px;
  width: 20px;
  background: rgb(0, 225, 255);
  transition: all 200ms linear;
}
.item {
  margin-right: 20px;
  text-align: center;
  &:last-child {
    margin-right: 0;
  }
}
.desc_item {
  padding-left: 15px;
  position: relative;
  &::before {
    position: absolute;
    top: 7px;
    left: 0;
    content: "";
    background: #fff;
    width: 5px;
    height: 5px;
    border-radius: 5px;
  }
}
</style>
