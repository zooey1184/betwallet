<template>
	<!-- class zyqTcN -->
  <div class="content Tc-MYJY Huans" v-if='state.visible'>
		<a href="JavaScript:;" class="Tclose zYQclose" @click='handleClose'></a>
		<div class="zyqTcNT flexC"><p>Default transaction speed</p><img src="../../images/zyq0425/wenhao.png"></div>
		<div class="TcFqT flexC">
			<a href="JavaScript:;" class="zyqTcNTa IndBac1 Huans">Standard(1)</a>
			<a href="JavaScript:;" class="zyqTcNTa Huans">fast(5)</a>
			<a href="JavaScript:;" class="zyqTcNTa Huans">instant(6)</a>
		</div>
		<div class="zyqTcNT flexC"><p>Default transaction speed</p></div>
		<div class="zyqTcNTs flexC"><p>Slippage tolerance</p>&nbsp;<img src="../../images/zyq0425/wenhao.png"></div>
		<div class="TcFqT flexC">
			<a href="JavaScript:;" class="zyqTcNTa IndBac1 Huans">5%</a>
			<a href="JavaScript:;" class="zyqTcNTa Huans">10%</a>
			<a href="JavaScript:;" class="zyqTcNTa Huans">20%</a>
		</div>
		<div class="zyqTcNT flexC"><p>Transaction cut-off time (minutes)</p><img src="../../images/zyq0425/wenhao.png"></div>
		<div class="TcFqT flexC">
			<a href="JavaScript:;" class="zyqTcNTa Huans">20</a>
		</div>
		<div class="zyqTcB zyqTcB1 IndBac1" @click='handleConfirm'>Confirm bet</div>
	</div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'

export default defineComponent({
	components: {},
	props: {
		visible: {
			type: Boolean
		}
	},
	emits: ['update:visible', 'close', 'confirm'],
	setup(props, {emit}) {
		const state = reactive({
			visible: props.visible
		})
		watch(() => props.visible, (n) => {
			state.visible = n
		}, {
			immediate: true
		})
		watch(() => state.visible, (n) => {
			emit('update:visible', n)
		})
		const handleClose = () => {
			emit('close')
			state.visible = false
		}
		const handleConfirm = () => {
			emit('confirm')
		}
		return {
			handleClose,
			handleConfirm,
			state
		}
	}
})
</script>

<style lang="less" scoped>
.content {
	width: 45%;
	min-width: 400px;
	max-width: 680px;
	position:fixed;
	z-index:1000;
	background:#222245;
	left:50%;
	top:50%;
	color:#cbcbe4;
	transform: translate(-50%,-50%); 
	padding:15px 23px 45px;
	border-radius:8px;
}
</style>