<template>
  <div>
    test

    <button @click='handleCreateRoom'>createRoom</button>
    <button @click='handleCreatePool'>createPool</button>
  </div>
</template>

<script>
import {reactive, defineComponent, inject} from 'vue'
import usePermission from '@/sport/components/useHooks/use-permission'
import {createTenant} from '@/sport/api/index'
import {message} from 'ant-design-vue'

export default defineComponent({
  setup() {
    const state = reactive({

    })
    const CONTRACT = inject('CONTRACT')

    const {getPermission,
    hasPermission,
    createPool, } = usePermission()

    const handleCreateRoom = () => {
      createTenant({
        wallet: '0x02e506591c68d03d00f0c528e92e61f6f2b7e296',
        tenant: '12345678'
      }).then(res => {
        console.log(res)
      })
    }

    const handleCreatePool = async() => {
      const t = await hasPermission()
      if (t) {
        const amount = web3.utils.toWei('1', 'mwei')
        createPool(amount).then(res => {
          console.log(res)
        })
        const a = await CONTRACT.value.erc_contract?.methods.decimals().call()
        
        console.log(amount)
      } else {
        getPermission({
          callback: () => {
            message.info('Permission verification sent Success, Please wait link')
          },
          receipt: () => {
            message.success('Successfully linked')
            createPool(2000).then(res => {
              console.log(res)
            })
            emit('next')
          },
          error: (e) => {
            const msg = e.message?.split('{')?.[0] || 'Verification failed'
            message.error(msg)
          }
        })
      }
    }

    return {
      state,
      handleCreateRoom,
      handleCreatePool
    }
  }
})
</script>