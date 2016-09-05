app.filter('firstChar', function() {
    return function(input) {
      return input.charAt(0).toUpperCase();
    }
});

app.filter('setPlainText', function () {
	return function (item) {
		return item.replace(/<(.|\n)*?>/g, " ");
	};
});