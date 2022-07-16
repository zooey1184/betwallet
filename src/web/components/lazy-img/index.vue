<template>
  <div>
    <transition name="fade">
      <img v-if="state.visible" class="w-100p" :src="src" alt="" />
    </transition>
    <transition name="fade flex items-center">
      <img
        v-if="state.coverVisible && cover"
        class="w-100p"
        :src="cover"
        alt=""
      />
    </transition>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from "vue";

export default defineComponent({
  components: {},
  props: {
    src: [String, Object],
    cover: [String, Object],
  },
  setup(props) {
    const state = reactive({
      visible: false,
      coverVisible: false,
    });

    const loadImg = (src) => {
      return new Promise((resolve) => {
        const Img = new Image();
        Img.src = src;
        Img.onload = () => {
          resolve();
        };
      });
    };

    onMounted(() => {
      if (props.cover) {
        loadImg(props.cover).then(() => {
          state.coverVisible = true;
          loadImg(props.src).then(() => {
            setTimeout(() => {
              state.coverVisible = false;
            }, 300);
            setTimeout(() => {
              state.visible = true;
            }, 1500);
          });
        });
      }
    });

    return {
      state,
    };
  },
});
</script>
