<template>
  <div class="wrap">
    <left-pane :name="info?.venue?.name" :time="getScheduleTime"></left-pane>

    <div class="flex items-center pc-item">
      <!-- left -->
      <div class="left flex items-center justify-end">
        <div class="leftTitle">
          {{getCompetitors[0].title}}
        </div>
        <div class="flex items-center leftIcon">
          <div class="icon"></div>
          <input
            type="text"
            :value="getLeftValue"
            @click='handlePick("left")'
            class="zyqulNI" 
            :class="{'active': getBetActive==='left'}"
            readonly
          />
        </div>
      </div>
      <!-- middle -->
      <div class="mid" v-if='!getMiddleValue'>vs</div>
      <div class="mid" v-else>
        <input
          type="text"
          :value="getMiddleValue"
          @click='handlePick("middle")'
          class="zyqulNI" 
          :class="{'active': getBetActive==='middle'}"
          readonly
          />
      </div>
      <div class="right flex items-center">
        <div class="flex items-center rightIcon">
          <input
            type="text"
            :value="getRightValue"
            @click='handlePick("right")'
            class="zyqulNI" 
            :class="{'active': getBetActive==='right'}"
            readonly
          />
          <div class="icon"></div>
        </div>
        <div class="rightTitle">
          {{getCompetitors[1].title}}
        </div>
      </div>
    </div>
    <div class="m-item">
      <MItem 
        v-model:active='state.active'
        :leftTitle="getCompetitors[0].title"
        :leftValue="getLeftValue"
        :middleValue="getMiddleValue"
        :rightTitle="getCompetitors[1].title"
        :rightValue="getRightValue"
      />
    </div>
  </div>
</template>


<script>
import { computed, defineComponent, inject, reactive, ref, watch } from 'vue'
import LeftPane from './left-pane.vue'
import MItem from './m-item.vue'
import dayjs from 'dayjs'
import useCompetitors from '../useHooks/use-competitors'

export default defineComponent({
  components: {
    LeftPane,
    MItem
  },
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
      active: props.active,
    })
    const SPORT_BET = inject('SPORT_BET')
    watch(() => props.active, (n) => {
      state.active = n
    }, {
      immediate: true
    })
    watch(() => state.active, (n) => {
      emit('update:active', n)
    })

    const getBetActive = computed(() => {
      const id = props.info.id
      const map = SPORT_BET.getBetMap.value
      const item = map?.[id]
      if (item && item?.active) {
        return item.active
      }
      return ''
    })
    
    const getScheduleTime = computed(() => {
      const time = props.info.scheduled
      const d = time ? dayjs(time).format('MM-DD hh:mm') : '--'
      return d
    })
    const getCompetitors = useCompetitors(props.info)

    const getLeftValue = computed(() => 4.2)
    const getMiddleValue = computed(() => 3.5)
    const getRightValue = computed(() => 1.0)
    

    const handlePick = (e) => {
      if (state.active === e) {
        state.active = ''
      } else {
        state.active = e
      }
      emit('change', props.info)
    }

    watch(() => state.active, (n) => {
      SPORT_BET.setMap((map) => {
        const obj = {
          left: getLeftValue,
          right: getRightValue,
          middle: getMiddleValue
        }
        if (map) {
          map[props.info.id] = {
            active: n,
            activeValue: n ? (obj?.[n] || undefined) : undefined,
            data: props.info
          }
        } else {
          map = {
            [props.info.id]: {
              active: n,
              activeValue: n ? (obj?.[n] || undefined) : undefined,
              data: props.info
            }
          }
        }
      })
    })


    return {
      handlePick,
      state,
      getCompetitors,
      getScheduleTime,
      getLeftValue,
      getMiddleValue,
      getRightValue,
      getBetActive
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
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: rgba(108,130,157,.4);
  border: 1px solid transparent;
  margin: 0 8px;
}
.leftIcon {
  @media screen and (max-width: 800px) {
    width: 100%;
    text-align: right;
    display: flex;
    justify-content: end;
    align-items: center;
    flex-shrink: 0;
  }
}
.leftTitle {
  color: #becde3;
}
.rightIcon {
  @media screen and (max-width: 800px) {
    width: 100%;
    text-align: left;
    flex-shrink: 0;
  }
}
.rightTitle {
  color: #becde3;
}
.pc-item {
  @media screen and (max-width: 800px) {
    display: none;
  }
}
.m-item {
  display: none;
  @media screen and (max-width: 800px) {
    display: block;
  }
}
</style>