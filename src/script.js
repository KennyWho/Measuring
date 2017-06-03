var Vue = require('vue')
var $ = require('./jquery-3.2.1.min')
var App = require('./App.vue')
if ($('.ruler-wrap').length > 0) {
  $('.ruler-wrap').remove()
  $('body').removeClass('ruler-user-select')
} else {
  $('body').addClass('ruler-user-select')
  $('body').append('<div id="ruler"></div>')
  document.activeElement.blur();
  new Vue({
    render: (h) => h(App)
  }).$mount('#ruler')
}
