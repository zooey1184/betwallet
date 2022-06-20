<template>
  <div class="wrap">
    <div class="default_color leftInfoPane">
      <div class="flex items-center">
        <div class="scheduleIcon"></div>
        <div class="scheduleTime">{{getScheduleTime}}</div>
      </div>
      <div>
        {{info?.venue?.name || '--'}}
      </div>
    </div>

    <div class="default_color leftInfoPane2">
      <div class="flex items-center">
        <div class="scheduleIcon"></div>
        <div>
          {{info?.venue?.name || '--'}}
        </div>
      </div>
      <div class="scheduleTime2">{{getScheduleTime}}</div>
    </div>

    <div class="flex items-center">
      <div class="left flex items-center justify-end">
        <div class="leftTitle">
          {{getCompetitors[0].title}}
        </div>
        <div class="flex items-center leftIcon">
          <div class="icon"></div>
          <input
            type="text"
            value="4.80"
            @click='handlePick("l")'
            class="zyqulNI" 
            :class="{'active': state.active==='l'}"
            readonly
          />
        </div>
        <div class="leftTitle2">
          {{getCompetitors[0].title}}
        </div>
      </div>
      <div class="mid">vs</div>
      <div class="right flex items-center">
        <div class="flex items-center rightIcon">
          <input
            type="text"
            value="2.80"
            @click='handlePick("r")'
            class="zyqulNI" 
            :class="{'active': state.active==='r'}"
            readonly
          />
          <div class="icon"></div>
        </div>
        <div class="rightTitle">
          {{getCompetitors[1].title}}
        </div>
      </div>
    </div>

    <div>

    </div>
  </div>
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
<style lang="less" scoped>
.wrap {
  padding: 12px;
  margin-bottom: 4px;
  border-radius: 8px;
  overflow: hidden;
  background: #16162f;
  position: relative;
  padding-bottom: 16px;
  @media screen and (max-width: 1000px) {
    padding-bottom: 12px;
  }
}
.scheduleTime {
  font-size: 12px;
}
.leftInfoPane {
  position: absolute;
  display: block;
  @media screen and (max-width: 1000px) {
    display: none;
    overflow: hidden;
    position: relative;
  }
}
.leftInfoPane2 {
  display: none;
  @media screen and (max-width: 1000px) {
    display: block;
  }
}
.scheduleIcon {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  margin-right: 8px;
  background: rgba(108,130,157,.4);
}
.left {
  width: calc(50% - 38px);
  text-align: right;
}
.right {
  width: calc(50% - 38px);
}
.mid {
  margin: 0 4px;
  width: 68px;
  text-align: center;
}
.icon {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: rgba(108,130,157,.4);
  border: 1px solid transparent;
  margin: 0 8px;
}
.leftIcon {
  @media screen and (max-width: 1000px) {
    width: 100%;
    text-align: right;
    display: flex;
    justify-content: end;
    align-items: center;
    flex-shrink: 0;
  }
}
.leftTitle2 {
  color: #becde3;
  @media screen and (min-width: 1000px) {
    display: none;
  }
  @media screen and (max-width: 1000px) {
    display: block;
    width: 100%;
    text-align: right;
  }
}
.leftTitle {
  color: #becde3;
  @media screen and (max-width: 1000px) {
    width: 100%;
    text-align: right;
    display: none;
  }
}
.rightIcon {
  @media screen and (max-width: 1000px) {
    width: 100%;
    text-align: left;
    flex-shrink: 0;
  }
}
.rightTitle {
  color: #becde3;
}
.scheduleTime2 {
  position: absolute;
  width: 98%;
  text-align: center;
  top: 12px;
  font-size: 12px;
}
</style>