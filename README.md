stickit
=======

Simple sticky plugin for jQuery to affix a bar to the top edge when scrolling down.

If all you need is a simple nav bar or similar element in your page to affix itself to the top edge of the screen when scolling down, then this plugin will probably work for you.

To use this plugin, just pass the element as you would in any jQuery function call:

```JavaScript
$('#myElement').stickit();
```

The plugin will parse multiple elements, but is really only useful if a single element is used. However, this does enable multiple elements to be fixed to the top edge. Just make sure the widths and left/right positioning of these elements works for your layout.

Event handlers can be passed to the initialization to fire off custom code when the element is set to the fixed position and also when it is released from this state. (Note: If you do multiple elements in one call to the plugin, the same handlers will be applied to each element in the collection. If you need different handlers per element, then separate calls to the plugin will need to be made.)

```JavaScript
$('#myElement').stickit(
  fixed: function () {
    // Fired when element is fixed to the top edge
    console.log('Stay put!');
  },
  unfixed: function () {
    // Fired when element is restored to it's original positioning
    console.log('I\'m free!');
  },
);
```
