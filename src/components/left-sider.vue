<template>
  <article class="LeftCn Huans" :class="{LeftCO: !state.visible}">
		<ul class="LeftUl content" :style="{height: state.height, position: state.visible ? 'relative' : 'absolute'}">
			<li v-for='(item, index) in state.list' >
				<a href="javascript:;" class="LeftUla flexC" :class="{'on': state.active === item.value}">
					<i class="LeftI" :class="item.icon"></i>
          <p>{{item.label}}</p>
          <span>{{item.count}}</span>
				</a>
			</li>
		</ul>


		<div class="LeftF flexC fl-bet">
			<!-- 多语言 -->
			<a href="javascript:;" class="LeftFQ flexC fl-cen"><img src="../images/zyq0425/qi01.png"></a>
			<!-- qa -->
			<div class="LeftW"><img src="../images/icon03.png"></div>
			<!-- 展开 -->
			<a href="javascript:;" @click="handleToggleVisible" class="LeftRe"></a>
		</div>
	</article>
</template>

<script>
import { defineComponent, reactive, ref, watch } from 'vue'

export default defineComponent({
  components: {},
  props: {
		active: {
			type: [String, Number]
		}
	},
	emits: ['update:active'],
  setup(props, {emit}) {
    const state = reactive({
      active: props.active,
			posIndex: 0,
			visible: false,
      list: [
        {
          label: 'Bundesliga',
          value: 'Bundesliga',
          count: 23,
          icon: 'LeftI1',
        },
      ],
			height: 'calc(100vh - 160px)'
    })

		watch(() => props.active, (n) => {
			state.active = n
		}, {
			immediate: true
		})
		watch(() => state.active, (n) => {
			emit('update:active', n)
		})

		// 点击展开 收缩
		const handleToggleVisible = () => {
			state.visible = !state.visible
			if (state.visible) {	
				state.height = 'calc(100vh - 120px)'
			} else {
				state.height = 'calc(100vh - 160px)'
			}
		}

    return {
      state,
			handleToggleVisible
    }
  }
})
</script>

<style lang="less" scoped>
.btm {
	position: fixed;
	bottom: 0;
	left: 0;
}
.content {
	height: calc(100vh - 185px);
	overflow-y: auto;
	overflow-x: hidden;
	position: absolute;
}
.on {
	background: rgba(10, 14, 23, 0.801);
}
</style>