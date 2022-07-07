<template>
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
		</div>
	</header>
</template>

<script>
import { computed, defineComponent, inject, reactive, ref, watch } from 'vue'

export default defineComponent({
  components: {},
  props: {
    userInfo: {
      type: Object
    },
    ID: {
      type: [String, Number]
    },
    active: {
      type: String
    },
    options: {
      type: Array
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

    const handleShowNav = () => {
      if(!$('.wapNav').hasClass('wapNavO')){
        $('.wapNav').addClass('wapNavO');$(".wapMenu").slideDown(100);
      }else{
        $('.wapNav').removeClass('wapNavO');$('.wapMenu').slideUp(100);
      }
    }

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