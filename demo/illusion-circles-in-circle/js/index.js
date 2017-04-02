/*
Note: None of this JavaScript makes the circles move around (which they aren't 😁), all the movement is done with CSS.
*/
//Hide the second button and the smileys
$(".btn-2, .circle span").hide();

//When the first button is clicked
$(".line-trigger").on("click", function(e) {
    //Display the lines inside the parent circle
    $(this).parents().find("[class*=wrapper]").toggleClass("tracks");
    //Toggle the visibility of the buttons when eithe is clicked
    //And toggle a class to animate the emoji dude 😁
    $(".line-trigger").toggle().parents().find(".btn-2 span").toggleClass("wait-what");
    e.preventDefaullt();
});

//Trigger the smiley faces on the yellow circles, lol
$(".btn-smiley").on("click", function(e) {
    $(".circle span").fadeToggle();
    e.preventDefaullt();
});