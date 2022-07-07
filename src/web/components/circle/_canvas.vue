<template>
  <div class="pos-r">
    <div class="pos-a main-logo">
      <img class="w-100p" :src='Logo' />
    </div>
    <canvas :width="canvasRadius" :height="canvasRadius" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" ref="canvas"></canvas>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from "vue";
import FadeLogo from '../fade-logo'
import C3_1 from '../../assets/c3-1.png'
import C3_2 from '../../assets/c3-2.png'
import C3_3 from '../../assets/c3-3.png'
import C3_4 from '../../assets/c3-4.png'
import C2_2 from '../../assets/c2-2.png'
import C2_1 from '../../assets/c2-1.png'
import C1_1 from '../../assets/c1-1.png'
import C1_2 from '../../assets/c1-2.png'
import Logo from '../../assets/part6.png'

export default defineComponent({
  components: {
    FadeLogo
  },
  props: {
    radius: {
      type: [String, Number],
      default: 580
    },
    imgRadius: {
      type: Number,
      default: 27
    },
    perRadius: {
      type: Number,
      default: 60
    },
    initR: {
      type: Number,
      default: 70
    }
  },
  setup(props) {
    const canvas = ref();
    const RADIUS = props.radius
    const OFFSET = 6
    const canvasRadius = computed(() => Number.parseInt(RADIUS) + OFFSET)

    const isStop = ref(false)

    const handleMouseEnter = (e) => {
      isStop.value = true
    }
    const handleMouseLeave = (e) => {
      isStop.value = false
    }

    onMounted(() => {
      const ctx = canvas.value.getContext("2d");
      const PER_R = props.perRadius
      const INIT_R = props.initR
      function drawTrack() {
        for (var i = 0; i < 3; i++) {
          ctx.beginPath();
          
          ctx.arc((RADIUS+4)/2, (RADIUS+4)/2, (i + 1) * PER_R + INIT_R, 0, 2 * Math.PI, false);
          // const gt = ctx.createRadialGradient(RADIUS, RADIUS, 30, RADIUS+50, RADIUS+50, 130)
          const gt = ctx.createLinearGradient(0, RADIUS, RADIUS * 2, RADIUS)
          gt.addColorStop(0, '#c17bfd');
          gt.addColorStop(0.3, '#c17bfd')
          gt.addColorStop(0.5, '#376dfa')
          gt.addColorStop(1, '#376dfa');
          // ctx.strokeStyle = "#fff";
          ctx.strokeStyle = gt
          ctx.lineWidth = 2
          ctx.stroke();
          ctx.closePath();
        }
      }
      drawTrack();

      class Star {
        constructor(x, y, radius, cycle, offset = 0, imgSRC) {
          this.x = x;
          this.y = y;
          this.radius = radius;
          this.cycle = cycle;

          this.color = null;
          this.time = 0;
          this.dampx = 2 // 阻尼系数
          const img = new Image()
          img.src = imgSRC
          this.img = img
          this.step = offset // 偏移量
        }
        draw(ctx, isStop) {
          ctx.beginPath();
          ctx.save();
          ctx.translate(RADIUS/2, RADIUS/2);
          
          this.step += Math.PI/(600 + this.cycle)
          this.x = this.radius * Math.cos(this.step)
          this.y = this.radius * Math.sin(this.step);
          const imgRadius = props.imgRadius

          ctx.arc(this.x, this.y, imgRadius+2, 0, 2 * Math.PI, false);
          
          this.color = ctx.createRadialGradient(
            this.x,
            this.y,
            0,
            this.x,
            this.y,
            this.radius
          );
          this.color.addColorStop(0, "#A69888");
          this.color.addColorStop(1, "#5c3616");
          ctx.fillStyle = this.color;
          ctx.fill();
          ctx.clip()
          
          
          ctx.drawImage(this.img, this.x-imgRadius, this.y-imgRadius, imgRadius*2, imgRadius*2);
          ctx.restore();
          
          // img.onload = () => {
            
          // }
          ctx.closePath();
          if (!isStop) {
            this.time += 1;
            this.dampx = 2
          } else {
            this.dampx += 0.3
            this.time += (1/this.dampx);
          }
          
        }
      }

      const FIRST_C = props.perRadius + props.initR
      const SECOND_C = props.perRadius*2 + props.initR
      const THREE_C = props.perRadius*3 + props.initR
      const CircleC1_1 = new Star(0, 0, FIRST_C, 10, 89.5, C1_1);
      const CircleC1_2 = new Star(0, 0, FIRST_C, 10, 30, C1_2);
      const CircleC2_1 = new Star(0, -150, SECOND_C, -80, 60, C2_1);
      const CircleC2_2 = new Star(0, -150, SECOND_C, -80, 220, C2_2);
      const CircleC3_1 = new Star(0, -100, THREE_C, -300, 0, C3_1);
      const CircleC3_2 = new Star(0, -100, THREE_C, -300, 10.3, C3_2);
      const CircleC3_3 = new Star(0, -100, THREE_C, -300, 21.12, C3_3);
      const CircleC3_4 = new Star(0, -100, THREE_C, -300, 36.2, C3_4);

      

      function move(isStop) {
        ctx.clearRect(0, 0, 1000, 1000);
        drawTrack();

        CircleC1_1.draw(ctx);
        CircleC1_2.draw(ctx)
        CircleC2_1.draw(ctx, isStop);
        CircleC2_2.draw(ctx, isStop);
        CircleC3_1.draw(ctx, isStop);
        CircleC3_2.draw(ctx, isStop);
        CircleC3_3.draw(ctx, isStop);
        CircleC3_4.draw(ctx, isStop);
      }
      function anim() {
        requestAnimationFrame(function () {
          if (!isStop.value) {
            move();
          } else {
            move(true);
          }
          
          anim();
        });
      }
      anim();
    });

    return {
      canvas,
      canvasRadius,
      Logo,
      handleMouseEnter,
      handleMouseLeave
    };
  },
});
</script>


<style lang="less" scoped>
.canvas {
  width: 54vw;
  height: 54vw;
}
.main-logo {
  width: 200px;
  height: 200px;
  left: 50%;
  top: 53%;
  transform: translate(-50%, -50%);
  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
  }
}
</style>