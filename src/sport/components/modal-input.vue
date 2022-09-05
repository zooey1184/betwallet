<template>
  <div class="input-wrap active-border-2 flex items-center">
    <input
      class="flex-1 input f4"
      v-model="state.value"
      :placeholder="placeholder"
      type="number"
      :maxlength="maxlength"
    />
    <Button
      type="primary"
      :loading="state.loading"
      v-if="confirm"
      class="roomConfirm flex-0 active-bg color-white"
      style="background: #ff0083"
      @click="handleConfirm"
    >
      <span class="cursor-pointer flex-0">{{ confirm }}</span>
    </Button>
  </div>
</template>

<script>
import { defineComponent, reactive, watch } from "vue";
import { Button } from "ant-design-vue";

export default defineComponent({
  components: {
    Button,
  },
  props: {
    confirm: {
      type: String,
      default: "CONFIRM",
    },
    value: {
      type: String,
    },
    placeholder: {
      type: String,
      default: "PLACE ENTER",
    },
    maxlength: {
      type: Number,
      default: 8,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["confirm", "update:value", "update:loading"],
  setup(props, { emit }) {
    const state = reactive({
      value: undefined,
      loading: false,
    });

    const handleConfirm = () => {
      emit("confirm");
    };

    watch(
      () => props.value,
      (n) => {
        state.value = n;
      },
      {
        immediate: true,
      }
    );
    watch(
      () => state.value,
      (n) => {
        emit("update:value", n);
      }
    );

    watch(
      () => props.loading,
      (n) => {
        state.loading = n;
      },
      {
        immediate: true,
      }
    );
    watch(
      () => state.loading,
      (n) => {
        emit("update:loading", n);
      }
    );

    return {
      state,
      handleConfirm,
    };
  },
});
</script>

<style lang="less" scoped>
.input-wrap {
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}
.input {
  padding-left: 8px;
  height: 42px;
  border: none;
  outline: none;
  line-height: 42px;
  font-size: 15px;
}
.roomConfirm {
  padding: 0 8px;
  height: 42px;
  min-width: 80px;
  text-align: center;
  line-height: 42px;
  font-size: 18px;
  border-radius: 4px;
  position: absolute;
  right: -2px;
  top: 0;
  transition: all 300ms linear;
  cursor: pointer !important;
  border: none;
  background: #ff0083 !important;
  &:hover {
    color: #fff;
    background: #ff0083 !important;
  }
  @media screen and (max-width: 700px) {
    font-size: 12px;
  }
}
</style>
