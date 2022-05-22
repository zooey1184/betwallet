<template>
  <article class="zyqDk Huans">
		<div class="zyqDD Huans">		
			<Swiper />

			<section class="zyqTD zyqTDall">
				<div class="zyqTit flexC fl-bet">
					<div class="zyqTitH">ALL 101</div>
					<div class="zyqTitR flexC">
						<div class="zyqTitRS flexC"><img src="../images/zyq0425/IconTime01.png"><p>start time</p></div>
						<div class="zyqTitRS flexC"><img src="../images/zyq0425/IconTime02.png"><p>real time</p></div>
						<div class="zyqsearch flexC fl-bet">
							<a href="javascript:;" class="zyqseaA"></a>
							<input type="text" placeholder="search for a game, team or event" class="zyqseaI Huans">
						</div>
					</div>
				</div>
				<div class="zyqTis">即将开始</div>
				<ul class="zyqul">
					<li class="flexC Huans">
						<div class="zyqulH">
							<div class="zyqulHs flex"><i></i><p>10:52</p></div>
							<div class="zyqulHp">B01 Valhalla Cup</div>
						</div>
						<div class="zyqulN flexC">
							<div class="zyqulNp">弗内斯弗内斯，R</div>
							<div class="zyqulNr flexC fl-bet">
								<a href="javascript:;" class="zyqulNa zyqulNaOn"></a>
								<input type="text" value="4.80" class="zyqulNI" disabled="disabled">
								<div class="zyqulNvs">VS</div>
								<input type="text" value="2.20" class="zyqulNI" disabled="disabled">
								<a href="javascript:;" class="zyqulNa"></a>							
							</div>
							<div class="zyqulNp">卡尔·威尔金森</div>
						</div>
						<a href="javascript:;" class="zyqulNJ"></a>
					</li>
				</ul>
			</section>


			<section class="zyqTD zyqTDK" style=" display:none;">
				<div class="zyqTit flexC fl-bet">
					<div class="zyqTitH">Bundesliga 23</div>
					<div class="zyqTitR flexC">
						<div class="zyqTitRS flexC"><img src="../images/zyq0425/IconTime01.png"><p>start time</p></div>
						<div class="zyqTitRS flexC"><img src="../images/zyq0425/IconTime02.png"><p>real time</p></div>
						<div class="zyqsearch flexC fl-bet">
							<a href="javascript:;" class="zyqseaA"></a>
							<input type="text" placeholder="search for a game, team or event" class="zyqseaI Huans">
						</div>
					</div>
				</div>
				<div class="zyqTis">即将开始</div>
				<ul class="zyqul">
					<li class="flexC Huans">
						<div class="zyqulH">
							<div class="zyqulHs flex"><i></i><p>10:52</p></div>
							<div class="zyqulHp">B01 Valhalla Cup</div>
						</div>
						<div class="zyqulN flexC">
							<div class="zyqulNp">弗内斯弗内斯，R</div>
							<div class="zyqulNr flexC fl-bet">
								<a href="javascript:;" class="zyqulNa zyqulNaOn"></a>
								<input type="text" value="4.80" class="zyqulNI" disabled="disabled">
								<div class="zyqulNvs">VS</div>
								<input type="text" value="2.20" class="zyqulNI" disabled="disabled">
								<a href="javascript:;" class="zyqulNa"></a>							
							</div>
							<div class="zyqulNp">卡尔·威尔金森</div>
						</div>
						<a href="javascript:;" class="zyqulNJ"></a>
					</li>
				</ul>
			</section>
		</div>			
	</article>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Swiper from './swiper.vue'

export default defineComponent({
  components: {
    Swiper
  },
  props: {},
  setup(props) {}
})
</script>