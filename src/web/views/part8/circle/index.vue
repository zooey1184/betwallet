<template>
  <div class="pos-r" @click="handleClick">
    <div class="circle  cursor-pointer bg z-index-9" :style="{width: getSize, height: getSize}" :class="{active: solid}">
      
      <div class="description" v-if='desc'>{{desc}}</div>
      <div class="content">
        <slot></slot>
      </div>
      <img class="w-100p" v-if='!solid' src="../../../assets/circle-dashed.png" alt="">
      <img class="w-100p active" v-else src="../../../assets/circled.png" alt="">
    </div>
    <div class="dashed pos-a " :style="{transform: `rotateZ(${rotate}deg)`, width: getSize,}" v-if='showLine'>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#13DCDD; stop-opacity:1" />
          <stop offset="50%" style="stop-color:#FA87CA; stop-opacity:1" />
          <stop offset="100%" style="stop-color:#FFD58A;stop-opacity:1" />
        </linearGradient>
      </defs>
        <g fill="none">
          <path stroke="url(#grad1)" stroke-width="3" stroke-dasharray="5,5" :d="`M0 0 l${lineSize} 1`" />
        </g>
      </svg>
    </div>
  </div>
  
</template>

<script>
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  components: {},
  props: {
    solid: {
      type: Boolean,
    },
    size: {
      type: [String, Number],
      default: '164'
    },
    lineSize: {
      type: Number,
      default: 200
    },
    rotate: {
      type: [Number, String],
      default: 50
    },
    showLine: {
      type: Boolean,
      default: true
    },
    desc: String
  },
  emits: ['click'],
  setup(props, {emit}) {
    const getSize = computed(() => {
      const s = props.size
      if (typeof s === 'number') {
        return `${s}px`
      } else if (typeof s === 'string') {
        if (s.match(/[px,rem,em,vw,vh]$/)) {
          return s
        } else {
          return `${s}px`
        }
      }
    })
    const handleClick = () => {
      emit('click')
    }
    return {
      getSize,
      handleClick
    }
  }
})
</script>

<style lang="less" scoped>
.circle {
  position: relative;
  border-radius: 10000px;
  overflow: hidden;
  
  &:hover {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    .description {
      transform: translateY(0);
    }
  }
}
.dashed {
  height: 1px;
  top: 49%;
  left: 50%;
  overflow: hidden;
  transform-origin: left top;
  transition: all 300ms linear;
}
.content {
  position: absolute;
  width: 90%;
  left: 5%;
  top: 5%;
  height: 90%;
  overflow: hidden;
}
.active {
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.7);
  border-radius: 1000px;
  animation: shadow 2000ms linear infinite;
}
@keyframes shadow {
  0% {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.1);
  }
  50% {
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.7);
  }
  100% {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.1);
  }
}
.description {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 1000px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  top: 0;
  left: 0;
  transform: translateY(-100%);
  transition: all 300ms linear;
  
}
</style>