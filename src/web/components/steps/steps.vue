<template>
  <div v-if='align==="right"'>
    <div class="flex justify-end">
      <Arrow dir='up' @click="handleClickUp" :disabled="state.active===0" />
    </div>
    <div class="line_right">
      <div class="desc_hidden subTitle bg-blue" ref='clientRectRef'>TEST</div>
      <div class="bar_right" :style="{top: (state.step*state.active+20)+'px'}"></div>
      <div v-for='(item, index) in options' @click="state.active = index" class="item text-align-right">
        <Pane :visible='state.active===index' :title='item.label' :desc='item.desc' />
      </div>
    </div>
    <div class="flex justify-end">
      <Arrow dir='down' @click='handleClickDown' :disabled="state.active===options.length-1" />
    </div>
  </div>

  <div v-if='align==="around"' class="flex items-center">
    <div style="width: 10vw;" class="content-pane mr-24 flex flex-col">
      <div v-for='item in options[state.active].desc' class="desc_item text-align-right">
        {{item}}
      </div>
    </div>
    
    <div>
      <div>
        <Arrow dir='up' @click="handleClickUp" :disabled="state.active===0" />
      </div>
      <div class="line_left">
        <div class="pl-24 por-r">
          <div class="desc_hidden subTitle bg-blue" ref='clientRectRef'>TEST</div>
          <div class="bar" style="height: 30px" :style="{top: (48*state.active+18)+'px'}"></div>
          <div v-for='(item, index) in options' @click="state.active = index" class="cursor-pointer item_around">
            <Pane :visible='state.active===index' :title='item.label' />
          </div>
        </div>
      </div>
      <div>
        <Arrow dir='down' @click='handleClickDown' :disabled="state.active===options.length-1" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, watch, nextTick, computed, watchEffect } from 'vue'
import Arrow from './arrow.vue'
import Pane from './pane.vue'

export default defineComponent({
  components: {
    Arrow,
    Pane
  },
  props: {
    options: {
      type: Array,
      default: ()=> ([])
    },
    active: {
      type: Number,
      default: 0
    },
    align: {
      type: String,
      default: 'right'
    }
  },
  emits: ['update:active', 'change'],
  setup(props, {emit}) {
    const clientRectRef = ref()

    const state = reactive({
      active: props.active,
      step: 46
    })

    watch(() => props.active, (n) => {
      state.active = n
    })

    watch(() => state.active, (n) => {
      emit('update:active', n)
      emit('change', n)
    })

    const handleClickDown = () => {
      if(state.step < 5) {
        const c = clientRectRef.value
        const rect = c.getBoundingClientRect()
        state.step = rect.height + 20
      }
      if (state.active < props.options.length - 1) {
        state.active++
      }
    }
    const handleClickUp = () => {
      if (state.active > 0) {
        state.active--
      }
    }

    
    watchEffect(() => {
      if (clientRectRef.value) {
        const c = clientRectRef.value
        const rect = c.getBoundingClientRect()
        console.log(rect.height);
        state.step = rect.height + 20
      }
    })

    return {
      state,
      clientRectRef,
      handleClickDown,
      handleClickUp,
    }
  }
})
</script>

<style lang="less" scoped>
.circle {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 2px solid #1890ff;
}
.line {
  position: relative;
  border-left: 1px solid #606f8a;
  padding: 16px 0;
  padding-left: 12px;
  margin: 10px 0;
}
.line_left {
  position: relative;
  border-left: 1px solid #606f8a;
  padding: 16px 0;
  padding-left: 12px;
  margin: 10px 0;
  margin-left: 30px;
}
.line_right {
  position: relative;
  border-right: 1px solid #606f8a;
  padding: 16px 0;
  padding-right: 32px;
  margin: 16px 30px;
  transition: all 100ms linear;
}
.line_center {
  margin: 16px;
  transition: all 100ms linear;
}
.bar {
  position: absolute;
  width: 6px;
  height: 20px;
  background: #3098fe;
  left: -3px;
  top: 16px;
  transition: all 300ms linear;
}
.bar_right {
  position: absolute;
  width: 10px;
  height: 24px;
  background: #3098fe;
  right: -5px;
  top: 16px;
  transition: all 300ms linear;
}
.item {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.item_around {
  height:48px;
  &:last-child {
    height: 32px;
  }
}
.desc {
  max-height: 1px;
  transition: all 150ms linear;
  overflow: hidden;
}
.desc_act {
  max-height: 20px;
}
.desc_item {
  position: relative;
  padding-right: 16px;
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0;
  }
  &:after {
    content: "";
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 7px;
    background: rgb(53, 53, 53);
    top: 8px;
    right: 0;
  }
}
.desc_hidden {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.content-pane {
  color: #333;
  min-height: 15vh;
  padding: 24px;
  border-radius: 34px;
  background: linear-gradient(145deg, #d9d8dc, #ffffff);
}
</style>