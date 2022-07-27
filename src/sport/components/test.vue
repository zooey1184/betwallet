<template>
  <div>
    test
  </div>
</template>

<script>
import {reactive, defineComponent, onMounted} from 'vue'
import usePermission from '@/sport/components/useHooks/use-permission'
export default defineComponent({
  setup() {
    const state = reactive({

    })

    const {hasPermission} = usePermission()

    const handlePermission = async() => {
      const t = await hasPermission()
      console.log(t)
    }

    onMounted(() => {
      setTimeout(() => {
        handlePermission()
      }, 2000)
    })

    return {
      state
    }
  }
})
</script>