/* globals FormData, Vue */

var AjaxFormComponent = Vue.extend({
  template: '<form id="{{ id }}" class="{{ class }}" name="{{ name }}" action="{{ action }}" method="{{ method }}" v-on:submit.prevent="handleAjaxFormSubmit"><slot></slot></form>',
  props: ['id', 'name', 'class', 'action', 'method', 'v-response-type'],
  methods: {
    handleAjaxFormSubmit: function() {
      // fires before we do anything
      this.$dispatch('beforeFormSubmit', this);

      // fires whenever an error occurs
      var handleError = (function(err) {
        this.$dispatch('onFormError', this, err);
      }).bind(this);

      // set a default form method
      if (!this.method) {
        this.method = 'post';
      }

      // fires when the form returns a result
      var handleFinish = (function(data) {
        if (xhr.readyState == 4) {
          // a check to make sure the result was a success
          if (xhr.status < 400) {
            this.$dispatch('onFormComplete', this, xhr.response);
          } else {
            this.$dispatch('onFormError', this, xhr.statusText);
          }
        }
      }).bind(this);

      var handleProgress = (function(evt) {
        // flag indicating if the resource has a length that can be calculated
        if (evt.lengthComputable) {
          // create a new lazy property for percent
          evt.percent = (evt.loaded / evt.total) * 100;
          this.$dispatch('onFormProgress', this, evt);
        }
      }).bind(this);

      var xhr = new XMLHttpRequest();
      xhr.open(this.method, this.action, true);

      // you can set the form response type via v-response-type
      if (this.vResponseType) {
        xhr.responseType = this.vResponseType;
      } else {
        xhr.responseType = 'json';
      }

      xhr.upload.addEventListener('progress', handleProgress);
      xhr.addEventListener('readystatechange', handleFinish);
      xhr.addEventListener('error', handleError);
      xhr.addEventListener('abort', handleError);
      var data = new FormData(event.target);
      xhr.send(data);
      // we have setup all the stuff we needed to
      this.$dispatch('afterFormSubmit', this);
    }
  }
});

// register
Vue.component('ajax-form', AjaxFormComponent);