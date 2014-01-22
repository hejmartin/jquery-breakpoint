# jQuery Breakpoint

A simple way to use media queries in your jQuery javascripts!

## The structure of a breakpoint

A breakpoint, in this case, is a javascript object consisting of **four** methods: `condition`, `first_enter`, `enter` and `exit`.

`condition()` should return `true` when the breakpoint should be activated and `false` when it should be deactivated. Most likely, you'll want to use a media query as your condition, but this is not by any means required by the breakpoint plugin.

```javascript
	$.breakpoint({
		condition: function () {
			return window.matchMedia('only screen and (min-width:500px)').matches;
		}
	});
```

Whenever the condition returns true, be it on page load or when the viewport changes, the `enter` method is executed. The first time this happens, the optional `first_enter` method will execute before the `enter` method. When condition becomes false, the `exit` method will execute. Be aware however that the `exit` method will only run provided that the condition previously has been true!

```javascript
	$.breakpoint({
		condition: function () {
			return window.matchMedia('only screen and (min-width:500px)').matches;
		},
		first_enter: function () {
			// Code will run the first time condition() is true.
			// Here, you might create elements to use in
			// your enter and exit methods.
		},
		enter: function () {
			// Code will run whenever condition() becomes true.
		},
		exit: function () {
			// Code will run whenever condition() becomes false
			// (if it was previously true).
			// This is where you revert the things you do in the
			// enter method.
		}
	});
```

## Debugging

The plugin provides some basic debugging which you can activate by setting `$.breakpoint.debug = true`. This will cause the plugin to log information to the browser console whenever a breakpoint is entered or exited. Add a `toString` method to your breakpoint object to distinguish between breakpoints; otherwise you'll see `[object Object]` as the name of the breakpoint.


## Tips and tricks

### MatchMedia support in older browsers

To use media queries via `window.matchMedia` in older browser you can use something like [Paul Irish's matchMedia() polyfill](https://github.com/paulirish/matchMedia.js). If you're using [Modernizr](http://modernizr.com/download/#-touch-mq-teststyles-prefixes), the same polyfill can be included by checking the *Media queries* checkbox in the *Extra* section.

### Self invoking anonymous function

It's generally a good idea to use a self invoking anonymous function to return the breakpoint object. This way, you can define private variables which can be used in all your breakpoint methods.

```javascript
	$.breakpoint((function () {
		var element;

		return {
			condition: function () {
				return window.matchMedia('only screen and (min-width:500px)').matches;
			},
			first_enter: function () {
				// Create element.
				element = $('<a>');
			},
			enter: function () {
				// Append element to DOM when condition is true.
				$('body').append(element);
			},
			exit: function () {
				// Detach element when condition is false.
				element.detach();
			}
		}
	}()));
```