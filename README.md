$.breakpoint
==========

Easily manage media queries in your jQuery javascripts!

The structure of a breakpoint
-----------------------------

A breakpoint is a javascript object consisting of **four** methods: `condition`, `first_enter`, `enter` and `exit`.

`condition()` should return `true` when the breakpoint should be activated and `false` when it should be *de*activated. Most likely, you will use a media query as your condition, but this is not by any means required by the breakpoint plugin.

	$.breakpoint({
		condition: function () {
			return window.matchMedia('only screen and (min-width:500px)').matches;
		}
	});

Whenever the condition returns true, be it on page load or when the viewport changes, the `enter` method is executed. The first time this happens, the optional `first_enter` method will execute. When condition becomes false, the `exit` method will execute. Be aware however that the `exit` method will only run provided that the condition previously has been true!