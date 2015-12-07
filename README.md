# vue-ajax-form-component

A [Vue.js](http://vuejs.org/) component for creating simple AJAX forms.

### Install

Available through npm as `vue-ajax-form-component`. Or include as an inline script, like in `example.html`.

### Demo

![](http://cl.ly/image/3Q0L2K0T3Y1i/Screen%20Recording%202015-12-06%20at%2003.57%20PM.gif)

You can load up the `example.html` file here to test the directive. Just make sure you put this folder in a server that has PHP. Or you can change the `ajax-form` action attribute to point to your API endpoint.

### Usage

Minimal:

```html
<ajax-form action="submit.php">
  <!-- normal stuff that goes in a form. Ex: inputs, selects, radio/checkboxs etc. -->
</ajax-form>
```

Full Example:

```html
<ajax-form id="formOne" class="my-form" name="myCoolForm" action="submit.php" method="post" v-response-type="json">
  <!-- normal stuff that goes in a form. Ex: inputs, selects, radio/checkboxs etc. -->
</ajax-form>
```

You can see a custom attribute called `v-response-type`. This allows you to set the response type for your form. Most cases you will be expecting `JSON` in return, and then sending that to some variable in your Vue data.

But, sometimes maybe you are expecting back some HTML or some raw text. In those cases, you can use `v-response-type="html"` or `v-response-type="text"`, respectively. Then you could maybe dump the results in your view in some area. A use case for this might be for "session" flashes like success or error alerts, or maybe a preview of a blog post.

You can see a `Vue` instance example in [example.html](https://github.com/james2doyle/vue-ajax-form-component/blob/master/example.html) if you want more details.

### Support

This component assumes you have support for [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) and the XHR `progress` event.