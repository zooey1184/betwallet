<template>
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
</template>

<script>
import { defineComponent, reactive, ref, watch } from 'vue'

export default defineComponent({
  components: {},
  props: {
    active: {
      type: [String, Number],
    }
  },
  emits: ['udpate:active'],
  setup(props, {emit}) {
    const state = reactive({
      active: props.active
    })
    watch(() => props.active, (n) => {
      state.active = n
    }, {
      immediate: true
    })
    watch(() => state.active, (n) => {
      emit('update:active', n)
    })
  }
})
</script>