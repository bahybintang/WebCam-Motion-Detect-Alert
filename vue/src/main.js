`use strict`

import Vue from 'vue';
import 'materialize-css'
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.min.js';
import App from './App.vue';
window.$ = require('jquery')
window.JQuery = require('jquery')

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
