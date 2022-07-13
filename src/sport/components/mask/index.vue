<template>
  <div>
    <transition name="fade">
      <div
        class="mark--full"
        v-if="state.visible"
        :style="{ background: 'rgba(0, 0, 0, 0.5)' }"
      ></div>
    </transition>
    <transition name="fade">
      <div
        class="alert__content"
        v-if="state.visible"
        :style="{ transitionDelay: '20ms' }"
      >
        <div class="content">heleo</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, watch } from "vue";

export default defineComponent({
  components: {},
  props: {
    visible: {
      type: Boolean,
    },
  },
  emits: ["update:visible"],
  setup(props, { emit }) {
    const state = reactive({
      visible: false,
    });

    watch(
      () => props.visible,
      (n) => {
        state.visible = n;
      },
      {
        immediate: true,
      }
    );

    watch(
      () => state.visible,
      (n) => {
        emit("update:visible", n);
      }
    );

    return {
      state,
    };
  },
});
</script>

<style scoped lang="less">
.flex {
  display: flex;
}
.flex_1 {
  flex-grow: 1;
}
.flex_0 {
  flex-shrink: 0;
}
.fade-enter-active {
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
}
.fade-leave-active {
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.full {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.mark--full {
  .full;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.5);
}
.noSelect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currentlynot supported by any browser */
}
.lastBtn {
  position: relative;
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background: #ddd;
    transform: scaleX(0.5);
    transform-origin: 0 0;
    content: "";
  }
}
.alert__content {
  z-index: 9999;
  .full;
  .content {
    width: 90%;
    max-width: 450px;
    overflow: hidden;
    display: block;
    margin: 0 auto;
    background: #fffbfb;
    position: relative;
    border-radius: 10px;
    text-align: center;
    .mark_content_main {
      padding: 20px;
    }
    .content__title {
      text-align: center;
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 10px;
      line-height: 18px;
    }
    .content__desc {
      color: #999;
      margin-top: 15px;
    }
    .icon_close {
      position: absolute;
      right: 10px;
      top: 10px;
      width: 20px;
    }
    .btn__group {
      position: relative;
      .noSelect;
      .flex;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        width: 100%;
        height: 1px;
        background: #eee;
        left: 0;
      }
      p {
        display: inline-block;
        vertical-align: middle;
        .flex_0;
        .flex_1;
        height: 45px;
        line-height: 45px;
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        &:active {
          background: #fff0f0;
        }
      }
    }
  }
}
</style>
