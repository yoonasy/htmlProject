// non of use
$(function() {
	$("[data-toggle]").click(function() {
		var target = $(".my-text");
		if($(this).prop('checked')) {
			target.html('You are my life <span class="text-red"><3</span>');
		} else {
			target.html('My life is beautiful, because...');
		}
	})
})