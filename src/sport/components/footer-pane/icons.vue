<template>
  <!-- <DiscordIcon class="iconFont" /> -->
  <!-- <VkIcon class="iconFont" /> -->
  <TwitterIcon
    class="iconFont"
    @click="handleGo('https://twitter.com/PEPE_X_BET')"
  />
  <TgIcon class="iconFont" @click='handleGo("https://t.me/PBET_Channel")' />
</template>

<script>
import { defineComponent, reactive } from "vue";
import DiscordIcon from "../icons/discord.vue";
import VkIcon from "../icons/vk.vue";
import TwitterIcon from "../icons/twitter.vue";
import YoutubeIcon from "../icons/youtube.vue";
import TgIcon from '../icons/tg.vue'

export default defineComponent({
  components: {
    DiscordIcon,
    VkIcon,
    TgIcon,
    TwitterIcon,
    YoutubeIcon,
  },
  props: {},
  setup(props) {
    const state = reactive({});

    const handleGo = (e) => {
      window.open(e);
    };

    return {
      state,
      handleGo,
    };
  },
});
</script>

<style lang="less" scoped>
.iconFont {
  font-size: 24px;
  margin: 0 4px;
  color: #413b5b;
  cursor: pointer;
  transition: all 100ms linear;
  &:hover {
    color: var(--primary-main);
  }
}
</style>
