<template>
  <div>
    <div
      class="flex justify-between"
      style="padding: 2vw 1vw; padding-top: 4vw"
    >
      <div class="w-40p flex-0">
        <div class="font-size-16 font-weight-600">GET ON THE LIST</div>
        <div class="flex">
          <div class="flex items-center inputWrap">
            <input
              class="emailInp"
              placeholder="Email Address"
              v-model="state.email"
            />
            <div
              class="linear-bg flex items-center justify-center footerbtn"
              @click="handleEmailSubmit"
            >
              <img
                src="../../image/footerArrow.png"
                style="height: 18px"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center flex-0" style="width: 20%">
        <img
          src="../../images/footerLogo.png"
          style="
            width: 100%;
            height: auto;
            object-fit: contain;
            max-width: 580px;
          "
          class="flex-0"
          alt=""
        />
      </div>
      <div class="text-align-right w-40p flex-0">
        <div class="flex items-center justify-end">
          <div class="flex items-center">
            <Icons />
          </div>
        </div>
        <div class="right line-height-12 font-size-12">
          ©2021 - Nesting - ALL RIGHTS RESERVED
        </div>
        <div
          class="text cursor-pointer font-size-12 mt-8 hover-color-blue line-height-12"
        >
          BETWEB3 TERMS&CONDITIONS
        </div>
      </div>
    </div>

    <div class="text-align-center mt-8 p-16">
      <div class="gray-9 font-size-12">
        Any investment in blockchain assets involves the risk of losing part or
        all of your investment.The value of your exchange’s blockchain assets is
        affected by market and other investment risks.
      </div>
      <div style="margin-top: 4px" class="gray-9 font-size-12"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import Icons from "./icons.vue";

export default defineComponent({
  components: {
    Icons,
  },
  props: {},
  setup(props) {
    const state = reactive({
      email: undefined,
    });
    const handleLink = (url) => {
      window.open(url);
    };
    const handleEmailSubmit = () => {
      state.email = undefined;
    };
    return {
      state,
      handleLink,
      handleEmailSubmit,
    };
  },
});
</script>

<style lang="less" scoped>
.right {
  margin-top: 4px;
  @media (min-width: 900px) and (max-width: 1440px) {
    margin-top: 8px;
  }
  @media (min-width: 1441px) and (max-width: 1919px) {
    margin-top: 12px;
  }
  @media (min-width: 1920px) {
    margin-top: 30px;
  }
}
.text {
  margin-left: 30px;
  @media (min-width: 900px) and (max-width: 1440px) {
    margin-left: 50px;
  }
  @media (min-width: 1441px) and (max-width: 1919px) {
    margin-left: 99px;
  }
  @media (min-width: 1920px) {
    margin-left: 121px;
  }
}
.icon {
  width: 24px;
  height: 24px;
  margin-left: 16px;
  transition: all 150ms linear;
  &:hover {
    transform: scale(1.2);
  }
}
.iconFont {
  font-size: 26px;
  margin-left: 18px;
  color: #fff;
  &:hover {
    color: #c17bfd;
  }
}
.inputWrap {
  height: 38px;
  border: 2px solid #b179fb60;
  border-radius: 2px;
  position: relative;
  box-sizing: border-box;
  width: 80%;
  margin-top: 10px;
  @media (min-width: 900px) and (max-width: 1440px) {
    margin-top: 10px;
  }
  @media (min-width: 1441px) and (max-width: 1919px) {
    margin-top: 16px;
  }
  @media (min-width: 1920px) {
    margin-top: 30px;
  }
}
.footerbtn {
  height: 37px;
  position: absolute;
  right: -2px;
  top: -2px;
  border: none;
  border-radius: 2px;
  width: 80px;
  transition: all 100ms linear;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
}
.emailInp {
  height: 38px;
  background: transparent;
  border: none;
  font-style: italic;
  font-size: 16px;
  color: #999;
  outline: none;
  padding-left: 8px;
  border-radius: 2px;
  border-right: none;
}
</style>
