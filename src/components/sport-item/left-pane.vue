<template>
  <div>
    <div class="default_color leftInfoPane">
      <div class="flex items-center">
        <div class="scheduleIcon"></div>
        <div class="scheduleTime">{{time}}</div>
      </div>
      <div>
        {{name || '--'}}
      </div>
    </div>

    <div class="default_color leftInfoPane2">
      <div class="flex items-center">
        <div class="scheduleIcon"></div>
        <div>
          {{name || '--'}}
        </div>
      </div>
      <div class="scheduleTime2">{{time}}</div>
    </div>

    <div class="default_color leftInfoPane3">
      <div class="flex items-center">
        <div class="scheduleIcon"></div>
        <div class="scheduleTime">
          {{time}}
          <div>
            {{name || '--'}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    time: {
      type: String
    },
    name: {
      type: String
    }
  },
  setup(props) {}
})
</script>


<style lang="less" scoped>
.leftInfoPane {
  position: absolute;
  display: block;
  @media screen and (max-width: 1400px) {
    display: none;
    overflow: hidden;
    position: relative;
  }
}
.leftInfoPane2 {
  display: none;
  @media (min-width: 800px) and (max-width: 1400px) {
    display: block;
  }
  @media screen and (max-width: 800px) {
    display: none;
  }
}

.leftInfoPane3 {
  display: none;
  @media screen and (max-width: 800px) {
    display: block;
    margin-bottom: 8px;
  }
}
.scheduleIcon {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  margin-right: 8px;
  background: rgba(108,130,157,.4);
}
.scheduleTime {
  font-size: 12px;
}
.scheduleTime2 {
  position: absolute;
  width: 98%;
  text-align: center;
  top: 13px;
  font-size: 12px;
}
</style>