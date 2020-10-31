require('./bootstrap');

window.Vue = require('vue')
import router from './router'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

// framework front-end
Vue.use(ViewUI);

import common from './common'
Vue.mixin(common)

Vue.component('mainapp', require('./components/mainapp.vue').default)
// afficher la date dans un format plus adapté
Vue.use(require('vue-moment'));

const app = new Vue({
    el: '#app',
    router
})