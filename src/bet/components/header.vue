<template>
<<<<<<< HEAD:src/components/header.vue
  <header class="zyqhd flexC Huans">
		<a href="javascript:;" class="wapNav" @click='handleShowNav'></a>
		<div class="zyqlogoK Huans flexC">			
			<a href="javascript:;" class="zyqlogo flexC"><img src="../images/zyq0425/logo.png"></a>
		</div>
		<div class="hdNavK flexC">
			<a href="javascript:;"
        @click='handlePick(item)'
        v-for='item in options' 
        :class="{'on': state.active === item.value}" 
        class="hdNavA">
        <i class="hdNavI" v-if='item.icon' :class="item.icon"></i>
        <p>{{item.label}}</p>
      </a>
		</div>

		<div class="zyqhdR flexC">
      <!-- wallet -->
			<div class="zyqhdwal flexC fl-bet" v-if='isLink'>
				<i class="zyqhdwalI"></i>
				<div class="qhdwalN flexC">
					<p>0</p>
					<span>$0</span>
				</div>
				<a href="javascript:;" class="zyqhdwala IndBac1">wallet</a>
			</div>
      <!-- info -->
			<div class="zyqhdXD" v-if='isLink'>
				<a href="javascript:;" class="zyqhdId flexC fl-bet Huans">
					<div class="RightHdI"><img src="../images/zyq0425/pic01.jpg"></div>
					<div class="RightHdN">
						<p>{{getId}}</p>
						<div class="RightHdJ"></div>
					</div>
				</a>
			</div>	
      
      <!-- not login  -->
			<a href="javascript:;" v-if='!ACCOUNTS.isLink' class="hdBut IndBac1" @click='handleConnect'>link wallet</a>
=======
  <header class="header flexC fl-bet Huans">
		<a href="javascript:;" class="hdlogo flexC"><img src="../images/logo.png"></a>
		<div class="hdR flexC">
			<a href="javascript:;" class="hdRCon flexC" @click='handleShow' v-if='state.visible'>
				<div class="hdRConI">
          <img src="../images/pic01.jpg" alt="">
        </div>
				<div class="hdRConP">ID: {{ID}}</div>
			</a>
			<a href="javascript:;" v-if='!state.visible && showBtn' class="hdBut IndBac1" @click='handleConnect'>Connect wallet</a>
>>>>>>> f/web:src/bet/components/header.vue
		</div>
	</header>
</template>

<script>
<<<<<<< HEAD
import { defineComponent, reactive, ref, watch, onMounted } from 'vue'
=======
import { computed, defineComponent, inject, reactive, ref, watch } from 'vue'
>>>>>>> a9ec1c615ad6ccac108b35998329ea69d49845a1

export default defineComponent({
  components: {},
  props: {
    userInfo: {
      type: Object
    },
    ID: {
      type: [String, Number]
    },
<<<<<<< HEAD:src/components/header.vue
    active: {
      type: String
    },
    options: {
      type: Array
=======
    showBtn: {
      type: Boolean
>>>>>>> f/web:src/bet/components/header.vue
    }
  },
  emits: ['link', 'update:active'],
  setup(props, {emit}) {
    const state = reactive({
      active: props.active,
    })

    const SPORTS = inject('SPORTS')

    const ACCOUNTS = inject('ACCOUNTS')
    const isLink = computed(() => {
      console.log(ACCOUNTS.isLink.value);
      return ACCOUNTS.isLink.value
    })

    watch(() => props.active, (n) => {
      state.active = n
    }, {
      immediate: true
    })
    watch(() => state.active, (n) => {
      emit('update:active', n)
    })

    const getId = computed(() => ACCOUNTS.accountHide.value)

    const handlePick = (item) => {
      state.active = item.value
    }

    const handleConnect = () => {
      emit('link')
    }

<<<<<<< HEAD
    const handleShow = () => {
      $('.TcB').fadeIn(0);
		  $('.nav').addClass("navO");
      emit('showNav')
=======
    const handleShowNav = () => {
      if(!$('.wapNav').hasClass('wapNavO')){
        $('.wapNav').addClass('wapNavO');$(".wapMenu").slideDown(100);
      }else{
        $('.wapNav').removeClass('wapNavO');$('.wapMenu').slideUp(100);
      }
>>>>>>> a9ec1c615ad6ccac108b35998329ea69d49845a1
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
      state,
      ACCOUNTS,
      handlePick,
      handleConnect,
      handleShowNav,
      getId,
      SPORTS,
      isLink
    }
  }
})
</script>