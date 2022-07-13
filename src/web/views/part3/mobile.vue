<template>
  <Wrap>
    <template #default="data">
      <div class="pos-r">
        <img src="../../assets/part3-bg.png" class="bgImg" alt="" />
        <div class="gutter_col z-index-9">
          <div class="color-white">
            <transition name="slideBottom">
              <div
                class="linear-color title-lg text-align-center"
                style="margin-bottom: 4px"
              >
                Everyone can be the bookmaker!
              </div>
            </transition>
            <!-- <transition name="slideBottom">
              <div
                class="subTitle text-align-center font-weight-600 mt-24 mb-32"
              >
                USDT decentralized capital pool
              </div>
            </transition> -->

            <!-- <div style="height: 16.5vh;" class="bg-gray-30 mb-24 mt-16">
            </div> -->
            <img
              style="height: 30vh; z-index: 2"
              src="../../assets/part3-gif.gif"
              alt=""
            />

            <transition name="slideBottom">
              <div class="grey" style="margin-top: 6px; margin-bottom: 55px">
                <div>
                  Anyone can freely add their own usdt pool. After adding, you
                  will get a unique casino code and become a bookmaker. Players
                  must use the casino code to find the corresponding usdt pool
                  before betting.
                </div>
                <div>
                  After adding the usdt pool, you don't need to worry about
                  anything else. Just go to the community and social media to
                  invite your friends to participate in betting!
                </div>
              </div>
            </transition>

            <!-- <transition name="slideBottom">
              <div class="item">
                <div>
                  <img src="../../assets/part3-1.png" alt="" />
                </div>
                <p style="margin-left: 13px">
                  Destruction of the ownership of the capital pool
                </p>
              </div>
            </transition> -->
            <!-- <transition name="slideBottom">
              <div class="item">
                <div>
                  <img src="../../assets/part3-2.png" alt="" />
                </div>
                <p style="margin-left: 13px">
                  60% of each profit is distributed to token holders, 10% is
                  automatically repurchased destroyed token, and 30% remains in
                  the capital pool
                </p>
              </div>
            </transition> -->
            <!-- <transition name="slideBottom">
              <div class="flex">
                <div><img src="../../assets/part3-3.png" alt="" /></div>
                <p style="margin-left: 13px">
                  Amount and profit are completely transparent
                </p>
              </div>
            </transition> -->

            <transition name="slideBottom">
              <div>
                <div
                  class="linear-color title-lg text-align-center"
                  style="margin-bottom: 4px"
                >
                  无处不在的Token奖励！
                </div>
                <div class="grey" style="margin-top: 6px; margin-bottom: 55px">
                  <div>无论是建立USDT池还是参与博彩，你都将获得Token奖励</div>
                  <div>
                    我们将在官方渠道发布详细的规则以激励所有的参与协议交互的行为
                  </div>
                  <div>快去建立USDT池邀请小伙伴参与投注吧</div>
                  <div>当然，也可以去找到一个USDT池参与投注！</div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </template>
  </Wrap>
</template>

<script>
import { defineComponent, inject, ref, watch } from "vue";
import Wrap from "@/web/components/wrap";
import MouseTrack from "@/web/components/mouse-track";

export default defineComponent({
  components: {
    Wrap,
    MouseTrack,
  },
  props: {},
  setup(props) {
    return {};
  },
});
</script>

<style lang="less" scoped>
.bgImg {
  position: absolute;
  width: 100%;
  height: auto;
  z-index: 0;
}
.item {
  margin-bottom: 24px;
  display: flex;
}
</style>
