import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import './assets/style/main.css'
import './assets/style/responsive.css'

library.add(fas,fab,far)


createApp(App).component('font-awesome-icon',FontAwesomeIcon).use(store).use(router).mount('#app')
