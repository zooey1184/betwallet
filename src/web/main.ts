import { createApp } from 'vue'
import App from './App.vue'
import lazyPlugin from 'vue3-lazy'
import './styles/common.css'
import './styles/init.css'
import './styles/index.less'


const app = createApp(App)
lazyPlugin.install(app, {
  loading: 'https://tva1.sinaimg.cn/large/e6c9d24ely1h10eq5gq3dj203203a0cc.jpg',
  error: 'https://tva1.sinaimg.cn/large/e6c9d24ely1h10eq5gq3dj203203a0cc.jpg'
})
app.mount('#app')
