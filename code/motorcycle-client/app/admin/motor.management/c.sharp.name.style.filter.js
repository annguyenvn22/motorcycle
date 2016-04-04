angular.module('motorcycle')
	.filter('cSharpNameStyle', function() {
		return function(input) {
			var splitArr = input.split(' ');
			var out = ' ';
			var aSingleString, firstLetter, theRestString, concatString;

			for (var i = 0; i < splitArr.length; i++) {
				aSingleString = splitArr[i];
				firstLetter = aSingleString.substr(0, 1); // example: harry => h
				theRestString = aSingleString.substr(1, aSingleString.length); // example: harry => arry
				concatString = firstLetter.toUpperCase().concat(theRestString);
				out += concatString + ' ';
			}
			return out; // hello wold => Hello World
		};
	});