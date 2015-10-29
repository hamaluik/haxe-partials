(function (console) { "use strict";
var partials_Partial = function() { };
var Sample = function() { };
Sample.__interfaces__ = [partials_Partial];
Sample.main = function() {
	console.log("My partials are here!");
	Sample.foo();
	Sample.bar();
};
Sample.foo = function() {
	console.log("FOO!");
};
Sample.bar = function() {
	console.log("BAR!");
};
Sample.main();
})(typeof console != "undefined" ? console : {log:function(){}});
