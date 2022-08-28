<template>
  <div class="shark">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.shark {
  position: relative;
  overflow: hidden;
  width: 82px;
  height: 82px;
  background-image: url("./tk.png");
  background-repeat: no-repeat;
  // background-position: 0px 1679px;
  animation: bear 15s infinite;
  background-position: 0% 0%;
}

@keyframes bear {
  0% {
    background-position: 0% 0%;
  }
  1.6% {
    background-position: 33% 0%;
  }
  3.2% {
    background-position: 66% 0%;
  }
  4.8% {
    background-position: 0% 4.762%;
  }
  6% {
    background-position: 33% 4.762%;
  }
  7.6% {
    background-position: 66% 4.762%;
  }

  9.2% {
    background-position: 0% 9.5%;
  }
  10.8% {
    background-position: 33% 9.5%;
  }
  12.2% {
    background-position: 66% 9.5%;
  }

  13.8% {
    background-position: 0% 14.5%;
  }
  15.6% {
    background-position: 33% 14.5%;
  }
  17.2% {
    background-position: 66% 14.5%;
  }
  18.8% {
    background-position: 0% 19%;
  }
  20.4% {
    background-position: 33% 19%;
  }
  22% {
    background-position: 66% 19%;
  }

  100% {
    background-position: 66% 99%;
  }
}
</style>
