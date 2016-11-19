$(function() {
	$("#q1").on('click', function(e) {
		e.preventDefault();
		$('#page').load("q1.html");
	});
});