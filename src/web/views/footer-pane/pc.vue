<template>
  <!-- <div class="flex items-center justify-between">
    <div class="flex items-center">
      <img v-lazy="logo" alt="" />
      <div class="right">©2021 - Nesting - All Rights Reserved</div>
    </div>
    <div class="flex items-center">
      <div class="flex items-center">
        <a href="https://twitter.com/betweb3" target="_blank">
          <img
            class="icon cursor-pointer"
            src="../../assets/icon-t.png"
            alt=""
          />
        </a>
        <a href="https://medium.com/@betweb3official" target="_blank">
          <img class="icon" src="../../assets/icon-m.png" alt="" />
        </a>

        <img class="icon" src="../../assets/icon-discord.png" alt="" />
        <a href="https://curry-steven.gitbook.io/untitled/" target="_blank">
          <img class="icon" src="../../assets/icon-g.png" alt="" />
        </a>
      </div>
      <div class="text cursor-pointer link">Disclaimers</div>
    </div>
  </div>
  <div style="margin-top: 26px" class="text-align-center gray-9 font-size-12">
    Any investment in blockchain assets involves the risk of losing part or all
    of your investment.
  </div>
  <div style="margin-top: 4px" class="text-align-center gray-9 font-size-12">
    The value of your exchange’s blockchain assets is affected by market and
    other investment risks.
  </div> -->

  <div>
    <div class="flex justify-between" style="padding: 2vw 6vw">
      <div class="w-30p flex-0"></div>
      <div class="w-40p flex justify-center flex-0">
        <img :src="logo" alt="" />
      </div>
      <div class="text-align-right w-30p flex-0">
        <div class="flex items-center justify-end">
          <div class="flex items-center">
            <!-- <a href="https://twitter.com/betweb3" target="_blank">
              <img
                class="icon cursor-pointer"
                src="../../assets/icon-t.png"
                alt=""
              />
            </a> -->
            <TwitterOutlined
              class="iconFont"
              @click="handleLink('https://twitter.com/betweb3')"
            />
            <MediumOutlined
              class="iconFont"
              @click="handleLink('https://medium.com/@betweb3official')"
            />
            <DiscordOutlined class="iconFont" style="font-size: 26px" />
            <GithubOutlined
              class="iconFont"
              @click="handleLink('https://curry-steven.gitbook.io/untitled')"
            />
            <!-- <a href="https://medium.com/@betweb3official" target="_blank">
              <img class="icon" src="../../assets/icon-m.png" alt="" />
            </a>
            <img class="icon" src="../../assets/icon-discord.png" alt="" />
            <a href="https://curry-steven.gitbook.io/untitled/" target="_blank">
              <img class="icon" src="../../assets/icon-g.png" alt="" />
            </a> -->
          </div>
        </div>
        <div class="right mt-16">©2021 - Nesting - All Rights Reserved</div>
        <div class="text cursor-pointer link">Disclaimers</div>
      </div>
    </div>

    <div class="text-align-center mt-8 p-16">
      <div class="gray-9 font-size-12">
        Any investment in blockchain assets involves the risk of losing part or
        all of your investment.
      </div>
      <div style="margin-top: 4px" class="gray-9 font-size-12">
        The value of your exchange’s blockchain assets is affected by market and
        other investment risks.
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import logo from "../../assets/part6.png";
import Icon_t from "../../assets/icon-t.png";
import Icon_m from "../../assets/icon-m.png";
import Icon_d from "../../assets/icon-discord.png";
import Icon_g from "../../assets/icon-g.png";
import {
  TwitterOutlined,
  MediumOutlined,
  GithubOutlined,
} from "@ant-design/icons-vue";
import DiscordOutlined from "./icons/discord.vue";

export default defineComponent({
  components: {
    TwitterOutlined,
    MediumOutlined,
    GithubOutlined,
    DiscordOutlined,
  },
  props: {},
  setup(props) {
    const handleLink = (url) => {
      window.open(url);
    };
    return {
      logo,
      handleLink,
      Icon_t,
      Icon_m,
      Icon_d,
      Icon_g,
    };
  },
});
</script>

<style lang="less" scoped>
.right {
  margin-left: 30px;
  @media (min-width: 900px) and (max-width: 1440px) {
    margin-left: 44px;
  }
  @media (min-width: 1441px) and (max-width: 1919px) {
    margin-left: 66px;
  }
  @media (min-width: 1920px) {
    margin-left: 99px;
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
  font-size: 24px;
  margin-left: 18px;
  color: #999;
  &:hover {
    color: #fff;
  }
}
</style>
