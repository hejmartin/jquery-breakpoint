(function ($) {
	'use strict';

	var breakpoints = [];

	/**
	 * Add a breakpoint object
	 *
	 * @param  {object}   breakpoint - Breakpoint to add
	 * @param  {function} breakpoint.condition - Return a boolean for whether this breakpoint should be active or not
	 * @param  {function} breakpoint.first_enter - Will execute the FIRST TIME condition() is true.
	 * @param  {function} breakpoint.enter - Will execute everytime condition() turns from false to true.
	 * @param  {function} breakpoint.exit - Will execute everytime condition() turns from true to false.
	 * @param  {object}   [options]
	 */
	$.breakpoint = function (breakpoint, options) {

		options = $.extend(true, {}, $.breakpoint.defaults, options);

		breakpoints.push(breakpoint);

		// Activate event listeners when first breakpoint is added.
		if (breakpoints.length === 1) {
			$(window).on('resize orientationchange', function () {
				checkAllBreakpoints();
			});
		}

		checkSingleBreakpoint(breakpoint);

	};

	// Array of all added breakpoints.
	$.breakpoint.breakpoints = breakpoints;

	/**
	 * Remove a breakpoint
	 * @param  {object} breakpoint - Breakpoint object as described in $.breakpoint
	 */
	$.breakpoint.remove = function (breakpoint) {
		var index;

		while ((index = $.inArray(breakpoint, $.breakpoint.breakpoints)) !== -1) {
			$.breakpoint.breakpoints.splice(index, 1);
		}
	};

	/**
	 * Remove a breakpoint
	 * @param  {object} breakpoint - Breakpoint object as described in $.breakpoint
	 */
	$.breakpoint.check = function (breakpoint) {
		checkSingleBreakpoint(breakpoint);
	};

	// Default options.
	$.breakpoint.defaults = { /* none yet… */};

	function checkActiveBreakpoint(breakpoint) {
		if (!breakpoint.condition()) {
			debug('Exiting breakpoint: ' + breakpoint);

			// We have left this breakpoint.
			if (typeof breakpoint.exit === 'function') {
				try {
					breakpoint.exit.apply(breakpoint);
				} catch (e) {}
			}

			breakpoint.is_active = false;
		}
	}

	function checkInactiveBreakpoint(breakpoint) {
		if (breakpoint.condition()) {

			// We have entered this breakpoint.
			if (typeof breakpoint.first_enter === 'function') {
				debug('Entering breakpoint for the first time: ' + breakpoint);

				try {
					breakpoint.first_enter.apply(breakpoint);
				} catch (e) {}

				// As this function is only meant to run once, remove it now.
				delete breakpoint.first_enter;
			}

			if (typeof breakpoint.enter === 'function') {
				debug('Entering breakpoint: ' + breakpoint);
				try {
					breakpoint.enter.apply(breakpoint);
				} catch (e) {}
			}

			breakpoint.is_active = true;
		}
	}

	function checkSingleBreakpoint(breakpoint) {
		if (breakpoint.is_active) {
			checkActiveBreakpoint(breakpoint);
		}
		else {
			checkInactiveBreakpoint(breakpoint);
		}
	}

	// Loop through all breakpoints and determine which ones are active.
	function checkAllBreakpoints() {
		// Build temporary array of active breakpoints
		var active_breakpoints = $.grep(breakpoints, function (breakpoint) {
			return breakpoint.is_active;
		});

		// Build temporary array of inactive breakpoints.
		var inactive_breakpoints = $.grep(breakpoints, function (breakpoint) {
			return !breakpoint.is_active;
		});

		// Check all active breakpoints first.
		$.each(active_breakpoints, function (index, breakpoint) {
			checkActiveBreakpoint(breakpoint);
		});

		// Check all inactive breakpoints.
		$.each(inactive_breakpoints, function (index, breakpoint) {
			checkInactiveBreakpoint(breakpoint);
		});
	}

	/**
	 * Breakpoint debugging
	 */

	// (De)activate breakpoint debugging.
	$.breakpoint.debug = false;

	// Console logging wrapper.
	function debug () {
		if ($.breakpoint.debug && console && console.info) {
			console.info.apply(console, arguments);
		}
	}

}(jQuery));