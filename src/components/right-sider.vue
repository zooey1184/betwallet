<template>
  <article class="RightCn Huans" :class="{ RightCO: !state.visible }">
    <div class="RightHd flexC fl-bet Huans">
      <div class="RightHdI"><img src="../images/zyq0425/pic01.jpg" /></div>
      <div class="RightHdN">
        <p>{{ getId }}</p>
        <div class="RightHdJ"></div>
      </div>
      <a
        href="javascript:;"
        class="RightHda RightHwa"
        @click="handleChangeWalletVisible"
      ></a>
    </div>
    <div class="Rightit flex fl-bet">
      <a
        href="javascript:;"
        class="Rightita flexC fl-cen"
        @click="state.active = 0"
        :class="{ on: state.active === 0 }"
      >
        <i class="RightitI RightitI1"></i>
        <p>betting slip</p>
      </a>
      <a
        href="javascript:;"
        class="Rightita flexC fl-cen"
        @click="state.active = 1"
        :class="{ on: state.active === 1 }"
      >
        <i class="RightitI RightitI2"></i>
        <p>my bet</p>
      </a>
    </div>
    <div class="RighN" v-if="state.active === 0">
      <div class="RighNK Huans">
        <div class="RighNTit flexC fl-bet">
          <a
            href="javascript:;"
            class="RighNTita SRighNTita"
            @click="state.slipActive = 'single'"
            :class="{ on: state.slipActive === 'single' }"
            >Single</a
          >
          <a
            href="javascript:;"
            class="RighNTita SRighNTita"
            @click="state.slipActive = 'combo'"
            :class="{ on: state.slipActive === 'combo' }"
            >Combo</a
          >
        </div>
        <div class="RighNZ SRighNZ Huans" v-if="state.slipActive === 'single'">
          <div class="RighKong flexC fl-cen">
            <div class="RighKongN">
              <img src="../images/zyq0425/kongL.png" />
              <p>Your betting unit is empty</p>
              <a href="javascript:;">Click on odds to add selection</a>
            </div>
          </div>
          <div class="RighDG Huans">
            <div class="RighDGD flexC fl-bet">
              <div class="RighDGH">Single share：</div>
              <a href="javascript:;" class="RighDGDa">Your bet</a>
            </div>
            <div class="RighDGD flexC fl-bet">
              <div class="RighDGH">Total shares：</div>
              <div class="RighDGS">0</div>
            </div>
            <div class="RighDGD flexC fl-bet" style="color: #376efc">
              <div class="RighDGH">Potential victory：</div>
              <div class="RighDGS">0</div>
            </div>
            <a href="javascript:;" class="RighDGod"
              ><i></i>
              <p>Good luck！</p></a
            >
          </div>
          <a href="javascript:;" class="RighA RighXZ" @click='handleBet'>Bet</a>
        </div>

        <div class="RighNZ SRighNZ Huans" v-if="state.slipActive === 'combo'">
          <div class="RighKong flexC fl-cen">
            <div class="RighKongN">
              <img src="../images/zyq0425/kongL.png" />
              <p>Your betting unit is empty</p>
              <a href="javascript:;">Click on odds to add selection</a>
            </div>
          </div>
          <div class="RighDG Huans">
            <div class="RighDGD flexC fl-bet">
              <div class="RighDGH">Single share：</div>
              <a href="javascript:;" class="RighDGDa">Your bet</a>
            </div>
            <div class="RighDGD flexC fl-bet">
              <div class="RighDGH">Total shares：</div>
              <div class="RighDGS">0</div>
            </div>
            <div class="RighDGD flexC fl-bet" style="color: #376efc">
              <div class="RighDGH">Potential victory：</div>
              <div class="RighDGS">0</div>
            </div>
            <a href="javascript:;" class="RighDGod"
              ><i></i>
              <p>Good luck！</p></a
            >
          </div>
          <a href="javascript:;" style="z-index: 9" class="RighA RighXZ">Bet</a>
        </div>
      </div>
    </div>
    <div class="RighN" v-if="state.active === 1">
      <div class="RighNK Huans">
        <div class="RighNTit flexC fl-bet">
          <a
            href="javascript:;"
            class="RighNTita TRighNTita"
            :class="{ on: state.doneActive === 'undone' }"
						@click="state.doneActive = 'undone'"
            >Undone</a
          >
          <a
            href="javascript:;"
            class="RighNTita TRighNTita"
            :class="{ on: state.doneActive === 'completed' }"
						@click="state.doneActive = 'completed'"
            >Completed</a
          >
        </div>
        <div class="RighNZ TRighNZ Huans" v-if="state.doneActive === 'undone'">
          <div class="RighKong flexC fl-cen">
            <div class="RighKongN">
              <img src="../images/zyq0425/kongL.png" />
              <p>Not bet list is empty</p>
              <a href="javascript:;">Place a bet here to see your choices</a>
            </div>
          </div>
          <a href="javascript:;" class="RighA">See more</a>
        </div>
        <div
          class="RighNZ TRighNZ Huans"
          v-if="state.doneActive === 'completed'"
        >
          <div class="RighKong flexC fl-cen">
            <div class="RighKongN">
              <img src="../images/zyq0425/kongL.png" />
              <p>Not bet list is empt</p>
              <a href="javascript:;">Place a bet here to see your choices</a>
            </div>
          </div>
          <a href="javascript:;" class="RighA">See more</a>
        </div>
      </div>
    </div>
    <div class="RightF flexC fl-bet">
      <div class="RightFN flexC fl-cen">
        <a href="javascript:;" class="RightFNI RightFNI1"></a>
        <a href="javascript:;" class="RightFNI RightFNI2"></a>
        <a href="javascript:;" class="RightFNI RightFNI3"></a>
        <a href="javascript:;" class="RightFNI RightFNI4"></a>
      </div>
      <a href="javascript:;" class="RightRe" @click="handleChangeVisible"></a>
    </div>
  </article>
</template>

<script>
import { defineComponent, inject, reactive, ref, computed } from "vue";

export default defineComponent({
  components: {},
  props: {},
  emits: ["walletVisible"],
  setup(props, { emit }) {
    const state = reactive({
      visible: false,
      active: 0,
      slipActive: "single",
      doneActive: "undone",
    });
    const ACCOUNTS = inject("ACCOUNTS");
		const getId = computed(() => ACCOUNTS.accountHide.value)

    const handleChangeVisible = () => {
      state.visible = !state.visible;
    };

    const handleChangeWalletVisible = () => {
			if (ACCOUNTS.isLink.value) {
				emit("walletVisible", true);
			} else {
				ACCOUNTS.link()
			}
    };

		const handleBet = () => {
			console.log('object');
			if (ACCOUNTS.isLink.value) {
				emit("bet");
			} else {
				ACCOUNTS.link()
			}
		}
    return {
      ACCOUNTS,
      state,
      handleChangeVisible,
      handleChangeWalletVisible,
			handleBet,
			getId
    };
  },
});
</script>
