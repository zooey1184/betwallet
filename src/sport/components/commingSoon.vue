<template>
  <div class="mask" @touchmove.prevent v-if="state.visible">
    <div class="content">
      <img
        src="../images/close.png"
        @click="state.visible = false"
        class="closeImg"
        alt=""
      />
      <div class="ff active-color font-size-24 mt-16 text-align-center">
        WE ARE COMMING
        <div>SOON</div>
      </div>
      <div class="_desc">
        The module is still under development, so stay tuned
      </div>
      <div class="imgContentBg">
        <img
          src="../images/icons/soon.png"
          style="width: 70%; margin: 0 auto"
          alt=""
        />
      </div>
    </div>
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
  setup(props, { emit, expose }) {
    const state = reactive({
      visible: props.visible,
    });
    watch(
      () => props.visible,
      (n) => {
        state.visible = n;
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

<style lang="less" scoped>
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  .content {
    width: 30vw;
    border-radius: 10px;
    background: #172027;
    position: absolute;
    left: 50%;
    top: 200px;
    transform: translateX(-50%);
    font-size: 14px;
    max-width: 350px;
    height: 270px;
    padding: 24px;
    overflow: hidden;
  }
  @media (max-width: 400px) {
    .content {
      width: 80vw;
      top: 150px;
    }
  }
  .closeImg {
    position: absolute;
    right: 18px;
    top: 18px;
  }
  ._title {
    font-size: 20px;
  }
  ._desc {
    font-size: 14px;
    text-align: center;
    margin-top: 24px;
    color: rgb(196, 196, 196);
  }
  ._btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: -webkit-linear-gradient(
        359.94deg,
        #a86acf 0.05%,
        #46fcd2 99.95%
      ),
      #0c0c30 !important;
    background: linear-gradient(90.06deg, #a86acf 0.05%, #46fcd2 99.95%),
      #0c0c30 !important;
    border-radius: 10px;
    border: none;
    margin: 0 auto;
    margin-top: 40px;
    color: #000;
    user-select: none;
    cursor: pointer;
    &:active {
      opacity: 0.8;
    }
  }
}
.imgContentBg {
  position: absolute;
  opacity: 0.4;
  width: 100%;
  z-index: -1;
  height: 200px;
  left: -1%;
  bottom: 0;
}
</style>
