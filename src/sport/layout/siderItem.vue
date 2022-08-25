<template>
  <div>
    <div @click="state.visible=!state.visible">
      <slot name="title">
      {{ title }}
    </slot>
    </div>
    <!-- <div class="bg-white flex items-center justify-between">
      <div class="flex-1">
        <slot name="content"></slot>
      </div>
    </div> -->

    <div v-if="collapseable">
      <div ref="contentRef" :style="{ maxHeight: `${state.height}px` }" class="collapse-body">
        <div ref="bodyRef" class="content primary-dark-bg">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, defineComponent, reactive, watch, onMounted } from 'vue'
  import { DownOutlined } from '@ant-design/icons-vue'

  const MAX_HEIGHT = 100
  export default defineComponent({
    components: {
      DownOutlined
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      title: {
        type: String
      },
      collapseable: {
        type: Boolean,
        default: true
      },
      showArrow: {
        type: Boolean
      }
    },
    emits: ['update:visible', 'change'],
    setup(props, { emit }) {
      const contentRef = ref()
      const bodyRef = ref()

      const state = reactive({
        visible: props.visible,
        height: 0
      })

      watch(
        () => props.visible,
        n => {
          state.visible = n
        },
        {
          immediate: true
        }
      )
      watch(
        () => state.visible,
        n => {
          emit('update:visible', n)
          if (state.visible) {
            // state.height = getBodyHeight()
            // setTimeout(() => {
            //   state.height = MAX_HEIGHT
            // }, 200)
            state.height = MAX_HEIGHT
          } else {
            // state.height = getBodyHeight()
            state.height = 0
          }
          emit('change', state.visible)
        }
      )

      const getBodyHeight = () => {
        const body = bodyRef.value
        const bodyRect = body.getBoundingClientRect()
        return bodyRect?.height || 0
      }

      const handleToggleVisible = () => {
        state.visible = !state.visible
      }

      // onMounted(() => {
      //   if (contentRef.value && props.collapseable) {
      //     if (state.visible) {
      //       const h = getBodyHeight()
      //       state.height = h
      //       setTimeout(() => {
      //         state.height = MAX_HEIGHT
      //       }, 200)
      //     }
      //   }
      // })

      return {
        contentRef,
        bodyRef,
        state,
        handleToggleVisible
      }
    }
  })
</script>

<style lang="less" scoped>
  .trans {
    transition: all 200ms linear;
  }
  .arrow {
    .trans;
  }
  .arrow-up {
    transform: rotate(180deg);
  }
  .collapse-title {
    font-size: 16px;
    font-weight: 600;
  }
  .collapse-header {
    border-bottom: 1px solid rgba(241, 241, 241, 1);
    .trans;
  }
  .collapse-header-c {
    border-bottom: 1px solid rgba(241, 241, 241, 0);
  }
  .collapse-body {
    overflow: hidden;
    .trans;
  }
  .collapse-pane {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-top: 1px solid #f1f1f1;
  }
  .content {
    height: 100%;
    overflow: auto;
  }
</style>
