/**
 * @file
 * Control page navigation and screen toggling.
 */
$(document).ready(function() {
  
  // Toggle the screen effect.
  $('#screen-toggle').unbind('click');
  $('#screen-toggle').click(function() {
    $('.screen').toggle();
    
    // Replace the text to hide/show screen.
    if ($('#screen-toggle').text() == "Hide Screen") {
      $('#screen-toggle').text('Show Screen');
    } else {
      $('#screen-toggle').text('Hide Screen');
    }
  });
  
  // Scroll when a navigation image is clicked.
  $('.selector').click(function() {
    var anchor = $(this).attr('data-href');
    anchor = $(anchor).offset().top;
    $('body, html').animate({scrollTop : anchor + 'px' }, 'slow');
    return false;
  });
});