import Vue from 'vue'

// add translations directly to the application
Vue.i18n.add('cn', require('./cn.json'))

// set the start locale to use
Vue.i18n.set('cn')

// set fallback for non-translated strings
Vue.i18n.fallback('cn')
