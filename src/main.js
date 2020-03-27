import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './quasar'
import VueTheMask from 'vue-the-mask'
// import VueRecaptcha from 'vue-recaptcha';
import Recaptcha from './components/Recaptcha.vue'

import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.use(VueTheMask)

Vue.config.productionTip = false

// Globally register your component
// Vue.component('vue-recaptcha', VueRecaptcha);
Vue.component('recaptcha-vue', Recaptcha);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
