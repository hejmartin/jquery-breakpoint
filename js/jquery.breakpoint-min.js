!function(n){"use strict"
function t(n){if(!n.condition()){if(c("Exiting breakpoint: "+n),"function"==typeof n.exit)try{n.exit.apply(n)}catch(t){}n.is_active=!1}}function i(n){if(n.condition()){if("function"==typeof n.first_enter){c("Entering breakpoint for the first time: "+n)
try{n.first_enter.apply(n)}catch(t){}delete n.first_enter}if("function"==typeof n.enter){c("Entering breakpoint: "+n)
try{n.enter.apply(n)}catch(t){}}n.is_active=!0}}function e(n){n.is_active?t(n):i(n)}function o(){var e=n.grep(r,function(n){return n.is_active}),o=n.grep(r,function(n){return!n.is_active})
n.each(e,function(n,i){t(i)}),n.each(o,function(n,t){i(t)})}function c(){n.breakpoint.debug&&console&&console.info&&console.info.apply(console,arguments)}var r=[]
n.breakpoint=function(t,i){i=n.extend(!0,{},n.breakpoint.defaults,i),r.push(t),1===r.length&&n(window).on("resize orientationchange",function(){o()}),e(t)},n.breakpoint.breakpoints=r,n.breakpoint.check=function(n){e(n)},n.breakpoint.defaults={},n.breakpoint.debug=!1}(jQuery)
