(function($) {
	var animSpeed = 300;
	var animEasing = 'swing';
	$(document).ready(function() {
		$('.panel-btn').on('click', function(e) {
			e.preventDefault();
			if($(this).hasClass('active')){
				//console.log("is active");
			}
			//console.log($(this));
			//console.log($(this).data('page'));
			scrollTo($(this).data('page'),$(this));
		});
		// Book tickets
		$('.book-bar').on('click', function(e) {
			e.preventDefault();
			ticketPopup();
		});
		$('.close').on('click', function(e) {
			e.preventDefault();
			$('.book-bar').toggleClass('active');
			$('.book-modal').hide();
		});
	});
	
	// FUNCTIONS
	function scrollTo(pageID,obj) {
		// if its open don't do anything
		if($('#p-section-' + pageID).hasClass('active')){
			return false;
		}
		// if its not open pick the correct panel and show it
		$('.p-section').animate({'opacity': 0}, animSpeed, animEasing, function() {
			$('.p-section').removeClass('active');
			$('#p-section-' + pageID).addClass('active');
		});
		$('#p-section-' + pageID).animate({'opacity': 1}, animSpeed, animEasing);
	}
	function ticketPopup(){
		$('.book-bar').toggleClass('active');
		$('.book-modal').show();
	}
})(jQuery);