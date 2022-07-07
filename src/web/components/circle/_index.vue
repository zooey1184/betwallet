<template>
  <div class="circle">
    <svg
      width="100%"
      height="100%"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="50%" y1="0%" x2="75%" y2="100%">
          <stop offset="0%" stop-color="#F79533">
            <animate
              attributeName="stop-color"
              values="#F79533; #F37055; #EF4E7B; #A166AB; #5073B8; #1098AD; #07B39B; #6DBA82; #F79533"
              dur="4s"
            ></animate>
          </stop>

          <stop offset="100%" stop-color="#F79533">
              <!-- repeatCount="indefinite" -->
            
            <animate
              attributeName="stop-color"
              values="#F37055; #EF4E7B; #A166AB; #5073B8; #1098AD; #07B39B; #6DBA82; #F79533; #F37055"
              dur="4s"
            ></animate>
          </stop>
        </linearGradient>
      </defs>
      <circle
        cx="100"
        class="stroke"
        cy="50"
        r="40"
        stroke="black"
        stroke-width="2"
        fill="transparent"
      />
    </svg>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {},
  props: {
    options: {
      type: Array,
    },
  },
  setup(props) {
    return {};
  },
});
</script>

<style lang="less" scoped>

.stroke {
  fill: transparent;
  stroke-width: 4px;
  stroke: url('#logo-gradient');
}

@keyframes draw {
  0% {
    stroke-dasharray: 140 540;
    stroke-dashoffset: -474;
    stroke-width: 6px;
  }
  100% {
    stroke-dasharray: 760;
    stroke-dashoffset: 0;
    stroke-width: 2px;
  }
}
</style>
