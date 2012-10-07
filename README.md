$.breakpoint
==========

Easily manage media queries in your jQuery javascripts!

The structure of a breakpoint
-----------------------------

A breakpoint is a javascript object consisting of **four** methods: `condition`, `first_enter`, `enter` and `exit`.

`condition()` should return `true` when the breakpoint should be activated and `false` when it should be deactivated. Most likely, you will use a media query as your condition, but this is not by any means required by the breakpoint plugin.

	$.breakpoint({
		condition: function () {
			return window.matchMedia('only screen and (min-width:500px)').matches;
		}
	});

Whenever the condition returns true, be it on page load or when the viewport changes, the `enter` method is executed. The first time this happens, the optional `first_enter` method will execute. When condition becomes false, the `exit` method will execute. Be aware however that the `exit` method will only run provided that the condition previously has been true!

	$.breakpoint({
		condition: function () {…},
		first_enter: function () {
			// Code will run the first time condition() is true.
		},
		enter: function () {
			// Code will run whenever condition() becomes true.
		},
		exit: function () {
			// Code will run whenever condition() becomes false (if it was previously true).
		}
	});

Tips and tricks
---------------

It's generally a good idea to use a self invoking anonymous function to return the breakpoint object. This way, you can define private variables which can be used in all your breakpoint methods.

	$.breakpoint((function () {
		var element;

		return {
			condition: function () {…},
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
