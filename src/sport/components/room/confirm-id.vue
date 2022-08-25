<template>
  <div>
    <div class="active-color ff mt50 text-align-center">
      IDENTITY
      <div>CONFIRMATION REQUIRED</div>
    </div>
    <div class="mt-8 mb-16 flex justify-center mt50">
      <img style="width: 200px" src="../../images/v2/room-wallet.png" />
    </div>
    <div class="text-align-center mt-24 line-height-18">
      CREATING REQUIRES
      <div>YOU TO VERIFY AUTHENTICATION IN YOUR WALLET</div>
    </div>

    <div class="flex items-center justify-center mt50 m-24">
      <img
        class="spin"
        style="width: 50px"
        src="../../images/v2/room-loading.png"
      />
      <!-- <div class="font-size-18 font-weight-600 ml-16">签名请求</div> -->
    </div>
  </div>
</template>

<script>
import { reactive, defineComponent, onMounted } from "vue";
import { QuestionCircleOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import usePermission from "@/sport/hooks/use-methods";
import { TIP } from "@/sport/constant/tip";

export default defineComponent({
  components: {
    QuestionCircleOutlined,
    LoadingOutlined,
    // Circle,
  },
  props: {
    amount: {
      type: [String, Number]
    }
  },
  emits: ['next', 'pre'],
  setup(props, {emit}) {
    const state = reactive({});

    const {
      getPermission,
      hasPermission,
      createPool,
      createPoolLoading,
      authLoading,
    } = usePermission();

    const init = async() => {
      const _hasPermission = await hasPermission();
      if (_hasPermission) {
        await createPool(props.amount, (h, r, e) => {
          if (r) {
            message.success(TIP.createSuccess);
            emit("next");
          }
          if (e) {
            emit('pre')
          }
        });
      } else {
        getPermission(async (h, r, e) => {
          if (r) {
            message.success(TIP.authSuccess);
            await createPool(state.amount, (h, r, e) => {
              if (r) {
                message.success(TIP.createSuccess);
                emit("next");
              }
            });
          }
          if (e) {
            emit('pre')
          }
        });
      }
    }

    onMounted(() => {
      init()
    })

    return {
      state,
    };
  },
});
</script>

<style lang="less" scoped>
.title {
  font-size: 22px;
  @media screen and (max-width: 600px) {
    font-size: 15px;
  }
}
.mt50 {
  margin-top: 50px;
  @media screen and (max-width: 600px) {
    margin-top: 24px;
  }
}
.spin {
  animation: loading 3s linear infinite;
}
@keyframes loading {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0);
  }
}
</style>
