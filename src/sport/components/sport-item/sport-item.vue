<template>
   <li class="flexC Huans">
    <div class="zyqulH">
      <div class="zyqulHs flex">
        <i></i>
        <p>{{getScheduleTime}}</p>
      </div>
      <div class="zyqulHp">{{info?.venue?.name || '--'}}</div>
    </div>
    <div class="zyqulN flexC">
      <div class="zyqulNp">{{getCompetitors[0].title}}</div>
      <div class="zyqulNr flexC fl-bet">
        <a href="javascript:;" class="zyqulNa zyqulNaOn"></a>
        <input type="text" value="4.80" @click='handlePick("l")' class="zyqulNI" :class="{'active': state.active==='l'}" readonly>
        <div class="zyqulNvs">VS</div>
        <input type="text" value="2.20" class="zyqulNI"  @click='handlePick("r")' :class="{'active': state.active==='r'}" readonly>
        <a href="javascript:;" class="zyqulNa"></a>
      </div>
      <div class="zyqulNp">{{getCompetitors[1].title}}</div>
    </div>
    <a href="javascript:;" class="zyqulNJ"></a>
  </li>
</template>

<script>
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import dayjs from 'dayjs'

export default defineComponent({
  components: {},
  props: {
    active: {
      type: [String, Number],
      default: '0'
    },
    info: {
      type: Object
    }
  },
  emits: ['udpate:active', 'change'],
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
    
    const getScheduleTime = computed(() => {
      const time = props.info.scheduled
      const d = time ? dayjs(time).format('MM-DD hh:mm') : '--'
      return d
    })
    const getCompetitors = computed(() => {
      const competitors = props.info.competitors?.competitor
      const list = []
      competitors.forEach(item => {
        list.push({
          ...item,
          title: `${item.country}: ${item.abbreviation}`
        })
      });
      return list
    })
    

    const handlePick = (e) => {
      state.active = e
      emit('change', props.info)
    }
    return {
      handlePick,
      state,
      getCompetitors,
      getScheduleTime
    }
  }
})
</script>
