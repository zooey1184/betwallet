<template>
  <div class="content" :style="circleStyle">
    <div class="box"></div>
    <div v-for='item in options' class="chidle-circle">
      {{item}}
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {},
  props: {
    options: {
      type: Array
    },
    radius: {
      type: Number,
      default: 150
    }
  },
  setup(props) {
    return {
      circleStyle: {
        width: props.radius + 'px',
        height: props.radius + 'px',
      }
    }
  }
})
</script>

<style lang="less" scoped>
.content { 
  position: relative;
  box-sizing: border-box; 
  padding: 3px; 
  border-radius: 50%; 
  background-image: -webkit-linear-gradient(top, #55ecf7 10%, rgb(255, 187, 0) 60%,);  
  background-image: -moz-linear-gradient(top, #55ecf7 10%, rgb(255, 187, 0) 60%); 
  background-image: linear-gradient(top, #55ecf7 10%, rgb(255, 187, 0) 60%);
  transition: all 1500ms linear;
  &:hover {
    transform: rotate(130deg);
  }
}
.box { 
	width:100%; 
  height:100%;
  border-radius:50%; 
  background:#fff; 
}
.chidle-circle {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  overflow: hidden;
  top: 0;
  left: 0;
  background: #55ecf7;
}
</style>