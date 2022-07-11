<template>
  <img class="bg" src="https://s3.bmp.ovh/imgs/2022/07/10/ee03e78f6e28b99e.png" alt="">
  <div class="wrapPane">
    <TopPane />
    <VsPane />
    
    <div class="tab-pane" style="margin-top: 16px">
      <a-tabs >
        <a-tab-pane key='0' tab='全部'>
          <Item />
        </a-tab-pane>

        <a-tab-pane key='1' tab='让分投注'>
          <Item />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import {ref, defineComponent} from 'vue'
import TopPane from './top-pane.vue'
import VsPane from './vs-pane.vue'
import {Tabs} from 'ant-design-vue'
import Item from './item'

export default defineComponent({
  components: {
    TopPane,
    VsPane,
    Item,
    'a-tabs': Tabs,
    'a-tab-pane': Tabs.TabPane
  },
  setup() {
    
  }
})
</script>

<style lang="less" scoped>
.bg {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  min-width: 1000px;
  object-fit: cover;
  object-position: center;
}
.wrapPane {
  width: 80%;
  margin: 0 auto;

  @media (min-width: 960px) and (max-width: 1440px) {
    width: 90%
  }
  @media (max-width: 960px) {
    width: 98%
  }
}

:deep(.tab-pane) .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
  color: transparent;
  background-image: linear-gradient(to right, var(--primary-main), var(--primary-sub));
  background-clip:text;
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}
:deep(.tab-pane) .ant-tabs-tab-btn {
  color: #fff;
  font-size: 16px;
  font-weight: 600;
}
:deep(.tab-pane) .ant-tabs-ink-bar {
  background-image:linear-gradient(to right, var(--primary-main), var(--primary-sub));
  height: 4px;
}
</style>