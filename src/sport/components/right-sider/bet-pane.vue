<template>
  <div class="RighNK Huans pos-r">
    <div class="RighNTit flexC fl-bet">
      <a
        href="javascript:;"
        class="RighNTita SRighNTita"
        @click="handleChangeBetType('single')"
        :class="{ on: getBetType === 'single' }"
        >Single</a
      >
      <a
        href="javascript:;"
        class="RighNTita SRighNTita"
        @click="handleChangeBetType('combo')"
        :class="{ on: getBetType === 'combo' }"
        >Combo</a
      >
      <div>
        <DeleteIcon
          v-if="getSportBetList?.length > 1"
          @click="handleDelete"
          class="hover_active icon-delete pos-a"
        />
      </div>
    </div>

    <div class="RighNZ SRighNZ Huans">
      <div style="max-height: calc(100vh - 340px); overflow: auto">
        <div class="RighKong flexC fl-cen" v-if="!getSportBetList?.length">
          <div class="RighKongN">
            <img src="../../images/zyq0425/kongL.png" />
            <p>Your betting unit is empty</p>
            <a href="javascript:;">Click on odds to add selection</a>
          </div>
        </div>
        <div v-else>
          <div class="betItem" v-for="item in getSportBetList">
            <BetItem
              left="item.data"
              right="dddd"
              title="helo"
              desc="desc"
              subTitle="scubtitle"
              :info='item'
              :showInput="getBetType !== 'combo'"
              @delete='handleDeleteItem(item)'
            ></BetItem>
          </div>
        </div>

        <div class="RighDG Huans">
          <!-- <div class="RighDGD flexC fl-bet">
            <div class="RighDGH">Single share：</div>
            <a href="javascript:;" class="RighDGDa">Your bet</a>
            
          </div> -->
          <BetInput v-model:value='state.betSingleValue'>
            <template #title>
              <div>
                Single share:
              </div>
            </template>
          </BetInput>
          <div class="RighDGD flexC fl-bet">
            <div class="RighDGH">Total shares：</div>
            <div class="RighDGS">0</div>
          </div>
          <div class="RighDGD flexC fl-bet" style="color: #376efc">
            <div class="RighDGH">Potential victory：</div>
            <div class="RighDGS">0</div>
          </div>
          <a href="javascript:;" class="RighDGod">
            <i></i>
            <p>Good luck！</p>
          </a>
        </div>
      </div>

      <a href="javascript:;" class="RighA RighXZ" @click="handleBet">{{isLink ? 'Bet' : 'Login And Bet'}}</a>
    </div>
  </div>
  <BetModal v-model:visible='state.visible' />
</template>

<script>
import { defineComponent, inject, ref, computed, watch, reactive } from "vue";
import BetItem from "../bet-item.vue";
import DeleteIcon from './icon-delete-all.vue'
import BetInput from '../bet-input.vue'
import BetModal from '../transaction'
export default defineComponent({
  components: {
    BetItem,
    BetInput,
    DeleteIcon,
    BetModal
  },
  props: {},
  emits: ["bet"],
  setup(props, { emit }) {
    const state = reactive({
      betSingleValue: undefined,
      visible: false
    })
    const ACCOUNTS = inject("ACCOUNTS");
    const SPORT_BET = inject("SPORT_BET");
    const BET_MODAL = inject('BET_MODAL')
    const BET = inject("BET");

    const handleChangeBetType = (e) => {
      BET.value?.changeBetType(e);
    };
    const getBetType = computed(() => {
      return BET.value?.betType;
    });
    const getSportBetList = computed(() => {
      return SPORT_BET.getBetList.value
    })
    const isLink = computed(() => ACCOUNTS.isLink?.value)
    const handleBet = () => {
      if (isLink) {
        emit("bet");
        // BET_MODAL.visible(true)
        state.visible = true
        // $('.TCB1').fadeIn(100);
        // $('.Tc-MYJY').slideDown(200);
        // $('.RightCn').addClass("RightCO");
        // $('.RighTB').fadeOut(100);
      } else {
        ACCOUNTS.link();
      }
    };
    const handleDelete = () => {
      SPORT_BET.clear();
    };

    const handleDeleteItem = (item) => {
      SPORT_BET.delete(item)
    }
    return {
      state,
      isLink,
      handleBet,
      getSportBetList,
      getBetType,
      handleDelete,
      handleChangeBetType,
      handleDeleteItem,
    };
  },
});
</script>

<style lang="less" scoped>
.betItem {
  position: relative;
  font-size: 16px;
  margin-bottom: 8px;
}
.RighNTita {
  line-height: 28px !important;
}
.icon-delete {
  top: 4px;
  right: 4px;
  font-size: 18px;
  color: #6d819c;
}
</style>