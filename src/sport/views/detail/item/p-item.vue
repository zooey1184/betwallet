<template>
  <div class="itemWrap">
    <div class="flex items-center">
      <div class="flex-1 sideItem flex items-center justify-between">
        <div class="logo">
        </div>
        <div class="flex-1">
          <div class="flex items-center justify-between flex-1 insideItem">
            <div class="name betNum ellipsis_2">HOME</div>
            <div class="flex items-center">
              <div class="gray betNum">+1.5</div>
              <input
                type="text"
                :value="111"
                class="zyqulNI"
                readonly
              />
            </div>
          </div>
          
        </div>
      </div>

      <!-- 中间说明 -->
      <div class="mid">
        Best of 3 Correct Match Score
      </div>

      <div class="flex-1 sideItem flex items-center justify-between">
        <div class="flex-1">
          <div class="flex items-center justify-between flex-1 insideItem">
            <div class="flex items-center">
              <input
                type="text"
                :value="111"
                class="zyqulNI"
                readonly
              />
              <div class="gray betNum">+1.5</div>
            </div>
            <div class="name betNum ellipsis_2">HOME</div>
          </div>
          
        </div>
        <div class="logo">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.itemWrap {
  color: #fff;
  padding: 12px 0;
  background-color: #1b222c;
  border: 2px solid #1b222c;
  border-radius: 8px;
  box-shadow: 12px 12px 10px 2px rgb(0 0 0 / 30%);
  min-height: 40px;
}
.mid {
  width: 220px;
  padding: 0 12px;
  text-align: center;
}
.sideItem {
  width: calc(50% - 110px);
}
.betNum {
  margin: 0 12px;
  font-size: 15px;
  color: #6c829d;
}
.logo {
  width: 36px;
  height: 36px;
  margin: 0 12px;
  background: #333;
}
.insideItem {
  margin: 4px 0;
}
</style>