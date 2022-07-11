<template>
  <div class="itemWrap">

    <div class="title">Best of 3 Correct Match Score</div>

    <div class="flex items-center justify-between">
      <div class="flex items-center sideItem">
        <div class="logo" style="margin-right: 6px"></div>
        <div class="flex justify-end flex-1" style="width: calc(50% - 55px)">
          <div class="betNum ellipsis_2">EHOMEfdfsdfsfwefwefwefedf</div>
        </div>
      </div>
      <div class="flex items-center sideItem">
        <div class="flex flex-1" style="width: calc(50% - 55px)">
          <div class="betNum">EHOME</div>
        </div>
        <div class="logo" style="margin-left: 6px"></div>
      </div>
    </div>

    <div class="flex items-center justify-between" style="margin-top: 8px">
      <div class="flex items-center sideItem justify-end">
        <div class="betNum" style="margin-right: 8px">+1.4</div>
        <input
          type="text"
          :value="111"
          class="zyqulNI"
          readonly
        />
      </div>

      <div class="flex items-center sideItem">
        
        <input
          type="text"
          :value="111"
          class="zyqulNI"
          readonly
        />
        <div class="betNum" style="margin-left: 8px">+1.4</div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.itemWrap {
  color: #fff;
  padding: 12px;
  background-color: #1b222c;
  border: 2px solid #1b222c;
  border-radius: 8px;
  box-shadow: 12px 12px 10px 2px rgb(0 0 0 / 30%);
  min-height: 40px;
}

.title {
  text-align: center;
  font-size: 15px;
  margin-bottom: 8px;
}
.betNum {
  font-size: 15px;
  color: #6c829d;
  line-height: 16px;
}
.pane1 {
  width: 45%;
}
.pane2 {
  width: 55%;
}
.sideItem {
  width: calc(50% - 20px);
}
.logo {
  width: 24px;
  height: 24px;
  background: #fff;
}
</style>