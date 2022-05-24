<template>
  <header class="header flexC fl-bet Huans">
		<a href="javascript:;" class="hdlogo flexC"><img src="../images/logo.png"></a>
		<div class="hdR flexC">
			<a href="javascript:;" class="hdRCon flexC" @click='handleShow' v-if='state.visible'>
				<div class="hdRConI"></div>
				<div class="hdRConP">ID: {{ID}}</div>
			</a>
			<a href="javascript:;" v-else class="hdBut IndBac1" @click='handleConnect'>Connect wallet</a>
		</div>
	</header>
</template>

<script>
import { defineComponent, reactive, ref, watch, onMounted } from 'vue'

export default defineComponent({
  components: {},
  props: {
    userInfo: {
      type: Object
    },
    ID: {
      type: [String, Number]
    }
  },
  emits: ['connect', 'showNav'],
  setup(props, {emit}) {
    const handleConnect = () => {
      emit('connect')
    }
    const state = reactive({
      visible: !!props.userInfo
    })

    watch(() => props.userInfo, (n) => {
      if (n) {
        state.visible = true
      }
    }, {
      immediate: true
    })

    const handleShow = () => {
      $('.TcB').fadeIn(0);
		  $('.nav').addClass("navO");
      emit('showNav')
    }

    onMounted(() => {
      // 滚动动态添加样式
      $(window).scroll(function(){
        if($(window).scrollTop() >0){
          $('header').addClass("IndHC");
        }else{
          $('header').removeClass("IndHC");
        } 
      });
    })

    return {
      handleConnect,
      state,
      handleShow
    }
  }
})
</script>