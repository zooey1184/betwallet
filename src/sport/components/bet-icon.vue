<template>
  <Icon>
    <template #component="svgProps">
      <svg
        t="1660997293562"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="38314"
        width="32"
        height="32"
        v-bind="svgProps"
      >
        <path
          d="M128 298.666667v85.333333a128 128 0 0 1 0 256v85.333333h768v-85.333333a128 128 0 0 1 0-256V298.666667H128z m853.333333-85.333334v256h-85.333333a42.666667 42.666667 0 0 0 0 85.333334h85.333333v256H42.666667v-256h85.333333a42.666667 42.666667 0 0 0 0-85.333334H42.666667V213.333333h938.666666z"
          p-id="38315"
          v-bind="svgProps"
        ></path>
        <path
          d="M554.666667 682.666667h-85.333334v-85.333334h85.333334v85.333334z m0-128h-85.333334v-85.333334h85.333334v85.333334z m0-128h-85.333334V341.333333h85.333334v85.333334z"
          p-id="38316"
          v-bind="svgProps"
        ></path>
      </svg>
    </template>
  </Icon>
</template>

<script>
import { defineComponent, reactive } from "vue";
import Icon from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    Icon,
  },
  setup(props) {
    const state = reactive({});

    return {
      state,
    };
  },
});
</script>
